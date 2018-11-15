import React, {Component} from 'react';
import {cn}               from '@bem-react/classname';

import Head   from '../header/header';
import Footer from '../footer/footer';
import Main   from '../main/main';

import './layout.scss';

const cnLayout = cn('Layout');

class Layout extends Component {
  render() {
    return (
      <div className={cnLayout()}>
        <Head/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default Layout;
