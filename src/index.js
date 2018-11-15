import React    from 'react';
import ReactDOM from 'react-dom';

import './styles/main.scss';

import {AppClick} from './blocks/layout/layout@click';
import {AppTouch} from './blocks/layout/layout@touch';

import * as serviceWorker from './serviceWorker';
import $                  from 'jquery';
import {isTouchDevice}    from './scripts/helpers';
import PointerHandler     from './scripts/pointer-handler';


// Проверяем тип устройства
if (isTouchDevice()) {
  $(document.body).addClass('IsTouch');
} else {
  $(document.body).addClass('NoTouch');
}


const App = isTouchDevice() ? AppTouch : AppClick;


ReactDOM.render(<App/>, document.getElementById('root'));


if (isTouchDevice()) {
  $('.JsPointerEvent').each(function(i, e) {
    new PointerHandler(e);
  });
}

serviceWorker.unregister();
