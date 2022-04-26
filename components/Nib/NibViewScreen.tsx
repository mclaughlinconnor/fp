import AbstractViewScreen from '../Abstract/AbstractViewScreen';
import {NibModel} from '../../db/models/NibModel';
import {NibStackRouteType} from './NibNavigator';
import {realmInstance} from '../../db/Realm';
import {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function NibViewScreen() {
  const [nib, setNib] = useState<NibModel>()

  const navigation = useNavigation<NibStackRouteType['NibView']['navigation']>();
  const route = useRoute<NibStackRouteType['NibView']['route']>();
  const {nibId} = route.params;

  useEffect(() => {
    const uuid = new Realm.BSON.UUID(nibId);
    const nib = realmInstance.objectForPrimaryKey('Nib', uuid) as NibModel;

    return nib.addListener(() => {
      setNib(realmInstance.objectForPrimaryKey('Nib', uuid));
    });
  }, [realmInstance, nibId])

  if (!nib) {
    return null;
  }

  const goToNibEdit = () => {
    return navigation.navigate('NibCreate', {nibId: nib!._id.toHexString()})
  }

  return (
    <AbstractViewScreen goToEdit={goToNibEdit} data={nib} dataType={'nib'}/>
  )
}
