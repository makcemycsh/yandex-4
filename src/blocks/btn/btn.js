import React, {Component}               from 'react';
import {cn}                             from '@bem-react/classname';
import {compose}                        from '@bem-react/core';
import {ButtonPrimary, ButtonSecondary} from './_mod/index';
import {ButtonTypeLink}                 from './_type/index';

import './btn.scss';


const cnButton = cn('Button');

class Button extends Component {

  render() {
    return (
      <button className={this.props.className}><span className={cnButton('Inner')}>{this.props.text}</span></button>
    );
  }
}

export default compose(
  ButtonPrimary,
  ButtonSecondary,
  ButtonTypeLink,
)(Button);
