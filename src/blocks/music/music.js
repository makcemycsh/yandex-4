import React, {Component} from 'react';
import {cn}               from '@bem-react/classname';

import './music.scss';

const cnMusic = cn('Music');

class Music extends Component {

  render() {
    return (
      <div className={cnMusic()}>
        <div className={cnMusic('Section')}>
          <div className={cnMusic('Logo')}>
            <img className={cnMusic('LogoImg')} src={this.props.albumcover} alt={this.props.artist}/>
          </div>
          <div className={cnMusic('Info')}>
            <p className={cnMusic('Name')}>
              {this.props.artist} - {this.props.trackName}
            </p>
            <div className={cnMusic('Duration')}>
              <input className={cnMusic('DurationInput')} id='range-1' type="range" name="volume"
                     min="0" max="100"/>
              <label htmlFor="range-1">{this.props.trackLength}</label>
            </div>
          </div>
        </div>
        <div className={cnMusic('Section')}>
          <div className={cnMusic('Controls')}>
            <button className={cnMusic('Btn', ['Icon','Icon_Prev'], {Prev: true})}></button>
            <button className={cnMusic('Btn', ['Icon', 'Icon_Next'], {Next: true})}></button>
            <div className={cnMusic('Val')}>
              <input className={cnMusic('ValInput')} id='range-2' type="range" name="volume"
                     min="0" max="100" defaultValue="${data.volume}"/>
              <label htmlFor="range-2">{this.props.volume}%</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Music;
