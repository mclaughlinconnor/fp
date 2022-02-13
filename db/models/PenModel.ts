import Realm from 'realm';
import {NibModel} from './NibModel';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ComponentProps} from 'react';

export class PenModel extends Realm.Object {

  public _id!: Realm.BSON.UUID;

  public colour!: string;

  public icon!: ComponentProps<typeof MaterialCommunityIcons>['name'];

  public name!: string;

  public nibs: NibModel[];

  static generate(pen: Partial<PenModel>): PenModel {
    return {
      _id: pen._id || new Realm.BSON.UUID(),
      colour: pen.colour,
      icon: pen.icon,
      name: pen.name,
      nibs: pen.nibs?.map(nib => NibModel.generate(nib)),
    } as PenModel;
  }

  public static schema: Realm.ObjectSchema = {
    name: 'PenModel',
    primaryKey: '_id',
    properties: {
      _id: 'uuid',
      name: 'string',
      colour: 'string',
      icon: 'string',
      nibs: {
        type: 'linkingObjects',
        objectType: 'NibModel',
        property: 'pens'
      }
    }
  };
}
