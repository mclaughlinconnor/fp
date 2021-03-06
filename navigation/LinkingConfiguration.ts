import {LinkingOptions} from '@react-navigation/native';
import * as Linking from 'expo-linking';

import {RootTabParamList} from './types';

const linking: LinkingOptions<RootTabParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Pen: {
        screens: {
          PenCreate: 'create',
          PenList: 'list',
          PenView: 'view',
        },
      },
      Ink: {
        screens: {
          InkCreate: 'create',
          InkList: 'list',
          InkView: 'view',
        },
      },
      Nib: {
        screens: {
          NibCreate: 'create',
          NibList: 'list',
          NibView: 'view',
        },
      },
    },
  },
};

export default linking;
