import AbstractListItem from '../../Abstract/AbstractListItem';
import {NibModel} from '../../../db/models/NibModel';
import {NibStackRouteType} from '../NibNavigator';
import {StyleSheet} from 'react-native';
import {Text, View} from '../../Styling/Themed';
import {useNavigation} from '@react-navigation/native';

export default function NibListItem({nib}: {nib: NibModel}) {
  const navigation = useNavigation<NibStackRouteType['NibList']['navigation']>();

  const styles = StyleSheet.create({
    color: {
      fontSize: 14,
    },
    manufacturer: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    size: {
      textTransform: 'uppercase',
    },
  });

  const goToNib = () => {
    return navigation.navigate('NibView', {nibId: nib._id.toHexString()})
  }

  const nibDataElement = (
    <View>
      <Text style={styles.size}>{nib.size}</Text>
      <Text style={styles.manufacturer}>{nib.manufacturer}</Text>
      <Text style={styles.color}>{nib.colour}</Text>
    </View>
  )

  return (
    <AbstractListItem goToView={goToNib} imageUrl={nib.image.url} objectDataElement={nibDataElement}/>
  );
}
