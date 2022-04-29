import 'expo-dev-client';
import * as SplashScreen from 'expo-splash-screen';
import Navigation from './navigation/Navigator';
import Realm from 'realm';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import useNetworkState from './hooks/useNetworkState';
import {GoogleAuthSigninButton} from './db/Firebase/auth/google/GoogleAuthSigninButton';
import {LogBox, ToastAndroid} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {View} from './components/Styling/Themed';
import {openRealm, realmApp} from './db/Realm';
import {useEffect, useState} from 'react';

// Warning because I'm using weird versions of Expo SDK and React-Native to use Realm
LogBox.ignoreLogs([
  "Overwriting fontFamily style attribute preprocessor",
  'Setting a timer for a long period of time'
]);

export default function App() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const isLoadingComplete = useCachedResources();
  const networkState = useNetworkState();
  const colorScheme = useColorScheme();

  useEffect(() => {
    if (!networkState?.isInternetReachable) {
      return;
    }

    return auth()
      .onAuthStateChanged(async (user) => {
        setUser(user)

        if (user) {
          const jwt = await user.getIdToken()
          const credentials = Realm.Credentials.jwt(jwt);

          await realmApp.logIn(credentials);
          await openRealm();

          setIsLoggedIn(true);

        } else {
          await realmApp.currentUser?.logOut()
        }
      });
  }, [networkState?.isInternetReachable]);

  useEffect(() => {
    const handle = async () => {
      if (networkState && !networkState.isInternetReachable) {
        ToastAndroid.show('There is no internet connection, try again later', ToastAndroid.LONG);
      } else {
        await SplashScreen.hideAsync();
      }
    }

    handle().then(() => console.log('Handled network event'))
  }, [networkState?.isInternetReachable])

  if (!isLoadingComplete || !networkState?.isInternetReachable) {
    return null;
  }

  if (!user) {
    return (
      <SafeAreaProvider>
        <View brightness={colorScheme} colour={'surface'} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <GoogleAuthSigninButton/>
        </View>
      </SafeAreaProvider>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <SafeAreaProvider style={{flex: 1}}>
      <Navigation colorScheme={colorScheme}/>
      <StatusBar/>
    </SafeAreaProvider>
  );
}
