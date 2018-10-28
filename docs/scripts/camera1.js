"use strict";
function init() {
    var context = new (window.AudioContext || window.webkitAudioContext)();
    $(".js-camera").each(function () {
        new Camera($(this), context);
    });
}
var $controls = {
    close: $(".js-close"),
    brightness: $(".js-camera-brightness"),
    contrast: $(".js-camera-contrast"),
    volume: $(".js-camera-volume")
};
var Camera = /** @class */ (function () {
    function Camera($selector, context) {
        this.selector = $($selector);
        this.video = $($selector).find('video');
        this.active = false;
        this.brightness = 100;
        this.contrast = 100;
        this.volume = 1;
        this.buffer = 256;
        this.timer = null;
        this.chart = null;
        this.context = context;
        this.handlers();
        this.initAudioContext();
        this.initChart();
    }
    Camera.prototype.changeContrast = function () {
        if (this.active) {
            this.contrast = $($controls.contrast).val();
            this.filter();
        }
    };
    Camera.prototype.changeBrightness = function () {
        if (this.active) {
            this.brightness = $($controls.brightness).val();
            this.filter();
        }
    };
    Camera.prototype.changeVolume = function () {
        if (this.active) {
            this.volume = $($controls.volume).val();
            this.video[0].volume = this.volume;
        }
    };
    Camera.prototype.filter = function () {
        this.selector.css("filter", "contrast(" + this.contrast + "%) brightness(" + this.brightness + "%)");
    };
    Camera.prototype.close = function () {
        clearInterval(this.timer);
        $("body").removeClass("mod-video");
        this.active = false;
        this.video[0].muted = true;
        this.resetStyles();
    };
    Camera.prototype.open = function () {
        var _this = this;
        if (this.active) {
            return;
        }
        this.active = true;
        $("body").addClass("mod-video");
        this.resetRange();
        this.openAnimation();
        this.video[0].muted = false;
        this.initAudioContext();
        this.initChart();
        this.timer = setInterval(function () {
            _this.chart.update();
        }, 100);
    };
    Camera.prototype.openAnimation = function () {
        var positionInfo = this.selector[0].getBoundingClientRect();
        var heightEl = positionInfo.height;
        var widthEl = positionInfo.width;
        var widthWindow = document.documentElement.clientWidth;
        var hightWindow = document.documentElement.clientHeight;
        var moveLeft = positionInfo.left - ((widthWindow - widthEl) / 2);
        var moveTop = positionInfo.top - ((hightWindow - heightEl) / 2);
        var scale = widthWindow / widthEl;
        this.selector.css({
            "-webkit-transform": "translate(" + -moveLeft + "px, " + -moveTop + "px) scale(" + scale + ")",
            "-ms-transform": "translate(" + -moveLeft + "px, " + -moveTop + "px) scale(" + scale + ")",
            "transform": "translate(" + -moveLeft + "px, " + -moveTop + "px) scale(" + scale + ")",
            "z-index": "999"
        });
    };
    Camera.prototype.initAudioContext = function () {
        var _this = this;
        this.node = this.context.createScriptProcessor(this.buffer, 1, 1);
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = this.buffer;
        this.bands = new Uint8Array(this.analyser.frequencyBinCount);
        if (!this.source)
            this.source = this.context.createMediaElementSource(this.video[0]);
        this.source.connect(this.analyser);
        this.analyser.connect(this.node);
        this.node.connect(this.context.destination);
        this.source.connect(this.context.destination);
        this.node.onaudioprocess = function () {
            _this.analyser.getByteFrequencyData(_this.bands);
            if (!_this.video.paused) {
                if (typeof _this.update === "function") {
                    return _this.update(_this.bands);
                }
                else {
                    return 0;
                }
            }
        };
    };
    Camera.prototype.initChart = function () {
        this.chart = new Chart($("#audio"), {
            type: 'bar',
            data: {
                labels: this.bands,
                datasets: [{
                        data: this.bands,
                        borderWidth: 1,
                        barStrokeWidth: 2,
                        backgroundColor: "yellow"
                    }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                            ticks: {
                                display: false,
                            },
                            gridLines: {
                                display: false
                            }
                        }],
                    yAxes: [{
                            ticks: {
                                display: false,
                                max: 200,
                                min: 0
                            },
                            gridLines: {
                                display: false
                            }
                        }]
                }
            }
        });
    };
    Camera.prototype.resetRange = function () {
        $($controls.contrast).val(this.contrast);
        $($controls.brightness).val(this.brightness);
        $($controls.volume).val(this.volume);
    };
    Camera.prototype.resetStyles = function () {
        var _this = this;
        this.selector.css({
            "-webkit-transform": "translate(0px, 0px) scale(1)",
            "-ms-transform": "translate(0px, 0px) scale(1)",
            "transform": "translate(0px, 0px) scale(1)"
        });
        setTimeout(function () {
            _this.selector.css({
                "z-index": "1"
            });
        }, 200);
    };
    Camera.prototype.handlers = function () {
        var _this = this;
        $(document).keydown(function (e) {
            if (e.key === "Escape") {
                _this.close();
            }
        });
        this.selector.on("click", this.open.bind(this));
        $($controls.close).on("click", this.close.bind(this));
        $($controls.contrast).on("input", debounce(this.changeContrast.bind(this), 5));
        $($controls.brightness).on("input", debounce(this.changeBrightness.bind(this), 5));
        $($controls.volume).on("input", debounce(this.changeVolume.bind(this), 5));
    };
    return Camera;
}());
init();
