import Realm from 'realm';
import {NibModel} from './NibModel';
import {InkModel} from './InkModel';
import {PenModel} from './PenModel';
import {FileModel} from './FileModel';

export enum UpdateTypes {
  ADD = 'add',
  REMOVE = 'remove',
  UPDATE = 'update',
}

export class PenUpdateModel extends Realm.Object {

  public _id!: Realm.BSON.UUID;

  public pen!: PenModel;

  public nib?: NibModel;

  public ink?: InkModel;

  public updateType!: UpdateTypes;

  public date!: Date;

  public colour?: string;

  public name?: string;

  public manufacturer?: string;

  public image?: FileModel;

  static generate(update: Partial<PenUpdateModel>): PenUpdateModel {
    return {
      _id: update._id || new Realm.BSON.UUID(),
      nib: update?.nib,
      ink: update?.ink,
      pen: update.pen,
      updateType: update.updateType,
      date: update.date,
      colour: update?.colour,
      manufacturer: update?.manufacturer,
      name: update?.name,
      image: update?.image,
    } as PenUpdateModel;
  }

  public static schema: Realm.ObjectSchema = {
    name: 'PenUpdate',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      nib: 'Nib?',
      ink: 'Ink?',
      pen: 'Pen',
      updateType: 'string',
      date: 'date',
      colour: 'string?',
      manufacturer: 'string?',
      name: 'string?',
      image: 'File?',
    }
  };
}
