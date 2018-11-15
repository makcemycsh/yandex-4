import {Registry, withRegistry} from '@bem-react/di';
import Camera                   from '../camera/camera@touch';
import {cnCamera}               from '../camera/camera@click';

import Layout from './layout';

const registry = new Registry({id: 'layout'});
registry.set(cnCamera(), Camera);

export const AppTouch = withRegistry(registry)(Layout);
