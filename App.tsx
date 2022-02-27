import {LogBox} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import 'expo-dev-client';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

// Warning because I'm using weird versions of Expo SDK and React-Native to use Realm
LogBox.ignoreLogs([
  "Overwriting fontFamily style attribute preprocessor",
  'Setting a timer for a long period of time'
]);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider style={{flex: 1}}>
        <Navigation colorScheme={colorScheme}/>
        <StatusBar/>
      </SafeAreaProvider>
    );
  }
}
