import Realm from 'realm';
import {NibModel} from './NibModel';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ComponentProps} from 'react';
import {FileModel} from './FileModel';
import {InkModel} from './InkModel';

export class PenModel extends Realm.Object {

  public _id!: Realm.BSON.UUID;

  public colour!: string;

  public icon!: ComponentProps<typeof MaterialCommunityIcons>['name'];

  public name!: string;

  public manufacturer!: string;

  public nib!: NibModel;

  public image!: FileModel;

  public ink?: InkModel;

  static generate(pen: Partial<PenModel>): PenModel {
    return {
      _id: pen._id || new Realm.BSON.UUID(),
      colour: pen.colour,
      icon: pen.icon,
      manufacturer: pen.manufacturer,
      name: pen.name,
      nib: pen.nib,
      ink: pen.ink,
      image: pen.image,
    } as PenModel;
  }

  public static schema: Realm.ObjectSchema = {
    name: 'Pen',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
      colour: 'string',
      icon: 'string',
      manufacturer: 'string',
      nib: 'Nib',
      ink: 'Ink',
      image: 'File?',
      updates: {
        type: 'linkingObjects',
        objectType: 'PenUpdate',
        property: 'pen'
      },
    }
  };
}
