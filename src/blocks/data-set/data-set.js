import React, {Component} from 'react';
import {cn}               from '@bem-react/classname';

import './data-set.scss';

const cnDataSet = cn('DataSet');

class DataSet extends Component {

  render() {
    return (
      <div className={cnDataSet()}>
        <div className={cnDataSet('Item')}>
          <p className={cnDataSet('Name')}>
            Температура: <span className={cnDataSet('Val')}>{this.props.temperature} C</span>
          </p>
        </div>
        <div className={cnDataSet('Item')}>
          <p className={cnDataSet('Name')}>
            Влажность: <span className={cnDataSet('Val')}>{this.props.humidity}%</span>
          </p>
        </div>
      </div>
    );
  }
}

export default DataSet;
