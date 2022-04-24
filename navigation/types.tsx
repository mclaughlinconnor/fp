/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {PenStackParamList} from '../components/Pen/PenNavigator';
import {NibStackParamList} from '../components/Nib/NibNavigator';
import {InkStackParamList} from '../components/Ink/InkNavigator';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

export type ContainerStackParamList = {
  Root: undefined;
};

export type RootTabParamList = {
  Pen: NavigatorScreenParams<PenStackParamList>;
  Ink: NavigatorScreenParams<InkStackParamList>;
  Nib: NavigatorScreenParams<NibStackParamList>;
};

export type BottomTabProps = BottomTabScreenProps<RootTabParamList>;

export type RootScreenProps = NativeStackScreenProps<ContainerStackParamList, 'Root'>;
