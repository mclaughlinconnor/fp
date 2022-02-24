import {Camera, PermissionStatus} from 'expo-camera';
import {Alert} from 'react-native';

export async function requestPermissions (setCameraStarted: (started: boolean) => void): Promise<void> {
  const {status} = await Camera.requestCameraPermissionsAsync()
  if (status === PermissionStatus.GRANTED) {
    return setCameraStarted(true)
  }

  return Alert.alert('Access denied')
}
