import React, {Component} from 'react';
import {cn}               from '@bem-react/classname';

import img1 from '../../assets/img/card-1.png';

import './camera@click.scss';

export const cnCamera = cn('Camera');

class Camera extends Component {
  render() {
    return (
      <div className={cnCamera()}>
          <div className={cnCamera('Img')}>
            <div className={cnCamera('Wrapper')}>
              <img className={cnCamera('ImgInner')}
                   src={img1} alt="yandex"/>
            </div>
          </div>
      </div>
    );
  }
}

export default Camera;
