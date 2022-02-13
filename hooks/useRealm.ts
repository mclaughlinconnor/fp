import {useEffect, useRef, useCallback, useState} from 'react';
import Realm from 'realm';
import {PenModel} from '../db/models/PenModel';
import {NibModel} from '../db/models/NibModel';

export function useRealm() {
  // We store a reference to our realm using useRef that allows us to access it via
  // realmRef.current for the component's lifetime without causing rerenders if updated.
  const realmRef = useRef<Realm | null>(null);

  const [isReady, setReady] = useState(false);

  const openRealm = useCallback(async (): Promise<void> => {
    try {
      // Open a local realm file with the schema(s) that are a part of this realm.
      const config = {
        schema: [PenModel.schema, NibModel.schema],
        deleteRealmIfMigrationNeeded: true,
      };

      // Since this is a non-sync realm (there is no "sync" field defined in the "config" object),
      // the realm will be opened synchronously when calling "Realm.open"
      const realm = await Realm.open(config);
      realmRef.current = realm;

      /// FlipperDatabasesPlugin - START

      if (__DEV__) {
        // Import connectDatabases function and required DBDrivers
        const {
          connectDatabases,
          RealmDB,
        } = require('react-native-flipper-databases');

        connectDatabases([
          new RealmDB('Realm', realm), // Pass in realm reference
        ]);
      }

      /// FlipperDatabasesPlugin - END

      setReady(!realm?.isClosed);
    } catch (err) {
      console.error('Error opening realm: ', err);
    }
  }, [realmRef]);

  const closeRealm = useCallback((): void => {
    const realm = realmRef.current;
    // realm?.removeAllListeners();
    realm?.close();
    realmRef.current = null;

    setReady(!realm?.isClosed);
  }, [realmRef]);

  useEffect(() => {
    openRealm();

    // Return a cleanup callback to close the realm to prevent memory leaks
    return closeRealm;
  }, [openRealm, closeRealm]);

  return {
    realmRef,
    isReady,
  };
}
