import NibList from './NibList/NibList';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Props} from './NibNavigator';
import {ColourService} from '../../styles/ColourService';

export default function NibScreen({route, navigation}: Props) {
  const colourSvc = new ColourService({});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      ...colourSvc.getColourStyle()
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <NibList navigation={navigation} route={route}/>
    </SafeAreaView>
  );
}
