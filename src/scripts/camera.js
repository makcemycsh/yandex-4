function init() {
  let context = new (window.AudioContext || window.webkitAudioContext)();
  $(".js-camera").each(function () {
    new Camera($(this), context);
  });
}

const $controls = {
  close: $(".js-close"),
  brightness: $(".js-camera-brightness"),
  contrast: $(".js-camera-contrast"),
  volume: $(".js-camera-volume")
};

class Camera {
  constructor($selector, context) {
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

  changeContrast() {
    if (this.active) {
      this.contrast = $($controls.contrast).val();
      this.filter();
    }
  }

  changeBrightness() {
    if (this.active) {
      this.brightness = $($controls.brightness).val();
      this.filter();
    }
  }

  changeVolume() {
    if (this.active) {
      this.volume = $($controls.volume).val();
      this.video[0].volume = this.volume;
    }
  }

  filter() {
    this.selector.css("filter", "contrast(" + this.contrast + "%) brightness(" + this.brightness + "%)");
  }

  close() {
    clearInterval(this.timer);
    $("body").removeClass("mod-video");
    this.active = false;
    this.video[0].muted = true;
    this.resetStyles();
  }

  open() {
    if (this.active) { return; }
    this.active = true;
    $("body").addClass("mod-video");
    this.resetRange();
    this.openAnimation();
    this.video[0].muted = false;

    this.initAudioContext();
    this.initChart();
    this.timer = setInterval(() => { this.chart.update();}, 100);

  }

  openAnimation() {
    let positionInfo = this.selector[0].getBoundingClientRect();
    let heightEl = positionInfo.height;
    let widthEl = positionInfo.width;
    let widthWindow = document.documentElement.clientWidth;
    let hightWindow = document.documentElement.clientHeight;

    let moveLeft = positionInfo.left - ((widthWindow - widthEl) / 2);
    let moveTop = positionInfo.top - ((hightWindow - heightEl) / 2);
    let scale = widthWindow / widthEl;

    this.selector.css({
      "transform": "translate(" + -moveLeft + "px, " + -moveTop + "px) scale(" + scale + ")",
      "z-index": "999"
    });


  }

  initAudioContext() {
    this.node = this.context.createScriptProcessor(this.buffer, 1, 1);
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = this.buffer;
    this.bands = new Uint8Array(this.analyser.frequencyBinCount);
    if (!this.source) this.source = this.context.createMediaElementSource(this.video[0]);
    this.source.connect(this.analyser);
    this.analyser.connect(this.node);
    this.node.connect(this.context.destination);
    this.source.connect(this.context.destination);
    this.node.onaudioprocess = () => {
      this.analyser.getByteFrequencyData(this.bands);
      if (!this.video.paused) {
        if (typeof this.update === "function") {
          return this.update(this.bands);
        } else {
          return 0;
        }
      }
    };
  }

  initChart() {
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
  }
  
  resetRange() {
    $($controls.contrast).val(this.contrast);
    $($controls.brightness).val(this.brightness);
    $($controls.volume).val(this.volume);
  }

  resetStyles() {
    this.selector.css({
      "transform": "translate(0px, 0px) scale(1)"
    });
    setTimeout(() => {
      this.selector.css({
        "z-index": "1"
      })
    }, 200)
  }

  handlers() {
    $(document).keydown(e => {
      if (e.key === "Escape") {
        this.close();
      }
    });
    this.selector.on("click", this.open.bind(this));
    $($controls.close).on("click", this.close.bind(this));
    $($controls.contrast).on("input", debounce(this.changeContrast.bind(this), 5));
    $($controls.brightness).on("input", debounce(this.changeBrightness.bind(this), 5));
    $($controls.volume).on("input", debounce(this.changeVolume.bind(this), 5));
  }
}

init();