import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {NotificationService} from '../../components/Notifications/NotificationService';
import {NotificationContentInput} from 'expo-notifications';
import {storage} from './Firebase';
import {ReactNativeFirebase} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

type UploadFailureHandler = (error: ReactNativeFirebase.NativeFirebaseError) => void;
type UploadSuccessHandler = (storageRef: FirebaseStorageTypes.Reference) => Promise<string>;
type UploadProgressHandler = (snapshot: FirebaseStorageTypes.TaskSnapshot) => void;
type UploadStartHandler = () => void;

type DeleteStartHandler = () => void;
type DeleteFinishHandler = () => void;

async function defaultFailureHandler(error: ReactNativeFirebase.NativeFirebaseError): Promise<void> {
  const notifySvc = new NotificationService({})
  await notifySvc.notificationInitialise()

  const content: NotificationContentInput = {
    subtitle: 'File upload error',
    sound: true,
  }

  const messages: {[key: string]: string} = {
    'storage/unauthorized': 'You do not have authorisation to access this object',
    'storage/canceled': 'The upload operation was cancelled',
    'storage/unknown': `An unknown error occurred: ${error.code}, ${JSON.stringify(error.code)}`
  }

  content.title = messages[error.code];

  if (error.code === 'storage/unknown' || !messages[error.code]) {
    content.title = messages['storage/unknown'];
    console.error(error.message);
  }

  await notifySvc.sendNotification(content)
}

async function defaultSuccessHandler(storageRef: FirebaseStorageTypes.Reference): Promise<string> {
  const notifySvc = new NotificationService({})
  await notifySvc.notificationInitialise()

  const content: NotificationContentInput = {
    title: 'File upload success',
    sound: true,
  }

  await notifySvc.sendNotification(content)

  return await storageRef.getDownloadURL()
}

function defaultProgressHandler(snapshot: FirebaseStorageTypes.TaskSnapshot): void {
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
}

async function uploadStarted() {
  const notifySvc = new NotificationService({})
  await notifySvc.notificationInitialise()

  const content: NotificationContentInput = {
    title: 'File upload started',
    sound: true,
  }

  await notifySvc.sendNotification(content)
}

async function deleteStarted() {
  const notifySvc = new NotificationService({})
  await notifySvc.notificationInitialise()

  const content: NotificationContentInput = {
    title: 'File delete started',
    sound: true,
  }

  await notifySvc.sendNotification(content)
}

async function deleteFinished() {
  const notifySvc = new NotificationService({})
  await notifySvc.notificationInitialise()

  const content: NotificationContentInput = {
    title: 'File delete finished',
    sound: true,
  }

  await notifySvc.sendNotification(content)
}

export async function upload(
  filetype: 'images',
  directory: string,
  filename: string,
  file: string,
  onUploadStart: UploadStartHandler = uploadStarted,
  onSuccess: UploadSuccessHandler = defaultSuccessHandler,
  onFailure: UploadFailureHandler = defaultFailureHandler,
  onProgress: UploadProgressHandler = defaultProgressHandler,
): Promise<string> {
  let userId = auth().currentUser?.uid;
  if (!userId) {
    userId = 'anon'
  }

  const storageRef = storage.ref(`${userId}/${filetype}/${directory}/${filename}`);

  const uploadTask = storageRef.putFile(file)

  await onUploadStart();

  return new Promise((resolve, reject) => {
    uploadTask.on(
    'state_changed',
     () => {
      if (uploadTask.snapshot) {
        return onProgress(uploadTask.snapshot)
      }
     },
     (error) => {
       onFailure(error)
       reject(error);
     },
     () => {
       return onSuccess(storageRef)
         .then(downloadUrl => {
           resolve(downloadUrl);
         });
       },
     );
  });
}

export async function remove(
  filetype: 'images',
  directory: string,
  filename: string,
  onDeleteStart: DeleteStartHandler = deleteStarted,
  onDeleteFinish: DeleteFinishHandler = deleteFinished,
): Promise<void> {
  let userId = auth().currentUser?.uid;
  if (!userId) {
    userId = 'anon'
  }

  const storageRef = storage.ref(`${userId}/${filetype}/${directory}/${filename}`);

  await onDeleteStart();
  await storageRef.delete()
  await onDeleteFinish();
}
