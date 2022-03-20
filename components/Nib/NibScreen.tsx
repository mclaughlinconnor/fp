import NibList from './NibList/NibList';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ColourService} from '../../styles/ColourService';

export default function NibScreen({}) {
  const colourSvc = new ColourService({});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      ...colourSvc.getColourStyle()
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <NibList />
    </SafeAreaView>
  );
}
