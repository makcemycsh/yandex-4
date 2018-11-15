import React, {Component}                              from 'react';
import {cn}                                            from '@bem-react/classname';
import {compose}                                       from '@bem-react/core';
import {CardSizeL, CardSizeM, CardSizeS, CardCritical} from './_mod/index';
import {RegistryConsumer}                              from '@bem-react/di';
import {cnCamera}                                      from '../camera/camera';


import Music   from '../music/music';
import DataSet from '../data-set/data-set';
import Button  from '../btn/btn';
import Camera  from '../camera/camera';

import imgSvg from '../../assets/img/Richdata.svg';
import imgPng from '../../assets/img/Richdata@2x.png';

import './card.scss';


const cnCard = cn('Card');

class Card extends Component {
  render() {
    const data = this.props.event;
    let content;
    if (data.description || data.data) content = this.dataMain(data);

    return (
      <div className={this.props.className}>
        <div className={cnCard('Head')}>
          <header className={cnCard('HeadHeader')}>
            <i className={cnCard('Icon', ['Icon', `I-${data.icon}`])}></i>
            <h3 className={cnCard('Title')}>{data.title}</h3>
          </header>
          <div className={cnCard('Info')}>
            <span className={cnCard('InfoSpan')}>{data.source}</span>
            <span className={cnCard('InfoSpan')}>{data.time}</span>
          </div>
        </div>
        {content}
        <button className={cnCard('Close')}><i className={cnCard('Icon', ['Icon', 'I-close'])}></i>
        </button>
        <a href="#" className={cnCard('Link')}>
          <i className={cnCard('Icon', ['Icon', 'Icon_ArrowR'])}></i>
        </a>
      </div>
    );
  }

  dataMain(data) {
    return (
      <div className={cnCard('Main')}>
        {data.description ? (<p className={cnCard('Text')}>{data.description}</p>) : ('')}
        {data.data ? (this.dataTemplate(data.data)) : ('')}
      </div>
    );
  }

  dataTemplate(data) {
    return (
      <React.Fragment>
        {data.albumcover ? (this.dataMusic(data)) : ('')}
        {data.temperature ? (this.dataWeather(data)) : ('')}
        {data.buttons ? (this.dataButtons(data)) : ('')}
        {data.image ? (this.dataImage(data)) : ('')}
        {data.type === 'graph' ? (this.dataGraph(data)) : ('')}
      </React.Fragment>
    );
  }

  dataMusic(data) {
    return (
      <div className={cnCard('Data')}>
        <Music
          albumcover={data.albumcover}
          artist={data.artist}
          trackName={data.track.name}
          volume={data.volume}
          trackLength={data.track.length}
        />
      </div>
    );
  }

  dataWeather(data) {
    return (
      <div className={cnCard('Data')}>
        <DataSet
          temperature={data.temperature}
          humidity={data.humidity}
        />
      </div>
    );
  }

  dataButtons(data) {
    return (
      <div className={cnCard('Data')}>
        <div className={cnCard('Btns')}>
          {data.buttons.map((btn, i) =>
            <Button
              key={i}
              text={btn}
              Theme={i === 0 ? 'Primary' : 'Secondary'}
            />,
          )}
        </div>
      </div>);
  }

  dataImage(data) {
    return (
      <div className={cnCard('Data', ['JsPointerEvent'])}>
        <RegistryConsumer>
          {(registries) => {
            const {layout} = registries;
            const Camera = layout.get(cnCamera());

            return (
              <Camera/>
            );
          }}
        </RegistryConsumer>
      </div>);
  }

  dataGraph(data) {
    return (
      <div className={cnCard('Data')}>
        <picture className={cnCard('Picture')}>
          <source srcSet={imgSvg} type="image/svg+xml"/>
          <img className={cnCard('Img')} src={imgPng} alt="yandex"/>
        </picture>
      </div>
    );
  }
}

export default compose(
  CardSizeL,
  CardSizeM,
  CardSizeS,
  CardCritical,
)(Card);
