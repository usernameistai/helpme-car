import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  userId?: string;
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;

  superpowers: string[]; // User added text, filtered with egex
  theme: "light" | "dark"; // light/dark theme
  starsGiven: number; // stars user has achieved for regs added/edited
  carsHelped: number; // number of reg plates they'bve helped with
  welcomeMessages: string[]; // optional, computed for "world's best helpers"
  leaderboardRank: number | null; // added | null

  createdAt: Date;
  updatedAt: Date;
};

const ProfileSchema: Schema = new Schema<IProfile> (
  {
    userId: { type: String, required: false }, // changed to false
    clerkId: { type: String, required: true, unique: true },
    firstName: { type: String, required: false, default: "" },
    lastName: { type: String, required: false , default: "" },
    username: { type: String, required: false, default: "", unique: true, sparse: true, trim: true }, // adding for duplicate entries is empty string is being used
    email: { type: String, required: false, default: "", lowercase: true, trim: true },

    superpowers: { type: [ String ], default: [] },
    theme: { type: String, enum: ["light", "dark"], default: "light" },
    starsGiven: { type: Number, default: 0 },
    carsHelped: { type: Number, default: 0 },
    welcomeMessages: { type: [ String ], default: [] },
    leaderboardRank: { type: Number, default: null },
  },
  { timestamps: true },
);

export default mongoose.model<IProfile>("Profile", ProfileSchema);