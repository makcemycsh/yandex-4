import React, {Component} from 'react';
import * as data          from '../../assets/json/events.json';
import Card               from '../card/card';
import {cn}               from '@bem-react/classname';
import './main.scss';


const cnContent = cn('Content');

class Main extends Component {
  render() {
    return (
      <section className={cnContent(null, ['Wrapper1280'])}>
        <h1 className={cnContent('Title')}>Лента событий</h1>
        <div className={cnContent('Inner')}>

          {data.events.map((event, i) => (
            <Card
              key={i}
              Size={event.size}
              Type={event.type}
              event={event}
            />
          ))}

        </div>
      </section>
    );
  }
}

export default Main;
