"use strict";
function is_touch_device() {
    return !!('ontouchstart' in window);
}
function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var args = arguments;
        var later = function () {
            timeout = 0;
            if (!immediate)
                func.apply(args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
            func.apply(args);
    };
}
