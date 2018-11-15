import React, {Component} from 'react';

import './styles/main.scss';
import Head   from './blocks/header/header';
import Footer from './blocks/footer/footer';
import Main   from './blocks/main/main';

import './App.css';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Head/>
        <Main/>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
