import express from "express";
import {
  getDoctors,
  getDoctor,
  handleRequest,
  createReport,
  handleBooking,
  getDoctorsByDistance,
  checkRequest,
  getRequestPatients,
  getAppointmentsreq,
  getDoctorReviews,
  getdocAppointments,
} from "../controllers/doctor.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();
router.get("/getReviews/:doctorId", verifyToken, getDoctorReviews);
router.get("/getdocAppointments/:doctorId", verifyToken, getdocAppointments);
router.get("/getAppointmentsreq/:doctorId", verifyToken, getAppointmentsreq);
router.get("/getallrequests/:doctorId", verifyToken, getRequestPatients);
router.get("/fetchAll", verifyToken, getDoctors);
router.get("/getdoctor/:doctorId", verifyToken, getDoctor);
router.get("/fetchByDistance", verifyToken, getDoctorsByDistance);
router.get("/getReviews/:doctorId", verifyToken, getDoctorReviews);
router.patch("/request/:patientId", verifyToken, handleRequest);
router.get("/checkRequest/:doctorId/:patientId", verifyToken, checkRequest);
router.post("/createReport", verifyToken, createReport);
router.patch("/booking", verifyToken, handleBooking);

export default router;
