import 'expo-dev-client';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {LogBox} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'expo-status-bar';
import {useEffect, useState} from 'react';
import {GoogleAuthSigninButton} from './db/Firebase/auth/google/GoogleAuthSigninButton';
import {View} from './components/Styling/Themed';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Navigation from './navigation/Navigator';
import Realm from 'realm';
import {openRealm, realmApp} from './db/Realm';

// Warning because I'm using weird versions of Expo SDK and React-Native to use Realm
LogBox.ignoreLogs([
  "Overwriting fontFamily style attribute preprocessor",
  'Setting a timer for a long period of time'
]);

export default function App() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(() => {
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
  }, []);

  if (!isLoadingComplete) {
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
