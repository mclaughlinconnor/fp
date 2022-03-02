import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import NibScreen from './NibScreen';
import NibCreateScreen from './NibCreateScreen';
import {RootTabParamList} from '../../types';

export type NibStackParamList = {
  NibList: undefined;
  NibCreate: undefined;
};

export type Props = NativeStackScreenProps<RootTabParamList, 'Nib'>;

const NibStack = createNativeStackNavigator<NibStackParamList>();

export default function NibNavigator() {
  return (
    <NibStack.Navigator>
      <NibStack.Screen name='NibList' component={NibScreen} options={{headerShown: false}}/>
      <NibStack.Screen name='NibCreate' component={NibCreateScreen} options={{headerShown: false}}/>
    </NibStack.Navigator>
  )
}