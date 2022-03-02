import InkList from './InkList/InkList';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Props} from './InkNavigator';
import {ColourService} from '../../styles/ColourService';

export default function InkScreen({route, navigation}: Props) {
  const colourSvc = new ColourService({});

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      ...colourSvc.getColourStyle()
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <InkList navigation={navigation} route={route}/>
    </SafeAreaView>
  );
}
