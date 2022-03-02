import Realm from 'realm';
import UUID = Realm.BSON.UUID;
import {upload} from '../Firebase/StorageManager';

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

    const downloadURL = await upload(fileType, directory,id.toHexString(), uri)

    return {
      _id: id,
      createdAt: new Date(),
      url: downloadURL,
    } as FileModel;
  }

  public static schema: Realm.ObjectSchema = {
    name: 'FileModel',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      createdAt: 'date',
      url: 'string',
    }
  };
}
