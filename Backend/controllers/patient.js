import { application } from "express";
import axios from "axios";
import Doctor from "../models/doctor.js";
import Patient from "../models/Patient.js";
import Report from "../models/Report.js";
import { errorMonitor } from "events";
import { error } from "console";

// Assuming your _id value is stored in a variable called idValue

const processor = async (doctorId) => {
  return await Doctor.findById(doctorId);
};

export const getMyDoctors = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);

    const { doctorList } = patient;

    const doctors = await Promise.all(doctorList.map(processor));

    res.status(200).json(doctors);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

//not implemented yet
export const getMyReports = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = Patient.findById(patientId);

    const { doctorList } = patient;

    res.status(200).json(doctorList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getReport = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    const patient = await Patient.findById(patientId);

    const report = patient.files.get(doctorId);

    res.status(200).json(report);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getReportInfo = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await Patient.findById(patientId);

    const reportsInfo = await Promise.all(
      patient.files.forEach(async (key, value) => {
        const report = await Report.findById(value);
        const doctor = await Report.findById(key);

        const updated = report.updatedAt.substring(0, 10).split("-");
        const reportInfo = {
          doctorName: doctor.fullName,
          specialist: doctor.specialist,
          picturePath: doctor.picturePath,
          date: updated[2],
          month: updated[1],
          year: updated[0],
        };

        return reportInfo;
      })
    );

    res.status(200).json(reportsInfo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const requestAppointment = async (req, res) => {
  try {
    const { patientId } = req.body;
    const { doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);

    doctor.requests.push(patientId);

    doctor.save();

    res.status(200).json(doctor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { patientId, date } = req.body;
    let { time } = req.body;
    console.log(patientId);
    console.log(time);
    console.log(date);
    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    if (doctor.patientList.indexOf(patientId) == -1) {
      return res.status(407).json({
        error: "It seems you've not been assigned to this doctor yet",
      });
    }
    const { startTime, endTime } = doctor;
    const patientTime = parseInt(time);
    const startTimeHours = parseInt(time.split(":")[0]),
      startTimeMinutes = parseInt(time.split(":")[1]);

    time = {
      hours: startTimeHours,
      minutes: startTimeMinutes,
    };

    if (patientTime >= endTime || patientTime < startTime) {
      const message = `Sorry, Dr. ${doctor.fullName} is not available at that time`;

      patient.notifications.push(message);
    } else {
      const message = `Dr. ${doctor.fullName} has been informed  of your request :)`;

      patient.notifications.push(message);

      const request = {
        date,
        time,
        patientId,
      };

      doctor.appointmentRequests.push(request);

      await doctor.save();
    }

    await patient.save();

    res.status(200).json(doctor);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);
    const appointments = await Promise.all(
      patient.appointments.map(async (appointmentObj) => {
        const { date, time } = appointmentObj;
        const doctor = await Doctor.findById(appointmentObj.doctorId);

        const { fullName, picturePath, files, specialist ,_id} = doctor;
        const newObj = {
          date,
          time,
          doctor: {
            _id,
            fullName,
            picturePath,
            files,
            specialist,
          },
        };

        return newObj;
      })
    );

    res.status(200).json(appointments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const handleNotifications = async (req, res) => {
  try {
    const { message, patientId } = req.body;

    const patient = await Patient.findById(patientId);

    const index = patient.notifications.indexOf(message);

    patient.notifications.splice(index, 1);

    await patient.save();

    res.status(200).json(patient);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
export const sendNotifications = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await Patient.findById(patientId);
    res.status(200).json(patient.notifications);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
export const makeReview = async (req, res) => {
  try {
    const { rating, comment, patientId } = req.body;
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);

    if (doctor.patientList.indexOf(patientId) == -1) {
      return res.status(407).json({
        error: "It seems you've not been assigned to this doctor yet",
      });
    }
    
    const ratingObj = doctor.rating;
    const reviewObj = {
      rating,
      comment,
    };

    if (doctor.reviews.get(patientId) === undefined) {
      ratingObj.number++;
      ratingObj.total += rating;
    } else {
      const oldRatingObj = doctor.reviews.get(patientId);

      ratingObj.total -= oldRatingObj.rating;
      ratingObj.total += rating;
    }
    doctor.reviews.set(patientId, reviewObj);

    doctor.rating = ratingObj;
    await doctor.save();

    res.status(204).json(doctor);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const editDataP = async (req, res) => {
  try {
    console.log("hi");
    const { patientId, fullName, picturePath, age, sex, blood, location } =
      req.body;
    console.log(patientId);
    const patient = await Patient.findById(patientId);

    const locationObj = await axios.get(
      "https://geocode.maps.co/search?q=" +
        location +
        "%20india" +
        "&api_key=65eee4b0c9e2b147377658rsp5199d9"
    );

    const latitude = locationObj.data[0].lat,
      longitude = locationObj.data[0].lon;

    patient.fullName = fullName;
    patient.picturePath = picturePath;
    patient.age = age;
    patient.sex = sex;
    patient.blood = blood;
    patient.location = location;
    patient.latitude = latitude;
    patient.longitude = longitude;

    await patient.save();

    res.status(200).json(patient);
  } catch (error) {
    res.status(407).json({ error: error.message });
  }
};
export const getPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    console.log(patientId);
    const patient = await Patient.findById(patientId);

    res.status(201).json(patient);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const checkFriend = async (req, res) => {
  try {
    const { patientId, doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    let exists = false;
    if (doctor.patientList.indexOf(patientId) != -1) {
      exists = true;
    }
    res.status(200).json({ result: exists });
  } catch (err) {
    res.status(404).json({ error: error.message });
  }
};
export const ViewReport = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;
    const patient = await Patient.findById(patientId);

    const report = await Report.findById(patient.files.get(doctorId));

    res.status(201).json(report);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
