/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName, TouchableOpacity} from 'react-native';

import useColorScheme from '../hooks/useColorScheme';
import NotFoundScreen from '../screens/NotFoundScreen';
import {RootStackParamList, RootTabParamList} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import {Colours} from '../styles/Colours';
import PenNavigator from '../components/Pen/PenNavigator';
import {ColourService} from '../styles/ColourService';
import {GoogleAuth} from '../db/Firebase/auth/google/google';
import NibNavigator from '../components/Nib/NibNavigator';

export default function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  return (<NavigationContainer
    linking={LinkingConfiguration}
    theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <RootNavigator/>
  </NavigationContainer>);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (<Stack.Navigator>
    <Stack.Screen name="Root" component={BottomTabNavigator} options={{headerShown: false}}/>
    <Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>
  </Stack.Navigator>);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const colourSvc = new ColourService({});
  const googleAuthSvc = new GoogleAuth();

  return (<BottomTab.Navigator
    initialRouteName="Pen"
    screenOptions={{
      tabBarActiveTintColor: Colours[colorScheme].color.primary.light,
      tabBarStyle: {
        height: 60,
        paddingBottom: 5,
      },
    }}>
    <BottomTab.Screen
      name="Pen"
      component={PenNavigator}
      options={{
        title: 'Pen List',
        tabBarIcon: ({color}) => <MCITabBarIcon name="fountain-pen" color={color}/>,
        headerRight: () => (
          <TouchableOpacity onPress={googleAuthSvc.logout}>
            <MaterialCommunityIcons name={'logout'} size={24} style={{marginRight: 16, color: colourSvc.getTextColour(undefined, 'background')}}/>
          </TouchableOpacity>
        ),
      }}
    />
    <BottomTab.Screen
      name="Nib"
      component={NibNavigator}
      options={{
        title: 'Nib List',
        tabBarIcon: ({color}) => <MCITabBarIcon name="fountain-pen-tip" color={color}/>,
        headerRight: () => (
          <TouchableOpacity onPress={googleAuthSvc.logout}>
            <MaterialCommunityIcons name={'logout'} size={24} style={{marginRight: 16, color: colourSvc.getTextColour(undefined, 'background')}}/>
          </TouchableOpacity>
        ),
      }}
    />
  </BottomTab.Navigator>);
}

function MCITabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name']; color: string;
}) {
  return <MaterialCommunityIcons size={40} style={{marginBottom: - 3}} {...props} />;
}
