import Realm from 'realm';
import {PenModel} from './models/PenModel';
import {NibModel} from './models/NibModel';

const config = {
  schema: [PenModel.schema, NibModel.schema],
  deleteRealmIfMigrationNeeded: true,
};

export const realmInstance = new Realm(config);

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
