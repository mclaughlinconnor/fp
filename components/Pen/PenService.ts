import {Component} from "react";
import {Pen} from "./Pen";
import NibService from '../Nib/NibService';

const PENS: (Omit<Pen, 'nib'> & {_nibId: number})[] = [
  {
    color: 'white',
    icon: 'fountain-pen-tip',
    id: 1,
    _nibId: 1,
    name: 'LAMY Safari',
  }, {
    color: 'black',
    icon: 'fountain-pen-tip',
    id: 2,
    _nibId: 5,
    name: 'LAMY Safari',
  }, {
    color: 'black',
    icon: 'fountain-pen-tip',
    id: 3,
    _nibId: 0,
    name: 'Jinhao 993 (Shark)',
  }, {
    color: 'red',
    icon: 'fountain-pen-tip',
    id: 4,
    _nibId: 0,
    name: 'Jinhao 993 (Shark)',
  }, {
    color: 'blue',
    icon: 'fountain-pen-tip',
    id: 5,
    _nibId: 0,
    name: 'Jinhao 993 (Shark)',
  }, {
    color: 'white',
    icon: 'fountain-pen-tip',
    id: 6,
    _nibId: 0,
    name: 'Jinhao 993 (Shark)',
  }, {
    color: 'black',
    icon: 'fountain-pen-tip',
    id: 7,
    _nibId: 6,
    name: 'Jinhao x750',
  }, {
    color: 'gold/silver',
    icon: 'fountain-pen-tip',
    id: 8,
    _nibId: 3,
    name: 'Parker Sonnet',
  }, {
    color: 'black',
    icon: 'fountain-pen-tip',
    id: 9,
    _nibId: 4,
    name: 'Cross Calais',
  }, {
    color: 'white/blue',
    icon: 'fountain-pen-tip',
    id: 10,
    _nibId: 7,
    name: 'Kaweko Perkeo',
  }, {
    color: 'transparent',
    icon: 'fountain-pen-tip',
    id: 11,
    _nibId: 8,
    name: 'Platinum Preppy',
  }, {
    color: 'transparent',
    icon: 'fountain-pen-tip',
    id: 12,
    _nibId: 2,
    name: 'TWISBI Go',
  },
]

export default class PenService extends Component {
  nibSvc: NibService;

  pens: Pen[];

  constructor(props: {}) {
    super(props);
    this.nibSvc = new NibService({});
    this.pens = PENS.map(pen => this.populate(pen));
  }

  allPens(): Pen[] {
    return this.pens;
  }

  populate(pen: Omit<Pen, 'nib'> & {_nibId: number}): Pen {
    return {
      ...pen,
      nib: this.nibSvc.findOne(pen._nibId),
    }
  }
}
