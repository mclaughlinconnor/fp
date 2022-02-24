import {StyleSheet} from 'react-native';
import {View} from '../Themed';
import {PhotoPreview, Props as PreviewProps} from './PhotoPreview';
import {CameraView, Props as ViewProps} from './CameraView';

type Props = {
  previewVisible: boolean;
  capturedImage: any;
  previewProps: PreviewProps;
  viewProps: ViewProps;
}

export function CameraContainer({previewVisible, capturedImage, previewProps, viewProps}: Props) {
  return (
    <View style={cameraStyles.cameraContainer}>
      {previewVisible && capturedImage ? (<PhotoPreview {...previewProps} />) : (<CameraView {...viewProps} />)}
    </View>
  );
}

const cameraStyles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    width: '100%'
  }
})
