"use strict";
var DateTimeFormat = Intl.DateTimeFormat;
function init() {
    const context = new (window.AudioContext
        || window.webkitAudioContext)();
    $('.js-camera').each(function () {
        new Camera($(this), context);
    });
}
const $controls = {
    close: $('.js-close'),
    brightness: $('.js-camera-brightness'),
    contrast: $('.js-camera-contrast'),
    volume: $('.js-camera-volume'),
};
class Camera {
    constructor($selector, context) {
        this.selector = $($selector);
        this.video = this.selector.find('video')[0];
        this.active = false;
        this.brightness = 100;
        this.contrast = 100;
        this.volume = 1;
        this.buffer = 256;
        this.timer = 0;
        this.chart = 0;
        this.context = context;
        this.node = null;
        this.analyser = null;
        this.bands = null;
        this.source = null;
        this.update = '';
        this.handlers();
        this.initAudioContext();
        this.initChart();
    }
    changeContrast() {
        if (this.active) {
            this.contrast = Number($($controls.contrast).val());
            this.filter();
        }
    }
    changeBrightness() {
        if (this.active) {
            this.brightness = Number($($controls.brightness).val());
            this.filter();
        }
    }
    changeVolume() {
        if (this.active) {
            this.volume = Number($($controls.volume).val());
            this.video.volume = this.volume;
        }
    }
    filter() {
        this.selector.css('filter', `contrast(${this.contrast}%) brightness(${this.brightness}%)`);
    }
    close() {
        clearInterval(this.timer);
        $('body').removeClass('mod-video');
        this.active = false;
        this.video.muted = true;
        this.resetStyles();
    }
    open() {
        if (this.active) {
            return;
        }
        this.active = true;
        $('body').addClass('mod-video');
        this.resetRange();
        this.openAnimation();
        this.video.muted = false;
        this.initAudioContext();
        this.initChart();
        this.timer = Number(setInterval(() => {
            this.chart.update();
        }, 100));
    }
    openAnimation() {
        const positionInfo = this.selector[0].getBoundingClientRect();
        const heightEl = positionInfo.height;
        const widthEl = positionInfo.width;
        const widthWindow = document.documentElement.clientWidth;
        const higthWindow = document.documentElement.clientHeight;
        const moveLeft = positionInfo.left - ((widthWindow - widthEl) / 2);
        const moveTop = positionInfo.top - ((higthWindow - heightEl) / 2);
        const scale = widthWindow / widthEl;
        this.selector.css({
            '-webkit-transform': 'translate(' + -moveLeft + 'px, ' + -moveTop + 'px) scale(' + scale + ')',
            '-ms-transform': 'translate(' + -moveLeft + 'px, ' + -moveTop + 'px) scale(' + scale + ')',
            transform: 'translate(' + -moveLeft + 'px, ' + -moveTop + 'px) scale(' + scale + ')',
            'z-index': '999',
        });
    }
    initAudioContext() {
        this.node = this.context.createScriptProcessor(this.buffer, 1, 1);
        this.analyser = this.context.createAnalyser();
        this.analyser.fftSize = this.buffer;
        this.bands = new Uint8Array(this.analyser.frequencyBinCount);
        if (!this.source)
            this.source = this.context.createMediaElementSource(this.video);
        this.source.connect(this.analyser);
        this.analyser.connect(this.node);
        this.node.connect(this.context.destination);
        this.source.connect(this.context.destination);
        this.node.onaudioprocess = () => {
            this.analyser.getByteFrequencyData(this.bands);
            if (!this.video.paused) {
                if (typeof this.update === 'function')
                    return this.update(this.bands);
                return 0;
            }
        };
    }
    initChart() {
        this.chart = new Chart($('#audio'), {
            type: 'bar',
            data: {
                labels: this.bands,
                datasets: [{
                        data: this.bands,
                        borderWidth: 1,
                        barStrokeWidth: 2,
                        backgroundColor: 'yellow',
                    }],
            },
            options: {
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                            ticks: {
                                display: false,
                            },
                            gridLines: {
                                display: false,
                            },
                        }],
                    yAxes: [{
                            ticks: {
                                display: false,
                                max: 200,
                                min: 0,
                            },
                            gridLines: {
                                display: false,
                            },
                        }],
                },
            },
        });
    }
    resetRange() {
        $($controls.contrast).val(this.contrast);
        $($controls.brightness).val(this.brightness);
        $($controls.volume).val(this.volume);
    }
    resetStyles() {
        this.selector.css({
            '-webkit-transform': 'translate(0px, 0px) scale(1)',
            '-ms-transform': 'translate(0px, 0px) scale(1)',
            transform: 'translate(0px, 0px) scale(1)',
        });
        setTimeout(() => {
            this.selector.css({
                'z-index': '1',
            });
        }, 200);
    }
    handlers() {
        $(document).keydown((e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
        this.selector.on('click', this.open.bind(this));
        $($controls.close).on('click', this.close.bind(this));
        $($controls.contrast).on('input', debounce(this.changeContrast.bind(this), 5, false));
        $($controls.brightness).on('input', debounce(this.changeBrightness.bind(this), 5, false));
        $($controls.volume).on('input', debounce(this.changeVolume.bind(this), 5, false));
    }
}
init();
