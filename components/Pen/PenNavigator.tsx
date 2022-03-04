import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import PenScreen from './PenScreen';
import PenCreateScreen from './PenCreateScreen';
import {RootTabParamList} from '../../navigation/types';
import PenViewScreen from './PenViewScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

export type PenStackParamList = {
  PenList: undefined;
  PenCreate: undefined;
  PenView: {penId: string};
};

export type PenStackRouteType = {
  PenList: NativeStackScreenProps<PenStackParamList, 'PenList'>
  PenCreate: NativeStackScreenProps<PenStackParamList, 'PenCreate'>
  PenView: NativeStackScreenProps<PenStackParamList, 'PenView'>
}

export type Props = NativeStackScreenProps<RootTabParamList, 'Pen'>;

export function getPenHeaderTitle({route}: Props) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Pen List';

  switch (routeName) {
    case 'PenList':
      return 'Pen List'
    case 'PenCreate':
      return 'Pen Create'
    case 'PenView':
      return 'Pen View'
  }

  return routeName;
}

const PenStack = createNativeStackNavigator<PenStackParamList>();

export default function PenNavigator() {
  return (
    <PenStack.Navigator>
      <PenStack.Screen name='PenList' component={PenScreen} options={{headerShown: false}}/>
      <PenStack.Screen name='PenCreate' component={PenCreateScreen} options={{headerShown: false}}/>
      <PenStack.Screen name='PenView' component={PenViewScreen} options={{headerShown: false}}/>
    </PenStack.Navigator>
  )
}
