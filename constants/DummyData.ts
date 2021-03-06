import {NibModel, NibSize} from '../db/models/NibModel';
import {PenModel} from '../db/models/PenModel';
import {FileModel} from '../db/models/FileModel';
import {InkModel} from '../db/models/InkModel';

const file = {
  _id: new Realm.BSON.UUID('15c95d13-27cb-420f-88a7-464f23106058'),
  createdAt: new Date(),
  url: 'https://firebasestorage.googleapis.com/v0/b/cm-fp-1b689.appspot.com/o/BkQeVUybGUWzCMXjNYhwjNMadQE2%2Fimages%2Fnibs%2F2a7160dc-1269-4c9c-8a0b-c0c19898c066?alt=media&token=f964348b-5c49-4c26-bce7-3db0181db199'
} as FileModel;

const dOchre = {
  _id: new Realm.BSON.UUID('6d45c8b9-a7be-4285-a8f2-f4f657a1600e'),
  name: 'Ochre',
  image: file,
  volume: 30,
  manufacturer: 'Diamine',
  colour: 'Brown',
} as InkModel;
const dVCBlue = {
  _id: new Realm.BSON.UUID('c198126a-e6e4-4158-8685-ba3153158130'),
  name: 'Steel Blue',
  colour: 'Blue',
  image: file,
  volume: 30,
  manufacturer: 'Diamine',
} as InkModel;
const dBlood = {
  _id: new Realm.BSON.UUID('2ec30e1c-9a5a-4a46-a688-37d9bc065dae'),
  name: 'Writer\'s Blood',
  colour: 'Red',
  image: file,
  volume: 30,
  manufacturer: 'Diamine',
} as InkModel;
const dPansy = {
  _id: new Realm.BSON.UUID('c35d8f9f-5325-4460-893f-535fe4cee79e'),
  name: 'dPansy',
  colour: 'Purple',
  image: file,
  volume: 30,
  manufacturer: 'Diamine',
} as InkModel;
const dEarl = {
  _id: new Realm.BSON.UUID('2a6e30d6-75c3-4dbe-9ec5-1a817531c830'),
  name: 'Earl Grey',
  colour: 'Grey',
  image: file,
  volume: 30,
  manufacturer: 'Diamine',
} as InkModel;
const dMarine = {
  _id: new Realm.BSON.UUID('8a02b89a-c1f7-4b5c-a304-bfd62287445b'),
  name: 'Marine',
  colour: 'Blue',
  image: file,
  volume: 30,
  manufacturer: 'Diamine',
} as InkModel;
const dCerise = {
  _id: new Realm.BSON.UUID('92ff1310-365d-439b-bac2-74951397d3ee'),
  name: 'Cerise',
  colour: 'Pink',
  image: file,
  volume: 30,
  manufacturer: 'Diamine',
} as InkModel;
const dSunset = {
  _id: new Realm.BSON.UUID('cbaede20-97b7-4599-aa8e-cd46945366f3'),
  name: 'Sunset',
  colour: 'Orange',
  image: file,
  volume: 30,
  manufacturer: 'Diamine',
} as InkModel;

const jEF = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('23cedeac-dede-4ac7-82c9-e9dc7f994498'),
  size: 'extra fine' as unknown as NibSize,
  manufacturer: 'Jinhao',
  image: file
} as NibModel;
const lM = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('014b5c46-44d8-402f-bbb9-30a80c763436'),
  size: 'medium' as unknown as NibSize,
  manufacturer: 'Lamy',
  image: file
} as NibModel;
const tB = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('cae95d64-5743-44ea-b6f3-1c487af4a1cf'),
  size: 'broad' as unknown as NibSize,
  manufacturer: 'TWISBI',
  image: file
} as NibModel;
const pM = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('c87eeabd-82f3-4eac-80b3-be482d9bc6b8'),
  size: 'medium' as unknown as NibSize,
  manufacturer: 'Parker',
  image: file
} as NibModel;
const cM = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('790e8830-ef79-459d-be9d-7d6a3732c36a'),
  size: 'medium' as unknown as NibSize,
  manufacturer: 'Cross',
  image: file
} as NibModel;
const lS = {
  colour: 'Black',
  _id: new Realm.BSON.UUID('201ffea3-1228-46fd-a263-91788ec16eec'),
  size: '1.1mm stub' as unknown as NibSize,
  manufacturer: 'Lamy',
  image: file
} as NibModel;
const jM = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('50a3b23c-b82c-4eb1-b463-fb0c77067aae'),
  size: 'medium' as unknown as NibSize,
  manufacturer: 'Jinhao',
  image: file
} as NibModel;
const kM = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('7dbdcc67-3e3a-4596-9869-f330f902047d'),
  size: 'medium' as unknown as NibSize,
  manufacturer: 'Kaweko',
  image: file
} as NibModel;
const pF = {
  colour: 'Silver',
  _id: new Realm.BSON.UUID('c4b4be7c-cccb-4405-bdd6-60608e098f8a'),
  size: 'fine' as unknown as NibSize,
  manufacturer: 'Platinum',
  image: file
} as NibModel;

export const Pens: Partial<PenModel>[] = [
  {
    colour: 'white',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('4c2032bd-a3c7-4311-a4c5-e919596a8533'),
    name: 'Safari',
    manufacturer: 'LAMY',
    nib: lM,
    image: file,
    ink: dSunset,
  }, {
    colour: 'black',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('186b7588-f128-4af4-87a7-f7cd5a856a42'),
    name: 'Safari',
    manufacturer: 'LAMY',
    nib: lS,
    image: file,
    ink: dCerise,
  }, {
    colour: 'black',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('18249270-3e35-4669-861a-4d3e694cde20'),
    name: '993 (Shark)',
    manufacturer: 'Jinhao',
    nib: jEF,
    image: file,
    ink: dPansy,
  }, {
    colour: 'red',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('ff209d8f-818a-45fc-a049-e4463da2275c'),
    name: '993 (Shark)',
    manufacturer: 'Jinhao',
    nib: jEF,
    image: file,
    ink: dBlood,
  }, {
    colour: 'blue',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('2fea7cb0-e047-41d9-89fb-59aa8948bdcb'),
    name: '993 (Shark)',
    manufacturer: 'Jinhao',
    nib: jEF,
    image: file,
    ink: dOchre,
  }, {
    colour: 'white',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('e4abbd1f-960b-483e-8314-e49dc7e82b9c'),
    name: '993 (Shark)',
    manufacturer: 'Jinhao',
    nib: jEF,
    image: file,
    ink: dMarine,
  }, {
    colour: 'black',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('19c7f1d1-5276-4521-aa8a-7955bed84e25'),
    name: 'x750',
    manufacturer: 'Jinhao',
    nib: jM,
    image: file,
    ink: dVCBlue,
  }, {
    colour: 'gold/silver',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('0c3919bb-8a86-420c-8b12-7f2f9900f976'),
    name: 'Sonnet',
    manufacturer: 'Parker',
    nib: pM,
    image: file,
    ink: dEarl,
  }, {
    colour: 'black',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('d3a89e8a-c6e5-473c-b641-d2ae21da7366'),
    name: 'Calais',
    manufacturer: 'Cross',
    nib: cM,
    image: file,
    ink: dPansy,
  }, {
    colour: 'white/blue',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('b8f90d94-7980-49eb-a09b-b3987e258de7'),
    name: 'Perkeo',
    manufacturer: 'Kaweko',
    nib: kM,
    image: file,
    ink: dCerise,
  }, {
    colour: 'transparent',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('36b6c516-685c-48a3-b4d3-38209a192465'),
    name: 'Preppy',
    manufacturer: 'Platinum',
    nib: pF,
    image: file,
    ink: dBlood,
  }, {
    colour: 'transparent',
    icon: 'fountain-pen',
    _id: new Realm.BSON.UUID('3070dc1d-79ae-4ede-9aca-4800640ca4ad'),
    name: 'Go',
    manufacturer: 'TWISBI',
    nib: tB,
    image: file,
    ink: dMarine,
  },
]
