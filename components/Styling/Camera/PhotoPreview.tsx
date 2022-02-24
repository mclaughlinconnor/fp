import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../Themed';
import {CameraCapturedPicture} from 'expo-camera';

const cameraPreviewStyles = StyleSheet.create({
  background: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  previewImage: {
    flex: 1
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-end'
  },
  retakeButton: {
    width: 130,
    height: 40,
    alignItems: 'center',
    borderRadius: 4
  },
  retakeText: {
    color: '#fff',
    fontSize: 20
  },
  saveButton: {
    width: 130,
    height: 40,
    alignItems: 'center',
    borderRadius: 4
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 20
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

export type Props = {
  photo?: CameraCapturedPicture;
  retakePhoto: () => void;
  savePhoto: () => void;
}

export function PhotoPreview({photo, retakePhoto, savePhoto}: Props) {
  if (!photo) {
    return <Text>Photo loading...</Text>;
  }

  return (
    <View style={cameraPreviewStyles.background}>
      <ImageBackground source={{uri: photo && photo.uri}} style={cameraPreviewStyles.previewImage}>
        <View style={cameraPreviewStyles.column}>
          <View style={cameraPreviewStyles.buttonRow}>
            <TouchableOpacity onPress={retakePhoto} style={cameraPreviewStyles.retakeButton}>
              <Text style={cameraPreviewStyles.retakeText}>Re-Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={savePhoto} style={cameraPreviewStyles.saveButton}>
              <Text style={cameraPreviewStyles.saveButtonText}>Save Photo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
