import React, {Component} from 'react';
import {cn}               from '@bem-react/classname';
import Menu               from '../menu/menu';
import './header.scss';

const cnHead = cn('Head');

class Head extends Component {
  render() {

    return (
      <div className={cnHead()}>
        <div className={cnHead('Inner', ['Wrapper1280'])}>
            <a href="index.html">
            <div className={cnHead('Logo')}></div>
            </a>
          <Menu/>
        </div>
      </div>
    );
  }
}

export default Head;
