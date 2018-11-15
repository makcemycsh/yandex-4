import * as React from 'react';
import { withBemMod } from '@bem-react/core';
import {cn}                             from '@bem-react/classname';



const cnButton = cn('Button');

const ButtonLink = (Button, { text, className }) => (
  <a href='./index.html' className={className}><span className={cnButton('Inner')}>{text}</span></a>
);

export const ButtonTypeLink = withBemMod('Button', { Type: 'Link' }, ButtonLink);
