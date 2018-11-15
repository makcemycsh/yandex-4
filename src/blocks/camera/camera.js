import React, {Component} from 'react';
import {cn}               from '@bem-react/classname';
import Pointable          from 'react-pointable';


import img1 from '../../assets/img/card-1.png';

import './camera.scss';

export const cnCamera = cn('Camera');

class Camera extends Component {


  render() {
    return (
      <div className={cnCamera()}>
        <Pointable>
          <div className={cnCamera('Img')}>
            <div className={cnCamera('Wrapper', ['JsImgWrapper'])} touch-action="none">
              <img className={cnCamera('ImgInner')}
                   src={img1} alt="yandex"/>
            </div>
            <div className={cnCamera('Scroll', ['ModOnlyTouch', 'JsScroll'])}></div>
          </div>
        </Pointable>
        <div className={cnCamera('Stat', ['ModOnlyTouch'])}>
          <span>Приближение: <span className="JsZoom">45</span>%</span>
          <span>Яркость: <span className="JsBrightness">50</span>%</span>
        </div>
      </div>
    );
  }
}

export default Camera;
