import React, {Component} from 'react';
import {cn}               from '@bem-react/classname';

import './footer.scss';

const cnFooter = cn('Footer');

class Footer extends Component {
  render() {
    return (
      <div className={cnFooter()}>
        <div className={cnFooter('Inner', {Wrapper1280: true})}>
 <span className={cnFooter('Menu')}>
  <a href="./item.html" className={cnFooter('MenuItem')}>Помощь</a>
  <a href="./item.html" className={cnFooter('MenuItem')}>Обратная связь </a>
  <a href="./item.html" className={cnFooter('MenuItem')}>Разработчикам</a>
  <a href="./item.html" className={cnFooter('MenuItem')}>Условия использования</a>
   <a className={cnFooter('MenuItem')}
      href="https://docviewer.yandex.ru/?url=ya-wiki%3A//wiki-api.yandex.ru/shri-2018-ii/homework/adaptivnaja-vjorstka/license.pdf">Авторские права</a>
 </span>
          <div className={cnFooter('Copyright')}>
            <span>© 2001–2017  ООО «Яндекс»</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
