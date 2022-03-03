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

  public nibs: NibModel[];

  public image: FileModel;

  public inks: InkModel[];

  static generate(pen: Partial<PenModel>): PenModel {
    return {
      _id: pen._id || new Realm.BSON.UUID(),
      colour: pen.colour,
      icon: pen.icon,
      manufacturer: pen.manufacturer,
      name: pen.name,
      nibs: pen.nibs?.map(nib => NibModel.generate(nib)),
      image: pen.image,
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
      manufacturer: 'string',
      nibs: {
        type: 'linkingObjects',
        objectType: 'NibModel',
        property: 'pens'
      },
      ink: {
        type: 'linkingObjects',
        objectType: 'InkModel',
        property: 'pens'
      },
      image: 'FileModel?'
    }
  };

  public get currentNib() {
    // A pen can only have one nib at a time
    return this.nibs[0];
  }

  public get currentInk() {
    // A pen can only have one ink at a time
    return this.inks[0];
  }
}
