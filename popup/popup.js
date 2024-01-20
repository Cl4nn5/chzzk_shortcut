(() => {
  // shortcut 사용 여부
  const useShortcut = true;

  // 호출단
  const init = () => {
    // shortcut 사용 여부
    const $useShortcut = document.querySelector("#useShortcut");
    $useShortcut.checked = useShortcut;
  };

  init();
})();
