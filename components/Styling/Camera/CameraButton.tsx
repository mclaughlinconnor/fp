import {Button, StyleSheet} from 'react-native';
import {View} from '../Themed';
import {requestPermissions} from './Utils';
import {ColourService} from '../../../styles/ColourService';

const cameraButtonStyles = StyleSheet.create({
  container: {
    width: '100%'
  },
})

export type Props = {
  setCameraStarted: ((started: boolean) => void);
}

export function CameraButton({setCameraStarted}: Props) {
  const colourSvc = new ColourService({});

  const startCamera = () => {
    return requestPermissions(setCameraStarted);
  }

  return (
    <View style={cameraButtonStyles.container}>
      <Button onPress={startCamera} title={'Capture'} color={colourSvc.getColour(undefined, 'primary')}/>
    </View>
  )
}
