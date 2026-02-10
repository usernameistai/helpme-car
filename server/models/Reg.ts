import mongoose, { Schema, Document } from "mongoose";

export interface IReg extends Document {
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
  reporters: string[];
  createdAt: Date;
  updatedAt: Date;
};

const RegSchema: Schema = new Schema<IReg> (
{
    regplate: { 
      type: String, 
      required: true,
      trim: true,
      uppercase: true,
    },
    brakelightcentre: { type: Boolean, default: false },
    brakelightleft: { type: Boolean, default: false },
    brakelightright: { type: Boolean, default: false },
    lightleft: { type: Boolean, default: false },
    lightright: { type: Boolean, default: false },
    reglight: { type: Boolean, default: false },
    indbrokenoneside: { type: Boolean, default: false },
    indbrokenbothsides: { type: Boolean, default: false },
    indonesideon: { type: Boolean, default: false },
    indbothsideson: { type: Boolean, default: false },
    exblacksmoke: { type: Boolean, default: false },
    exbluesmoke: { type: Boolean, default: false },
    exwhitesmoke: { type: Boolean, default: false },
    tyreflatleft: { type: Boolean, default: false },
    tyreflatright: { type: Boolean, default: false },
    driver: {
      superherodriver: { type: Boolean, default: false },
      gooddriver: { type: Boolean, default: false },
      roomforimprov: { type: Boolean, default: false },
    },
    // NEW: The "Memory" for stars
    reporters: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model<IReg>("Reg", RegSchema);