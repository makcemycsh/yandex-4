import React, {Component} from 'react';
import {cn}               from '@bem-react/classname';

import './menu.scss';

const cnMenu = cn('Menu');

class Menu extends Component {

  toggleActiveClass(e) {
    console.log(e.currentTarget.classList);
    const currentClass = e.currentTarget.classList[0];
    e.currentTarget.classList.toggle(`${currentClass}_Active`);
  }
  render() {
    return (
      <div className={cnMenu()}>
        <div onClick={(e) => this.toggleActiveClass(e)}
             className={cnMenu('Trigger')}>
          <div className={cnMenu('Bars')}></div>
        </div>
        <div className={cnMenu('Nav')}>
          <nav className={cnMenu('NavInner')}>
            <a className={cnMenu('NavItem', {Active: true})} href="index.html">События</a>
            <a className={cnMenu('NavItem')} href="#">Камера</a>
            <a className={cnMenu('NavItem')} href="#">Сводка</a>
            <a className={cnMenu('NavItem')} href="#">Устройства</a>
            <a className={cnMenu('NavItem')} href="#">Сценарии</a>
          </nav>
        </div>
      </div>
    );
  }
}

export default Menu;
