/* 
  @description: 치지직 비디오 단축키 제어
  본 프로그램은 PIP모드에서도 작동합니다.
 */
// @auth: Clann
// 1. k - play/pause
// 2. m - mute/unmute
// 3. t - toggle watching mode
// 4. f - full screen

// pzp-button pzp-pc-playback-switch pzp-pc__playback-switch pzp-pc-ui-button pzp-pc-ui-button--clicked
// pzp-button pzp-pc-volume-button pzp-pc__volume-button pzp-pc-ui-button pzp-pc-ui-button--clicked
// pzp-button pzp-pc-viewmode-button pzp-pc__viewmode-button pzp-pc-ui-button pzp-pc-ui-button--clicked

console.log("%cvideoControl.js is loaded", "color: #00ff00");

// 이벤트 등록

(function () {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const isLive = window.location.href.includes("live");

  // 1. 단축키
  const createShortcut = () => {
    document.addEventListener("keydown", (e) => {
      // error handling
      const isShortCutUnableTags = ["INPUT", "TEXTAREA", "SELECT", "PRE"];
      const isShortCut1 = e.ctrlKey || e.altKey || e.shiftKey || e.metaKey;
      const isShortCut2 = !isShortCutUnableTags.includes(e.target.tagName.toUpperCase());
      if (isShortCut1 || !isShortCut2) return;

      // 1. play/pause 버튼을 클릭함
      if (e.key === "k" || e.key === "K") {
        const playToggleBtn = document.querySelector(".pzp-pc-playback-switch");
        playToggleBtn.click();
        return;
      }

      // 2. mute/unmute 버튼을 클릭함
      if (e.key === "m" || e.key === "M") {
        const muteToggleBtn = document.querySelector(".pzp-pc-volume-button");
        muteToggleBtn.click();
        return;
      }

      // 3. toggle watching mode 버튼을 클릭함
      if (e.key === "t" || e.key === "T") {
        // spcial case: PIP mode
        if (!isLive) return;

        const viewModeToggleBtn = document.querySelector(".pzp-pc-viewmode-button");
        viewModeToggleBtn.click();
        return;
      }

      // 4. full screen 버튼을 클릭함
      if (e.key === "f" || e.key === "F") {
        const fullScreenBtn = document.querySelector(".pzp-pc-fullscreen-button");
        fullScreenBtn.click();
        return;
      }
    });
  };
  // 2. 포커스
  const focusVideo = () => {
    if (!isLive) return;

    const video = document.querySelector(".pzp-pc");
    video.focus();
  };

  // 실행단
  createShortcut();
  delay(1500).then(() => focusVideo());
})();
