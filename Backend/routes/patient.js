import {
  requestAppointment,
  bookAppointment,
  makeReview,
  getMyReports,
  getMyDoctors,
  getReport,
  handleNotifications,
  getAppointments,
  sendNotifications,
  editDataP,
  getPatient,
  getReportInfo,
  // checkFriend,
  // ViewReport,
} from "../controllers/patient.js";
import { verifyToken } from "../middleware/auth.js";
import express from "express";

const router = express.Router();
// router.get("/viewReport/:patientId/:doctorId",verifyToken,ViewReport);
router.get("/sendnotifications/:patientId", verifyToken, sendNotifications);
router.patch("/request/:doctorId", verifyToken, requestAppointment);
router.patch("/booking/:doctorId", verifyToken, bookAppointment);
router.patch("/review/:doctorId", verifyToken, makeReview);
router.post("/handleNotification", verifyToken, handleNotifications);
router.get("/getMyReports/:patientId", verifyToken, getMyReports);
router.get("/getMyDoctors/:patientId", verifyToken, getMyDoctors);
router.get("/getpatient/:patientId", verifyToken, getPatient);
router.get("/getAppointments/:patientId", verifyToken, getAppointments);
router.get("/reportInfo",verifyToken,getReportInfo);
// router.get("/checkFriend/:patientId/:doctorId", verifyToken, checkFriend);
router.get("/:patientId/:doctorId", verifyToken, getReport);

export default router;
