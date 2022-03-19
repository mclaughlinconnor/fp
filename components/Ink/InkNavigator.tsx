import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import InkScreen from './InkScreen';
import InkCreateScreen from './InkCreateScreen';
import {RootTabParamList} from '../../navigation/types';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import InkViewScreen from './InkViewScreen';

export type InkStackParamList = {
  InkList: undefined;
  InkCreate: {inkId?: string};
  InkView: {inkId: string};
};

export type InkStackRouteType = {
  InkList: NativeStackScreenProps<InkStackParamList, 'InkList'>
  InkCreate: NativeStackScreenProps<InkStackParamList, 'InkCreate'>
  InkView: NativeStackScreenProps<InkStackParamList, 'InkView'>
}

export type Props = NativeStackScreenProps<RootTabParamList, 'Ink'>;

export function getInkHeaderTitle({route}: Props) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Ink List';

  switch (routeName) {
    case 'InkList':
      return 'Ink List'
    case 'InkCreate':
      return 'Ink Create'
    case 'InkView':
      return 'Ink View'
  }

  return routeName;
}

const InkStack = createNativeStackNavigator<InkStackParamList>();

export default function InkNavigator() {
  return (
    <InkStack.Navigator>
      <InkStack.Screen name='InkList' component={InkScreen} options={{headerShown: false}}/>
      <InkStack.Screen name='InkCreate' component={InkCreateScreen} options={{headerShown: false}}/>
      <InkStack.Screen name='InkView' component={InkViewScreen} options={{headerShown: false}}/>
    </InkStack.Navigator>
  )
}
