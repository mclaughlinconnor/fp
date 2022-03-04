import * as React from 'react';
import InkNavigator, {getInkHeaderTitle} from '../components/Ink/InkNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import NibNavigator, {getNibHeaderTitle} from '../components/Nib/NibNavigator';
import PenNavigator, {getPenHeaderTitle} from '../components/Pen/PenNavigator';
import useColorScheme from '../hooks/useColorScheme';
import {ColorSchemeName, TouchableOpacity} from 'react-native';
import {ColourService} from '../styles/ColourService';
import {Colours} from '../styles/Colours';
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {GoogleAuth} from '../db/Firebase/auth/google/google';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {RootTabParamList} from './types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default function Navigation({colorScheme}: {colorScheme: ColorSchemeName}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
    <RootTabNavigator/>
    </NavigationContainer>
  );
}

const Logout = () => {
  const colourSvc = new ColourService({});
  const googleAuthSvc = new GoogleAuth();

  return (
    <TouchableOpacity onPress={googleAuthSvc.logout}>
      <MaterialCommunityIcons
        name={'logout'}
        size={24}
        style={{
          marginRight: 16,
          color: colourSvc.getTextColour(undefined, 'background')
        }}
      />
    </TouchableOpacity>
  );
}

const RootTab = createBottomTabNavigator<RootTabParamList>();

function RootTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <RootTab.Navigator
      initialRouteName="Pen"
      screenOptions={{
        tabBarActiveTintColor: Colours[colorScheme].color.primary.light,
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
        headerRight: () => <Logout/>
      }}>
      <RootTab.Screen
        name="Pen"
        component={PenNavigator}
        options={(navigation) => ({
          headerTitle: getPenHeaderTitle(navigation),
          tabBarIcon: ({color}) => (<MCITabBarIcon name="fountain-pen" color={color}/>)
        })}
      />
      <RootTab.Screen
        name="Nib"
        component={NibNavigator}
        options={(navigation) => ({
          headerTitle: getNibHeaderTitle(navigation),
          tabBarIcon: ({color}) => (<MCITabBarIcon name="fountain-pen-tip" color={color}/>)
        })}
      />
      <RootTab.Screen
        name="Ink"
        component={InkNavigator}
        options={(navigation) => ({
          headerTitle: getInkHeaderTitle(navigation),
          tabBarIcon: ({color}) => (<MCITabBarIcon name="water" color={color}/>)
        })}
      />
    </RootTab.Navigator>
  );
}

function MCITabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
}) {
  return <MaterialCommunityIcons size={40} style={{marginBottom: - 3}} {...props} />;
}
