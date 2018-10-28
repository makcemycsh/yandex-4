"use strict";
// Проверяем тип устройства
if (is_touch_device())
    $(document.body).addClass('is-touch');
else
    $(document.body).addClass('no-touch');
class Handler {
    constructor(selector) {
        this.selector = $(selector);
        this.$imgWrap = $('.js-img-wrapper', this.selector);
        this.$img = $('img', this.$imgWrap);
        this.$scroll = $('.js-scroll', this.selector);
        this.$zoom = $('.js-zoom', this.selector);
        this.$brightness = $('.js-brightness', this.selector);
        this.height = 0;
        this.newHeight = 0;
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
        this.oldDistance = 0;
        this.newDistance = 0;
        this.rotate = 0;
        this.oldRotate = 0;
        this.newRotate = 0;
        this.zoom = false;
        this.fixed = false;
        this.lastTap = 0;
        this.hendlPointerEvents(this.selector);
        this.handelRotate(0);
    }
    // Лимит для скролла изображения
    checkLim() {
        this.top >= this.topLim ? this.top = this.topLim : '';
        this.top <= -this.topLim ? this.top = -this.topLim : '';
        this.left >= this.leftLim ? this.left = this.leftLim : '';
        this.left <= -this.leftLim ? this.left = -this.leftLim : '';
    }
    handlePinch() {
        if (this.newHeight === 0)
            this.newHeight = Number(this.$img.height());
        this.distance = 10 * Math.sign(this.distance);
        this.newHeight += this.distance;
        if (this.newHeight >= this.maxHeight)
            this.newHeight = this.maxHeight;
        if (this.newHeight <= this.minHeight)
            this.newHeight = this.minHeight;
        this.$img.height(this.newHeight);
        this.moveImg();
    }
    handelRotate(change) {
        this.brightness += change;
        if (this.brightness >= 100)
            this.brightness = 100;
        if (this.brightness <= 0)
            this.brightness = 0;
        this.$brightness.html(String(this.brightness));
        this.changeBrightness(this.$img, this.brightness);
    }
    zoomImg() {
        if (this.zoom) {
            this.$img.height(this.height);
            this.zoom = !this.zoom;
        }
        else {
            this.height = Number(this.$img.height());
            this.maxHeight = 2 * this.height;
            this.$img.height(this.maxHeight);
            this.zoom = !this.zoom;
        }
        this.moveImg();
        this.changeZoom();
    }
    // Меняем яркость от 50 до 150
    changeBrightness(selector, val) {
        selector.css({
            '-webkit-filter': `brightness(${val + 50}%)`,
            filter: `brightness(${val + 50}%)`,
        });
    }
    changeZoom() {
        const zoom = (Number(this.$img.height()) * 0.1).toFixed(0);
        $(this.$zoom).html(String(zoom));
    }
    getLim() {
        this.topLim = (Number(this.$imgWrap.height()) - Number(this.$imgWrap.parent().height())) / 2;
        this.leftLim = (Number(this.$imgWrap.width()) - Number(this.$imgWrap.parent().width())) / 2;
    }
    getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    }
    getAngle(x1, y1, x2, y2) {
        return Math.atan2(y1 - y2, x1 - x2) * 180 / Math.PI;
    }
    moveScroll() {
        const start = 15;
        const end = 85;
        let persent = (-this.left + this.leftLim) * 100 / (this.leftLim * 2);
        persent = persent * 0.7 + start;
        persent > end ? persent = end : '';
        persent < start ? persent = start : '';
        this.$scroll.css('left', `${persent}%`);
    }
    moveImg() {
        this.getLim();
        this.checkLim();
        this.$img.css('transform', `translate(${this.left}px, ${this.top}px)`);
        this.moveScroll();
    }
    pointerDown(e) {
        this.events.push({
            id: e.pointerId,
            clientX: e.clientX,
            clientY: e.clientY,
        });
        const now = new Date().getTime();
        this.oldLeft = e.clientX;
        this.oldTop = e.clientY;
        this.oldDistance = 0;
        this.oldRotate = 0;
        this.getLim();
        if (this.events.length === 2)
            this.fixed = true;
        if (this.events.length === 1) {
            const timesince = now - Number(this.lastTap);
            if ((timesince < 300) && (timesince > 0))
                this.zoomImg(); // Двойной тап
            this.lastTap = new Date().getTime();
        }
    }
    pointerMove(e) {
        if (this.events.length === 1 && !this.fixed) {
            this.left += e.clientX - this.oldLeft;
            this.top += e.clientY - this.oldTop;
            this.moveImg();
            this.oldLeft = e.clientX;
            this.oldTop = e.clientY;
        }
        else if (this.events.length === 2) {
            const curId = e.pointerId;
            const curObj = this.events.filter(item => item.id === curId)[0];
            curObj.clientX = e.clientX;
            curObj.clientY = e.clientY;
            const x1 = this.events[0].clientX;
            const y1 = this.events[0].clientY;
            const x2 = this.events[1].clientX;
            const y2 = this.events[1].clientY;
            this.newDistance = this.getDistance(x1, y1, x2, y2);
            this.newRotate = this.getAngle(x1, y1, x2, y2);
            if (!this.oldRotate)
                this.oldRotate = this.newRotate;
            if (!this.oldDistance)
                this.oldDistance = this.newDistance;
            this.rotate = this.newRotate - this.oldRotate;
            this.oldRotate = this.newRotate;
            this.distance = this.newDistance - this.oldDistance;
            this.oldDistance = this.newDistance;
            // Отделяем поворот от зума
            Math.abs(this.distance) > 5 && this.handlePinch();
            Math.abs(this.rotate) > 2 && this.handelRotate(Math.sign(this.rotate));
        }
        this.changeZoom();
    }
    pointerUp(e) {
        this.events = this.events.filter(item => item.id !== e.pointerId);
        if (this.events.length === 0)
            this.fixed = false;
    }
    // Обработчики событий
    hendlPointerEvents(selector) {
        if (is_touch_device()) {
            selector.on('pointermove', (e) => this.pointerMove(e));
            selector.on('pointerdown', (e) => this.pointerDown(e));
            selector.on('pointerup pointercancel pointerleave pointerout', (e) => this.pointerUp(e));
        }
    }
}
