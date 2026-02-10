import { Router } from "express";
import { 
  createReg, getRegByPlate, getAllRegs, getRegById, 
  updateReg, deleteReg, pingRegs,
  getMyActivity,
} from "../controllers/reg.controller";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = Router();

// test
// @route /api/reg/ping
router.get('/ping', pingRegs);

// @route POST /api/reg
// @desc Add new registration
router.post("/", createReg);

// @route GET /api/reg/reg/:plate
// @desc Get regstration by reg plate
router.get('/reg/:regplate', getRegByPlate);

router.get('/my-activity', ClerkExpressRequireAuth() as any, getMyActivity);

// @route GET /api/reg/:id
// @desc Get registration by ID
router.get("/:id", getRegById);

// @route GET /api/reg
// @desc Get all registrations
router.get("/", getAllRegs);

// @route PUT /api/reg/reg/:regplate
// @desc Update registration by id
router.put('/reg/:regplate', updateReg);

// @route DELETE /api/reg/;id
// @desc Update registration by id
// router.delete('/reg/:regplate', deleteReg); // changed this
router.delete('/:regplate', deleteReg);

export default router;