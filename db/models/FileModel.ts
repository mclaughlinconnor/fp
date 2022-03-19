import Realm from 'realm';
import UUID = Realm.BSON.UUID;
import {remove, upload} from '../Firebase/StorageManager';
import {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {ToastAndroid} from 'react-native';

async function toastSuccessHandler(storageRef: FirebaseStorageTypes.Reference): Promise<string> {
  ToastAndroid.show('File upload success', ToastAndroid.SHORT);

  return await storageRef.getDownloadURL()
}

async function uploadStarted() {
  ToastAndroid.show('File upload started...', ToastAndroid.SHORT);
}

export class FileModel extends Realm.Object {

  public _id!: UUID;

  public createdAt!: Date;

  public url!: string;

  static generate(file: Partial<FileModel>): FileModel {
    const id =  file._id || new Realm.BSON.UUID();

    return {
      _id: id,
      createdAt: new Date(),
      url: file.url,
    } as FileModel;
  }

  static async uploadGenerate(file: Partial<FileModel>, uri: string, fileType: 'images', directory: string): Promise<FileModel> {
    const id =  file._id || new Realm.BSON.UUID();

    const downloadURL = await upload(
      fileType,
      directory,
      id.toHexString(),
      uri,
      uploadStarted,
      toastSuccessHandler,
    )

    return {
      _id: id,
      createdAt: new Date(),
      url: downloadURL,
    } as FileModel;
  }

  static async delete(file: Partial<FileModel>, fileType: 'images', directory: string): Promise<void> {
    const id =  file._id || new Realm.BSON.UUID();

    await remove(
      fileType,
      directory,
      id.toHexString(),
    )
  }

  public static schema: Realm.ObjectSchema = {
    name: 'File',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      createdAt: 'date',
      url: 'string',
    }
  };
}
