"use strict";function is_touch_device(){return!!("ontouchstart"in window)}function debounce(u,o,e){var c=void 0;return function(){var t=this,n=arguments,i=e&&!c;clearTimeout(c),c=setTimeout(function(){c=null,e||u.apply(t,n)},o),i&&u.apply(t,n)}}
//# sourceMappingURL=helpers.js.map
