"use strict";
// import { RegExpVisitor } from 'regexpp/visitor';
// import Handlers = module;
var $document = $(document);
var $window = $(window);
$document.ready(handleEvents);
function handleEvents() {
    // Фиксация хедера при скролле
    $window.scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('body').addClass('head-is-fixed');
            $('.head-is-fixed').css('margin-top', 125);
        }
        else {
            $('.head-is-fixed').css('margin-top', 0);
            $('body').removeClass('head-is-fixed');
        }
    });
    // Выпадающее меню
    $('.js-menu-bar').on('click', function () {
        $(this).toggleClass('is-active');
    });
}
$.getJSON('assets/json/events.json').done(function (data) {
    $.each(data.events, function (i, item) {
        template(item);
    });
    $('.js-pointer-event').each(function (i, e) {
        new Handler(e);
    });
});
function template(event) {
    var card = "<div class=\"b-card mod-" + event.size + "  " + (event.type === 'critical' ? 'mod-attention' : '') + " \">\n      <div class=\"b-card__head\">\n        <header>\n          <i class=\"b-card__ico icon i-" + event.icon + "\"></i>\n          <h3 class=\"b-card__title\">" + event.title + "</h3>\n        </header>\n        <div class=\"b-card__info\">\n          <span class=\"b-card__name\">" + event.source + "</span>\n          <span class=\"b-card__time\">" + event.time + "</span>\n        </div>\n      </div>\n      " + (event.description || event.data ? dataMain(event) : '') + "\n      <button class=\"b-card__close\"><i class=\"b-card__ico icon i-close\"></i>\n      </button>\n      <a href=\"#\" class=\"b-card__link\">\n        <i class=\"b-card__ico icon i-arrow-r\"></i>\n      </a>\n    </div>";
    insertHtml($('#js-card-list'), $(card));
}
function dataMain(data) {
    return "<div class=\"b-card__main\">\n      " + (data.description ? "<p class='b-card__text'>" + data.description + "</p>" : '') + "\n      " + (data.data ? dataTemplate(data.data) : '') + "\n      </div>";
}
function dataTemplate(data) {
    return (data.albumcover ? dataMusic(data) : '') + "\n  " + (data.temperature ? dataWeather(data) : '') + "\n  " + (data.buttons ? dataButtons(data) : '') + "\n  " + (data.image ? dataImage() : '') + "\n  " + (data.type === 'graph' ? dataGraph() : '');
}
function dataGraph() {
    return "<div class=\"b-card__data\">\n           <picture>\n            <source srcset=\"assets/img/Richdata.svg\" type=\"image/svg+xml\">\n            <img src=\"assets/img/Richdata@2x.png\" alt=\"yandex\">\n          </picture>\n          </div>";
}
function dataImage() {
    return "<div class=\"b-card__data js-pointer-event\">\n          <div class=\"b-cam\">\n            <div class=\"b-cam__img\">\n            <div class=\"b-cam__wrapper js-img-wrapper\">\n            <img src=\"assets/img/card-1.png\" alt=\"yandex\"\n               srcset=\"assets/img/card-1@x2.png 800w, assets/img/card-1@x3.png 1200w\">\n               </div>\n                <div class=\"b-cam__scroll mod-only-touch js-scroll\"></div>\n               </div>\n            <div class=\"b-cam__stat mod-only-touch\">\n              <span>\u041F\u0440\u0438\u0431\u043B\u0438\u0436\u0435\u043D\u0438\u0435: <span class=\"js-zoom\">45</span>%</span>\n              <span>\u042F\u0440\u043A\u043E\u0441\u0442\u044C: <span class=\"js-brightness\">50</span>%</span>\n            </div>\n            </div>\n           </div>";
}
function dataButtons(data) {
    return "<div class=\"b-card__data\">\n            <div class=\"b-card__btns\">\n                " + data.buttons.map(function (btn) { return " <button class=\"b-btn " + (btn === 'Да' ? 'mod-yellow' : '') + "\">" + btn + "</button>"; }).join('') + "\n            </div>\n          </div>";
}
function dataWeather(data) {
    return "<div class=\"b-card__data\">\n            <div class=\"b-data-set\">\n              <div class=\"b-data-set__item\">\n                <p class=\"b-data-set__name\">\n                  \u0422\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430: <span class=\"b-data-set__val\">" + data.temperature + " C</span>\n                </p>\n              </div>\n              <div class=\"b-data-set__item\">\n                <p class=\"b-data-set__name\">\n                  \u0412\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u044C: <span class=\"b-data-set__val\">" + data.humidity + "%</span>\n                </p>\n              </div>\n            </div>\n          </div>";
}
function dataMusic(data) {
    return "<div class=\"b-card__data\">\n           <div class=\"b-music\">\n            <div class=\"b-music__section\">\n              <div class=\"b-music__logo\">\n                <img src=\"" + data.albumcover + "\" alt=\"" + data.artist + "\">\n              </div>\n              <div class=\"b-music__info\">\n                <p class=\"b-music__name\">\n                 " + data.artist + " - " + data.track.name + "\n                </p>\n                <div class=\"b-music__duration\">\n                  <input id='range-1' type=\"range\" name=\"volume\"\n                         min=\"0\" max=\"100\"/>\n                  <label for=\"range-1\">" + data.track.length + "</label>\n                </div>\n              </div>\n            </div>\n            <div class=\"b-music__section\">\n              <div class=\"b-music__controls\">\n                <button class=\"b-music__prev icon i-prev\"></button>\n                <button class=\"b-music__next icon i-next\"></button>\n                <div class=\"b-music__val\">\n                  <input id='range-2' type=\"range\" name=\"volume\"\n                         min=\"0\" max=\"100\" value=\"" + data.volume + "\"/>\n                  <label for=\"range-2\">" + data.volume + "%</label>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>";
}
function insertHtml($parent, $content) {
    $parent.append($content);
}
