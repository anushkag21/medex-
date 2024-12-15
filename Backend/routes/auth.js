import express from "express";
import { loginPatient, loginDoctor } from "../controllers/auth.js";
const router = express.Router();

router.post("/patient/login", loginPatient);
router.post("/doctor/login", loginDoctor);

export default router;
