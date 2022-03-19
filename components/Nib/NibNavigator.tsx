import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import NibScreen from './NibScreen';
import NibCreateScreen from './NibCreateScreen';
import {RootTabParamList} from '../../navigation/types';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import NibViewScreen from './NibViewScreen';

export type NibStackParamList = {
  NibList: undefined;
  NibCreate: {nibId?: string};
  NibView: {nibId: string};
};

export type NibStackRouteType = {
  NibList: NativeStackScreenProps<NibStackParamList, 'NibList'>
  NibCreate: NativeStackScreenProps<NibStackParamList, 'NibCreate'>
  NibView: NativeStackScreenProps<NibStackParamList, 'NibView'>
}

export type Props = NativeStackScreenProps<RootTabParamList, 'Nib'>;

const NibStack = createNativeStackNavigator<NibStackParamList>();

export function getNibHeaderTitle({route}: Props) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Nib List';

  switch (routeName) {
    case 'NibList':
      return 'Nib List'
    case 'NibCreate':
      return 'Nib Create'
    case 'NibView':
      return 'Nib View'
  }

  return routeName;
}

export default function NibNavigator() {
  return (
    <NibStack.Navigator>
      <NibStack.Screen name='NibList' component={NibScreen} options={{headerShown: false}}/>
      <NibStack.Screen name='NibCreate' component={NibCreateScreen} options={{headerShown: false}}/>
      <NibStack.Screen name='NibView' component={NibViewScreen} options={{headerShown: false}}/>
    </NibStack.Navigator>
  )
}