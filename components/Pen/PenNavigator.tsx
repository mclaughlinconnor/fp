import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import PenScreen from './PenScreen';
import {RootTabParamList} from '../../types';

export type PenStackParamList = {
  PenList: undefined;
};

export type Props = NativeStackScreenProps<RootTabParamList, 'Pen'>;

const PenStack = createNativeStackNavigator<PenStackParamList>();

export default function PenNavigator() {
  return (
    <PenStack.Navigator>
      <PenStack.Screen name='PenList' component={PenScreen} options={{headerShown: false}}/>
    </PenStack.Navigator>
  )
}