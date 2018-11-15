import {cn}                     from '@bem-react/classname';
import {Registry, withRegistry} from '@bem-react/di';
import Camera                   from '../camera/camera@click';
import {cnCamera}               from '../camera/camera@click';

import Layout from './layout';

const cnLayout = cn('Layout');

const registry = new Registry({id: 'layout'});
registry.set(cnCamera(), Camera);

export const AppClick = withRegistry(registry)(Layout);
