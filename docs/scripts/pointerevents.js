"use strict";
// Проверяем тип устройства
if (is_touch_device())
    $(document.body).addClass('is-touch');
else
    $(document.body).addClass('no-touch');
var Handler = /** @class */ (function () {
    function Handler(selector) {
        this.selector = $(selector);
        this.$imgWrap = $('.js-img-wrapper', this.selector);
        this.$img = $('img', this.$imgWrap);
        this.$scroll = $('.js-scroll', this.selector);
        this.$zoom = $('.js-zoom', this.selector);
        this.$brightness = $('.js-brightness', this.selector);
        this.height = undefined;
        this.newHeight = undefined;
        this.minHeight = 300;
        this.maxHeight = 1000;
        this.left = 0;
        this.top = 0;
        this.oldLeft = 0;
        this.oldTop = 0;
        this.leftLim = 0;
        this.topLim = 0;
        this.brightness = 50;
        this.events = [];
        this.distance = 0;
        this.oldDistance = undefined;
        this.newDistamce = 0;
        this.rotate = 0;
        this.oldRotate = undefined;
        this.newRotate = 0;
        this.zoom = false;
        this.fixed = false;
        this.lastTap = undefined;
        this.hendlPointerEvents(this.selector);
        this.handelRotate(0);
    }
    // Лимит для скролла изображения
    Handler.prototype.checkLim = function () {
        this.top >= this.topLim ? this.top = this.topLim : '';
        this.top <= -this.topLim ? this.top = -this.topLim : '';
        this.left >= this.leftLim ? this.left = this.leftLim : '';
        this.left <= -this.leftLim ? this.left = -this.leftLim : '';
    };
    Handler.prototype.handlePinch = function () {
        if (!this.newHeight)
            this.newHeight = this.$img.height();
        this.distance = 10 * Math.sign(this.distance);
        this.newHeight += this.distance;
        if (this.newHeight >= this.maxHeight)
            this.newHeight = this.maxHeight;
        if (this.newHeight <= this.minHeight)
            this.newHeight = this.minHeight;
        this.$img.height(this.newHeight);
        this.moveImg();
    };
    Handler.prototype.handelRotate = function (change) {
        this.brightness += change;
        if (this.brightness >= 100)
            this.brightness = 100;
        if (this.brightness <= 0)
            this.brightness = 0;
        this.$brightness.html(this.brightness);
        this.changeBrightness(this.$img, this.brightness);
    };
    Handler.prototype.zoomImg = function () {
        if (this.zoom) {
            this.$img.height(this.height);
            this.zoom = !this.zoom;
        }
        else {
            this.height = this.$img.height();
            this.maxHeight = 2 * this.height;
            this.$img.height(this.maxHeight);
            this.zoom = !this.zoom;
        }
        this.moveImg();
        this.changeZoom(this.$img, this.brightness);
    };
    // Меняем яркость от 50 до 150
    Handler.prototype.changeBrightness = function (selector, val) {
        selector.css({
            "-webkit-filter": "brightness(" + (val + 50) + "%)",
            "filter": "brightness(" + (val + 50) + "%)"
        });
    };
    Handler.prototype.changeZoom = function () {
        var zoom = (this.$img.height() * 0.1).toFixed(0);
        $(this.$zoom).html(zoom);
    };
    Handler.prototype.getLim = function () {
        this.topLim = (this.$imgWrap.height() - this.$imgWrap.parent().height()) / 2;
        this.leftLim = (this.$imgWrap.width() - this.$imgWrap.parent().width()) / 2;
    };
    Handler.prototype.getDistance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    };
    Handler.prototype.getAngle = function (x1, y1, x2, y2) {
        return Math.atan2(y1 - y2, x1 - x2) * 180 / Math.PI;
    };
    Handler.prototype.moveScroll = function () {
        var start = 15;
        var end = 85;
        var persent = (-this.left + this.leftLim) * 100 / (this.leftLim * 2);
        persent = persent * 0.7 + start;
        persent > end ? persent = end : '';
        persent < start ? persent = start : '';
        this.$scroll.css('left', persent + '%');
    };
    Handler.prototype.moveImg = function () {
        this.getLim();
        this.checkLim();
        this.$img.css('transform', 'translate(' + this.left + 'px, ' + this.top + 'px)');
        this.moveScroll();
    };
    Handler.prototype.pointerDown = function (e) {
        this.events.push({
            id: e.originalEvent.pointerId,
            clientX: e.clientX,
            clientY: e.clientY
        });
        var now = new Date().getTime();
        this.oldLeft = e.clientX;
        this.oldTop = e.clientY;
        this.oldDistance = undefined;
        this.oldRotate = undefined;
        this.getLim();
        if (this.events.length === 2)
            this.fixed = true;
        if (this.events.length === 1) {
            var timesince = now - this.lastTap;
            if ((timesince < 300) && (timesince > 0))
                this.zoomImg(); // Двойной тап
            this.lastTap = new Date().getTime();
        }
    };
    Handler.prototype.pointerMove = function (e) {
        if (this.events.length === 1 && !this.fixed) {
            this.left += e.clientX - this.oldLeft;
            this.top += e.clientY - this.oldTop;
            this.moveImg();
            this.oldLeft = e.clientX;
            this.oldTop = e.clientY;
        }
        else if (this.events.length === 2) {
            var curId_1 = e.originalEvent.pointerId;
            var curObj = this.events.filter(function (item) { return item.id === curId_1; })[0];
            curObj.clientX = e.clientX;
            curObj.clientY = e.clientY;
            var x1 = this.events[0].clientX;
            var y1 = this.events[0].clientY;
            var x2 = this.events[1].clientX;
            var y2 = this.events[1].clientY;
            this.newDistamce = this.getDistance(x1, y1, x2, y2);
            this.newRotate = this.getAngle(x1, y1, x2, y2);
            if (!this.oldRotate)
                this.oldRotate = this.newRotate;
            if (!this.oldDistance)
                this.oldDistance = this.newDistamce;
            this.rotate = this.newRotate - this.oldRotate;
            this.oldRotate = this.newRotate;
            this.distance = this.newDistamce - this.oldDistamce;
            this.oldDistamce = this.newDistamce;
            //Отделяем поворот от зума
            Math.abs(this.distance) > 5 && this.handlePinch();
            Math.abs(this.rotate) > 2 && this.handelRotate(Math.sign(this.rotate));
        }
        this.changeZoom();
    };
    Handler.prototype.pointerUp = function (e) {
        this.events = this.events.filter(function (item) { return item.id !== e.originalEvent.pointerId; });
        if (this.events.length === 0)
            this.fixed = false;
    };
    // Обработчики событий
    Handler.prototype.hendlPointerEvents = function (selector) {
        var _this = this;
        if (is_touch_device()) {
            selector.on('pointermove', function (e) { return _this.pointerMove(e); });
            selector.on('pointerdown', function (e) { return _this.pointerDown(e); });
            selector.on('pointerup pointercancel pointerleave pointerout', function (e) { return _this.pointerUp(e); });
        }
    };
    return Handler;
}());
