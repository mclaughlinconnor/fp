import AbstractListItem from '../../Abstract/AbstractListItem';
import {InkModel} from '../../../db/models/InkModel';
import {InkStackRouteType} from '../InkNavigator';
import {StyleSheet} from 'react-native';
import {Text, View} from '../../Styling/Themed';
import {useNavigation} from '@react-navigation/native';

export default function InkListItem({ink}: {ink: InkModel}) {
  const navigation = useNavigation<InkStackRouteType['InkList']['navigation']>();

  const styles = StyleSheet.create({
    color: {
      fontSize: 14,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    manufacturer: {
      textTransform: 'uppercase',
    },
  });

  const goToInk = () => {
    return navigation.navigate('InkView', {inkId: ink._id.toHexString()})
  }

  const dataElement = (
    <View>
      <Text style={styles.manufacturer}>{ink.manufacturer}</Text>
      <Text style={styles.name}>{ink.name}</Text>
      <Text style={styles.color}>{ink.colour}</Text>
    </View>
  )

  return (
    <AbstractListItem goToView={goToInk} imageUrl={ink.image.url} objectDataElement={dataElement}/>
  );
}
