export interface IReg {
  _id?: string;
  regplate: string;
  brakelightcentre?: boolean;
  brakelightleft?: boolean;
  brakelightright?: boolean;
  lightleft?: boolean;
  lightright?: boolean;
  reglight?: boolean;
  indbrokenoneside?: boolean;
  indbrokenbothsides?: boolean;
  indonesideon?: boolean;
  indbothsideson?: boolean;
  exblacksmoke?: boolean;
  exbluesmoke?: boolean;
  exwhitesmoke?: boolean;
  tyreflatleft?: boolean;
  tyreflatright?: boolean;
  driver?: {
    superherodriver?: boolean;
    gooddriver?: boolean;
    roomforimprov?: boolean;
  },
  createdAt: Date;
};