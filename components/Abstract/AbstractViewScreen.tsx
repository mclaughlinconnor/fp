import {BottomTabProps} from '../../navigation/types';
import {ColourService} from '../../styles/ColourService';
import {GestureResponderEvent, Pressable, ScrollView, StyleSheet} from 'react-native';
import {Image} from 'react-native-expo-image-cache';
import {InkModel} from '../../db/models/InkModel';
import {LinedHeading} from '../Styling/LinedHeading';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {NibModel} from '../../db/models/NibModel';
import {PenModel} from '../../db/models/PenModel';
import {Text, View} from '../Styling/Themed';
import {useNavigation} from '@react-navigation/native';

type PenProps = {
  data: PenModel;
  dataType: 'pen';
}
type NibProps = {
  data: NibModel;
  dataType: 'nib';
}
type InkProps = {
  data: InkModel;
  dataType: 'ink';
}

type Props = {
  goToEdit: (event: GestureResponderEvent) => void;
} & (PenProps | NibProps | InkProps);

export default function AbstractViewScreen({goToEdit, data, dataType}: Props) {
  const colourSvc = new ColourService({});

  const styles = StyleSheet.create({
    headerImage: {
      width: '100%',
      aspectRatio: 1,
    },
    edit: {
      position: 'absolute',
      top: 16,
      right: 16,
      elevation: 8,
      color: colourSvc.getTextColour(undefined, 'primary'),
      padding: 8,
      borderRadius: 8,
      backgroundColor: colourSvc.getColour(undefined, 'primary'),
      zIndex: 1
    },
    textContainer: {
      margin: 12,
    },
    name: {
      textTransform: 'capitalize',
      fontSize: 24,
      fontWeight: 'bold',
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 12,
      alignItems: 'center'
    },
    data: {
      flexDirection: 'column',
      width: '70%',
    },
    image: {
      width: '20%',
      aspectRatio: 1,
    },
  });

  const rootNavigation = useNavigation<BottomTabProps['navigation']>();

  const goToNib = (nib: NibModel) => {
    return rootNavigation.navigate('Nib', {screen: 'NibView', params: {nibId: nib._id.toHexString()}})
  }

  const goToInk = (ink: InkModel) => {
    return rootNavigation.navigate('Ink', {screen: 'InkView', params: {inkId: ink._id.toHexString()}})
  }

  const goToPen = (pen: PenModel) => {
    return rootNavigation.navigate('Pen', {screen: 'PenView', params: {penId: pen._id.toHexString()}})
  }

  const inkView = (ink: InkModel) => {
    return (
      <Pressable onPress={() => !(data === ink) && goToInk(ink)}>
        <LinedHeading text={'Ink'}/>
        <View style={styles.content}>
          <View style={styles.data}>
            <Text style={styles.name}>{ink.manufacturer} {ink.name}</Text>
            <Text>Ink volume: {ink.volume}ml</Text>
            <Text>Ink colour: {ink.colour}</Text>
          </View>
          <Image style={styles.image} uri={ink.image.url}/>
        </View>
      </Pressable>
    )
  }

  const nibView = (nib: NibModel) => {
    return (
      <Pressable onPress={() => !(data === nib) && goToNib(nib)}>
        <LinedHeading text={'Nib'}/>
        <View style={styles.content}>
          <View style={styles.data}>
            <Text style={styles.name}>{nib.manufacturer} {nib.size}</Text>
            <Text>Size: {nib.colour}</Text>
          </View>
          <Image style={styles.image} uri={nib.image.url}/>
        </View>
      </Pressable>
    );
  };

  const penView = (pen: PenModel) => {
    return (
      <Pressable onPress={() => !(data === pen) && goToPen(pen)}>
        <LinedHeading text={'Pen'}/>
        <View style={styles.content}>
          <View style={styles.data}>
            <Text style={styles.name}>{pen.manufacturer} {pen.name}</Text>
            <Text>Colour: {pen.colour}</Text>
          </View>
          <Image style={styles.image} uri={pen.image.url}/>
        </View>
      </Pressable>
    );
  }

  const getPrimaryView = () => {
    switch (dataType) {
      case 'pen':
        return penView(data as PenModel);
      case 'ink':
        return inkView(data as InkModel);
      case 'nib':
        return nibView(data as NibModel);
    }
  }

  return (
    <View>
      <MaterialCommunityIcons style={styles.edit} name={'pencil'} size={32} onPress={goToEdit}/>
      <ScrollView>
        <View elevation={4}>
          <Image style={styles.headerImage} uri={data.image.url}/>
        </View>
        <View style={styles.textContainer}>
          {getPrimaryView()}
          {'nib' in data && data.nib ? nibView(data.nib) : null}
          {'ink' in data && data.ink ? inkView(data.ink) : null}
          {'pens' in data && data.pens ? data.pens.map(penView) : null}
        </View>
      </ScrollView>
    </View>
  )
}
