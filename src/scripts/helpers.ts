function is_touch_device() {
  return !!('ontouchstart' in window);
}

function debounce(func: Function, wait: number, immediate: boolean) {
  let timeout: number;

  return function () {
    const args: Object = arguments;
    const later: Function = function () {
      timeout = 0;
      if (!immediate) func.apply(args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(args);
  };
}
