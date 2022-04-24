import Realm from 'realm';
import {PenModel} from './models/PenModel';
import {NibModel} from './models/NibModel';
import {FileModel} from './models/FileModel';
import {InkModel} from './models/InkModel';
import {realmId} from '../constants/API';
import {PenUpdateModel} from './models/PenUpdateModel';

export const realmApp = new Realm.App({
  id: realmId,
});

export let realmInstance: Realm;

export async function openRealm() {
  if (!realmApp.currentUser) {
    return;
  }

  realmInstance = await Realm.open({
    schema: [
      PenModel.schema,
      NibModel.schema,
      FileModel.schema,
      InkModel.schema,
      PenUpdateModel.schema,
    ],
    sync: {
      user: realmApp.currentUser,
      partitionValue: realmApp.currentUser.id,
    },
    schemaVersion: 2,
  });

/// FlipperDatabasesPlugin - START

  if (__DEV__) {
    // Import connectDatabases function and required DBDrivers
    const {
      connectDatabases,
      RealmDB,
    } = require('react-native-flipper-databases');

    connectDatabases([
      new RealmDB('Realm', realmInstance), // Pass in realm reference
    ]);
  }

/// FlipperDatabasesPlugin - END

}
