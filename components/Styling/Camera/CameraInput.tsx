import React, {useRef, useState} from 'react'
import {StyleSheet} from 'react-native'
import {Camera, CameraCapturedPicture} from 'expo-camera'
import {CameraContainer} from './CameraContainer';
import {CameraButton} from './CameraButton';
import {View} from '../Themed';

type Props = {
  onPhotoSave: (photo: CameraCapturedPicture) => void;
}

export default function CameraInput({onPhotoSave}: Props) {
  const cameraRef = useRef<Camera>(null);
  const [startCamera, setStartCamera] = useState<boolean>(false)
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [capturedImage, setCapturedImage] = useState<CameraCapturedPicture>()

  const capturePhoto = async () => {
    if (!cameraRef.current) {
      return;
    }

    const photo: CameraCapturedPicture = await cameraRef.current.takePictureAsync({skipProcessing: true})
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const savePhoto = () => {
    if (!capturedImage) {
      return
    }

    onPhotoSave(capturedImage!)
    setPreviewVisible(false)
    setStartCamera(false);
  }

  const retakePhoto = () => {
    setCapturedImage(undefined)
    setPreviewVisible(false)
  }

  const previewProps = {
    photo: capturedImage,
    retakePhoto,
    savePhoto
  }
  const viewProps = {
    cameraRef,
    capturePhoto,
  }

  const cameraButton = <CameraButton setCameraStarted={setStartCamera}/>
  const cameraContainer = <CameraContainer
    previewVisible={previewVisible}
    capturedImage={capturedImage}
    previewProps={previewProps}
    viewProps={viewProps}
  />

  return (
    <View style={styles.container}>
      <View style={(startCamera) ? styles.camera : undefined}>
        {startCamera ? (cameraContainer) : (cameraButton)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginHorizontal: 16,
  },
  camera: {
    aspectRatio: 1,
    minWidth: '100%',
  }
})
