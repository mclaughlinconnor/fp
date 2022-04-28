import {useEffect, useState} from 'react';
import * as Network from 'expo-network';

export default function useNetworkState() {
  const [networkState, setNetworkState] = useState<Network.NetworkState>();

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function getNetworkState() {
      setNetworkState(await Network.getNetworkStateAsync());
    }

    getNetworkState().then(() => console.log('Network state gotten'));
  }, []);

  return networkState;
}
