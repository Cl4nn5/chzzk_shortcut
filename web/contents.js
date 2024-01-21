/* 
  @description: 치지직 비디오 단축키 제어
  본 프로그램은 PIP모드에서도 작동합니다.
  * 1. 단축키 기능
  * 2. 광고 스킵 기능
 */
// @auth: Clann
// 1. k - play/pause
// 2. m - mute/unmute
// 3. t - toggle watching mode
// 4. f - full screen
// 5. / - search
// 6. \ - chat
// 7. I - pip mode

console.log("%cvideoControl.js is loaded", "color: #00ff00");

// 이벤트 등록

(function () {
  const delay = async (s = 1) => await new Promise((r) => setTimeout(r, s * 1000));
  const adSkipCount = 3;
  const shortCutKey_playPause = ["k", "K"];
  const shortCutKey_muteUnmute = ["m", "M"];
  const shortCutKey_toggleWatchingMode = ["t", "T"];
  const shortCutKey_fullScreen = ["f", "F"];
  const shortCutKey_search = ["/"];
  const shortCutKey_chat = ["\\"];
  const shortCutKey_pipMode = ["i", "I"];
  const shoryCutKey_skipAd = ["s", "S"];
  const isLive = () => location.href.includes("live");
  const isVideo = () => location.href.includes("video");
  let currentPathname = "";
  let newPathname = "";
  const isPathnameChanged = () => {
    newPathname = location.pathname;
    const isChanged = currentPathname !== newPathname;
    currentPathname = newPathname;
    return isChanged;
  };

  // 1. 단축키
  const createShortcut = () => {
    document.addEventListener("keydown", (e) => {
      // error handling
      const isShortCutUnableTags = ["INPUT", "TEXTAREA", "SELECT", "PRE"];
      const isShortCut1 = e.ctrlKey || e.altKey || e.shiftKey || e.metaKey;
      const isShortCut2 = !isShortCutUnableTags.includes(e.target.tagName.toUpperCase());
      if (isShortCut1 || !isShortCut2) return;

      // 1. play/pause 버튼을 클릭함
      if (shortCutKey_playPause.includes(e.key)) {
        const playToggleBtn = document.querySelector(".pzp-pc-playback-switch");
        playToggleBtn.click();
        return;
      }

      // 2. mute/unmute 버튼을 클릭함
      if (shortCutKey_muteUnmute.includes(e.key)) {
        const muteToggleBtn = document.querySelector(".pzp-pc-volume-button");
        muteToggleBtn.click();
        return;
      }

      // 3. toggle watching mode 버튼을 클릭함
      if (shortCutKey_toggleWatchingMode.includes(e.key)) {
        // spcial case: PIP mode
        if (!isVideo() && !isLive()) return;

        const viewModeToggleBtn = document.querySelector(".pzp-pc-viewmode-button");
        viewModeToggleBtn.click();
        return;
      }

      // 4. full screen 버튼을 클릭함
      if (shortCutKey_fullScreen.includes(e.key)) {
        const fullScreenBtn = document.querySelector(".pzp-pc-fullscreen-button");
        fullScreenBtn.click();
        return;
      }

      // 5. search 버튼을 클릭함
      if (shortCutKey_search.includes(e.key)) {
        e.preventDefault();
        const searchBtn = document.querySelector(".search_input__tKVgq");
        searchBtn.focus();
        return;
      }

      // 6. chat 버튼을 클릭함
      if (shortCutKey_chat.includes(e.key)) {
        e.preventDefault();
        const chatBtn = document.querySelector(".live_chatting_input_input__2F3Et");
        chatBtn.focus();
        return;
      }

      // 7. pip mode 버튼을 클릭함
      if (shortCutKey_pipMode.includes(e.key)) {
        if (!isVideo() && !isLive()) {
          return history.back();
        }

        const pipBtn = document.querySelector(".header_item__MFv39");
        pipBtn.click();
        return;
      }

      // 8. 광고 스킵
      if (shoryCutKey_skipAd.includes(e.key)) {
        skipAd(0);
        return;
      }
    });
  };
  // 2-1. 광고 스킵
  const skipAd = async (s = 1) => {
    await delay(s);
    const btnSkip = document.querySelector(".btn_skip");
    if (!btnSkip) return;
    btnSkip.click();
  };

  // 2-2. 광고 스킵 반복
  const repeatSkipAd = async (tryCount = adSkipCount) => {
    for (let i = 0; i < tryCount; i++) {
      await delay();
      skipAd();
      console.log("광고 스킵을 시도합니다.", i + 1, "/", tryCount);
    }
  };

  // 2-3. 광고 스킵 이벤트 등록
  const addSkipAdEvent = () => {
    window.addEventListener("popstate", () => {
      skipAd();
    });

    window.addEventListener("click", async () => {
      if (isPathnameChanged()) {
        await repeatSkipAd(2);
      }
    });
  };

  // 실행단
  createShortcut(); // 단축키
  addSkipAdEvent(); // 광고 스킵
  repeatSkipAd(); // 페이지 로드 후 광고 스킵
})();
