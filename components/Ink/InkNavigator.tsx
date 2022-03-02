import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import InkScreen from './InkScreen';
import InkCreateScreen from './InkCreateScreen';
import {RootTabParamList} from '../../types';

export type InkStackParamList = {
  InkList: undefined;
  InkCreate: undefined;
};

export type Props = NativeStackScreenProps<RootTabParamList, 'Ink'>;

const InkStack = createNativeStackNavigator<InkStackParamList>();

export default function InkNavigator() {
  return (
    <InkStack.Navigator>
      <InkStack.Screen name='InkList' component={InkScreen} options={{headerShown: false}}/>
      <InkStack.Screen name='InkCreate' component={InkCreateScreen} options={{headerShown: false}}/>
    </InkStack.Navigator>
  )
}
