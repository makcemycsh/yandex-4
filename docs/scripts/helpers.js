"use strict";
function is_touch_device() {
    return !!('ontouchstart' in window);
}
function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        const args = arguments;
        const later = function () {
            timeout = 0;
            if (!immediate)
                func.apply(args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(args);
    };
}
