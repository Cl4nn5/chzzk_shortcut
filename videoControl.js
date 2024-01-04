// 1. k - play/pause
// 2. m - mute/unmute
// 3. t - toggle watching mode
// 4. f - full screen

// pzp-button pzp-pc-playback-switch pzp-pc__playback-switch pzp-pc-ui-button pzp-pc-ui-button--clicked
// pzp-button pzp-pc-volume-button pzp-pc__volume-button pzp-pc-ui-button pzp-pc-ui-button--clicked
// pzp-button pzp-pc-viewmode-button pzp-pc__viewmode-button pzp-pc-ui-button pzp-pc-ui-button--clicked

console.log("videoControl.js is loaded _ by Clann");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// 이벤트 등록
document.addEventListener("keydown", (e) => {
  // error handling
  if (!e.target.classList.contains("pzp")) {
    // console.error("pzp가 아닙니다.");
    return;
  }

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
