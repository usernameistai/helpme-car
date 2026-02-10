import type { Request, Response } from 'express';
import Reg from '../models/Reg';
import type { IReg } from '../models/Reg';
import { getAuth } from '@clerk/express';
import Profile from '../models/Profile';
// import { LooseAuthProp } from '@clerk/clerk-sdk-node';

// interface AuthRequest extends Request, LooseAuthProp {};

// @desc Create a new registration entry
// @route POST /api/reg
export const createReg = async ( 
    req: Request<{}, {}, IReg>, 
    res: Response 
  ) => {
    console.log("Header Check:", req.headers.authorization ? "Token present" : "Token MISSING");
    // console.log("POST /api/reg called", req.body);
    // console.log("All current regs:", await Reg.find());
    try {
      const { userId } = getAuth(req);
      const { 
        regplate, brakelightcentre, brakelightleft, brakelightright,
        lightleft, lightright, reglight, indbrokenoneside, indbrokenbothsides,
        indonesideon, indbothsideson, exblacksmoke, exbluesmoke, exwhitesmoke, 
        tyreflatleft, tyreflatright, driver,
      } = req.body;
      // Validating regplate
      if (!regplate || regplate.trim() === '') {
        return res.status(400).json({ message: 'Registration plate is required' });
      }
      // Normalise regplate
      const normalisedPlate = regplate?.trim().toUpperCase().replace(/[\s-]/g, "");

      // Validate regex: only alphanumeric, 1-7 chars (UK-style)
      const regRegex = /^[A-Z0-9]{1,7}$/;
      if (!regRegex.test(normalisedPlate)) {
        return res.status(400).json({ message: "Number plate must be 1-7 alphanumeric characters" });
      }
      
      // Check for existing, non-deleted reg
      const existingReg = await Reg.findOne({ regplate: normalisedPlate });
      if (existingReg) {
        return res.status(409).json({ 
          message: "Registration already exists",
          regId: existingReg._id,
          regplate: existingReg.regplate,
        });
      };
      // Added logic about the reporters key
      const newReg = new Reg({ 
        regplate: normalisedPlate, brakelightcentre, brakelightleft, brakelightright,
        lightleft, lightright, reglight, indbrokenoneside, indbrokenbothsides,
        indonesideon, indbothsideson, exblacksmoke, exbluesmoke, exwhitesmoke, 
        tyreflatleft, tyreflatright, driver, 
        reporters: userId ? [userId] : [], // Added THIS
      });

      const savedReg = await newReg.save();

      // AWARD SYSTEM: Update user profile if authenticated MEW
      if (userId) {
        try {
          // DEBUGGING LINES START
          const profileToUpdate = await Profile.findOne({ clerkId: userId });
          console.log("🔍 Found profile to update?", !!profileToUpdate);
          console.log("👤 Current Clerk ID from Auth:", userId);
          // DEBUGGING LINES END

          const updatedProfile = await Profile.findOneAndUpdate(
            { clerkId: userId },
            { $inc: { starsGiven: 1, carsHelped: 1 } },
            { new: true },
          );
          if (updatedProfile) {
            console.log(`⭐ Success: ${updatedProfile.username} now has ${updatedProfile.starsGiven} stars.`);
          }
        } catch (err: any) {
          console.error("Profile update failed during reg creation", err);
           // We don't return res.status here because the Reg was already saved successfully
        }
      }

      res.status(201).json(savedReg);
    } catch (err) {
      console.error('Failed to create registration', err);
      res.status(400).json({ message: 'Failed to create registration' });
    }
}; // Works

// @desc Get a registration by reg plate
// @route GET /api/reg/plate/:plate
export const getRegByPlate = async ( 
    req: Request<{ regplate: string }>, 
    res: Response,
  ) => {
    try {
      // Pull regplate from route params and normalise
      const { regplate } = req.params;

      if (!regplate) {
        return res.status(400).json({ error: 'Registration plate is required' });
      }
      // Find the registration
      const reg = await Reg.findOne({ 
        regplate: regplate.toUpperCase(),
      });

      if (!reg) {
        return res.status(404).json({ message: 'Registration plate not found'});
      }
      res.json(reg);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error'});
    }
}; // Works

// @desc Get All registrations
// @route GET /api/reg
export const getAllRegs = async ( _req: Request, res: Response ) => {
  try {
    const regs = await Reg.find({ deleted: {$ne: true } }).sort({ createdAt: -1 });
    return res.json(regs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}; // Works

// @desc Get registration by Mongo ID
//@route GET /api/reg/:id
export const getRegById = async ( 
    req: Request<{ id: string }>, 
    res: Response 
  ) => {
    const { id } = req.params;
    // Validate if id is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid ID format' })
    }
    try {
      const reg = await Reg.findById({
        _id: id,
        deleted: false,
      });

      if (!reg) {
        return res.status(404).json({ message: 'Registration id not found' });
      };
      return res.status(200).json(reg);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
}; // Works

// Update a registration
export const updateReg = async ( // changed id to regplate
    req: Request<{ regplate: string }, {}, Partial<IReg>>, 
    res: Response 
  ) => {
    // Pull id from route params
    const { regplate } = req.params; // was inside the trycatch block
    const { userId } = getAuth(req);
    
    if ( !regplate || regplate.trim() === '' ) {
      return res.status(400).json({ msg: 'Registration plate is required' });
    }
    // Destucture fiels explicitly from req.body
    const { // removed regplate from destructured req.body as already decalred
      brakelightcentre, brakelightleft, brakelightright,
      lightleft, lightright, reglight, indbrokenoneside, indbrokenbothsides,
      indonesideon, indbothsideson, exblacksmoke, exbluesmoke, exwhitesmoke, 
      tyreflatleft, tyreflatright, driver,
    } = req.body;
    // Reject empty reg plate explicitly
    if ( regplate !== undefined && regplate.trim() === '' ) {
      return res.status(400).json({ message: 'Registration plate cannot be empty' });
    }
    // Build update object safely
    const updatedRegFields: Partial<IReg> = {
      ...( regplate && { regplate: regplate.trim().toUpperCase() }),
      ...( brakelightcentre !== undefined && { brakelightcentre } ),
      ...( brakelightleft !== undefined && { brakelightleft } ),
      ...( brakelightright !== undefined && { brakelightright } ),
      ...( lightleft !== undefined && { lightleft } ),
      ...( lightright !== undefined && { lightright } ),
      ...( reglight !== undefined && { reglight } ),
      ...( indbrokenoneside !== undefined && { indbrokenoneside } ),
      ...( indbrokenbothsides !== undefined && { indbrokenbothsides } ),
      ...( indonesideon !== undefined && { indonesideon } ),
      ...( indbothsideson !== undefined && { indbothsideson } ),
      ...( exblacksmoke !== undefined && { exblacksmoke } ),
      ...( exbluesmoke !== undefined && { exbluesmoke } ),
      ...( exwhitesmoke !== undefined && { exwhitesmoke } ),
      ...( tyreflatleft !== undefined && { tyreflatleft } ),
      ...( tyreflatright !== undefined && { tyreflatright } ),
      ...( driver !== undefined && { driver } ),
    }
    // Reject empty updte payload
    if ( Object.keys(updatedRegFields).length === 0 ) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }
    
    try {
      // Find and update
      const updatedReg = await Reg.findOneAndUpdate(
        { regplate: regplate.trim().toUpperCase() },
        { $set: updatedRegFields }, 
        { new: true, runValidators: true },
      );

      if (!updatedReg) {
        return res.status(404).json({ message: `No registration found with plate ${regplate}` });
      }

      // REWARD LOGIC: 2-Star Max Check
      if (userId) {
        // Check if this specific user has ever helped this car before
        const hasHelpedBefore = updatedReg.reporters.includes(userId);

        if (!hasHelpedBefore) {
          // Add user to the car's reporters list so they can't get a star again
          await Reg.updateOne(
            { _id: updatedReg._id },
            { $push: { reporters: userId } },
          );

          // Award the star to the user's profile
          await Profile.findOneAndUpdate(
            { clerkId: userId },
            { $inc: { starsGiven: 1 } }
          );
          console.log(`⭐ New contributor star awarded to: ${userId}`);
        } else {
          console.log(`ℹ️ User ${userId} already earned a star for this plate. No star awarded.`);
        }
      }
      
      return res.status(200).json(updatedReg);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to update regstration' });
    }
}; // Works

// Delete a registration
export const deleteReg = async ( 
  req: Request<{ regplate: string }>, 
  res: Response ) => {
    try {
      const { regplate } = req.params;

      if ( !regplate || regplate.trim() === '' ) {
        return res.status(400).json({ msg: 'Registration plate is required' });
      }

      const normalisedPlate = regplate.trim().toUpperCase();

      const deletedReg = await Reg.findOneAndDelete(
        { regplate: normalisedPlate },
        // { new: true, runValidators: true },
      );

      if (!deletedReg) {
        return res.status(404).json({ message: `No registration found with plate ${regplate}` });
      }

      return res.status(200).json({ message: `Registration ${deletedReg.regplate} deleted successfully ⭐` });
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error, failed to delete registration', error: err });
    }
}; // Works

// Ping controller (sanity check)
export const pingRegs = ( _req: Request, res: Response ) => {
  res.json({ ok: true, message: 'Reg routes are alive!! 👊' });
}; // Works

export const getMyActivity = async (req: Request, res: Response) => {
  try {
    // 1. Get your Clerk ID from the middleware (ensure clerkMiddleware is used)
    const userId = (req as any)?.auth.userId; 

    // 2. Query: Find regs where 'reporters' array contains your userId
    // Also ensuring it's not soft-deleted
    const myCars = await Reg.find({ 
      reporters: userId, 
      deleted: { $ne: true } 
    }).sort({ updatedAt: -1 });

    return res.json(myCars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching your history" });
  }
};