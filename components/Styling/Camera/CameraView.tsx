import {StyleSheet, TouchableOpacity} from 'react-native';
import {Camera} from 'expo-camera';
import {View} from '../Themed';
import {RefObject} from 'react';

export type Props = {
  cameraRef: RefObject<Camera>;
  capturePhoto: () => void;
}

export function CameraView({cameraRef, capturePhoto}: Props) {
  const cameraViewStyles = StyleSheet.create({
    controls: {
      position: 'absolute',
      left: 16,
      top: 16,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%'
    },
    container: {
      flex: 1,
      maxWidth: '100%',
      marginBottom: 'auto',
      aspectRatio: 1,
    },
    capture: {
      width: 70,
      height: 70,
      bottom: 0,
      borderRadius: 50,
      backgroundColor: '#fff'
    },
    captureContainer: {
      alignSelf: 'center',
      flex: 1,
      alignItems: 'center'
    },
    captureContainerContainer: {
      position: 'absolute',
      bottom: 0,
      flexDirection: 'row',
      flex: 1,
      width: '100%',
      padding: 20,
      justifyContent: 'space-between'
    }
  })

  return (
    <Camera style={cameraViewStyles.container} ref={cameraRef} useCamera2Api={false} ratio={'1:1'}>
      <View style={cameraViewStyles.captureContainerContainer}>
        <View style={cameraViewStyles.captureContainer}>
          <TouchableOpacity onPress={capturePhoto} style={cameraViewStyles.capture}/>
        </View>
      </View>
    </Camera>
  );
}
