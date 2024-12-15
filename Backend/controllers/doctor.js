import Doctor from "../models/doctor.js";
import Patient from "../models/Patient.js";
import Report from "../models/Report.js";
import axios from "axios";

export const getDoctors = async (req, res) => {
  try {
    const filter = req.query.filter || "";
    const doctors = await Doctor.find({
      $or: [
        {
          specialist: {
            $regex: filter,
          },
        },
        {
          location: {
            $regex: filter,
          },
        },
        {
          fullName: {
            $regex: filter,
          },
        },
      ],
    });
    const newDoctors = [];
    doctors.map((doc) => {
      newDoctors.push(doc);
    });

    res.status(200).json({
      doctors: newDoctors,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

export const getDoctorsByDistance = async (req, res) => {
  try {
    const { patientId } = req.body;

    const patient = await Patient.findById(patientId);

    const Doctors = await Doctor.find();
    const newDoctors = [];
    Doctors.map((doc) => {
      const distance = getDistanceFromLatLonInKm(
        patient.latitude,
        patient.longitude,
        doc.latitude,
        doc.longitude
      );

      doc.distance = distance;
      newDoctors.push(doc);
    });

    newDoctors.sort((a, b) => a.distance - b.distance);
    res.status(200).json({
      doctors: newDoctors.map((doc) => ({
        fullName: doc.fullName,
        _id: doc._id,
        location: doc.location,
        specialist: doc.specialist,
        distance: doc.distance,
      })),
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    console.log(doctorId);
    const doctor = await Doctor.findById(doctorId);

    res.status(201).json(doctor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
export const handleRequest = async (req, res) => {
  try {
    const { result, doctorId } = req.body;
    const { patientId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);

    const index = doctor.requests.indexOf(patientId);

    doctor.requests.splice(index, 1);

    if (result === "true") {
      doctor.patientList.push(patientId);
      patient.doctorList.push(doctorId);
      const doctorInformation = {
        name: doctor.fullName,
        email: doctor.email,
        specialist: doctor.specialist,
        location: doctor.location,
      };
      const basicInformation = {
        name: patient.fullName,
        email: patient.email,
        age: patient.age,
        blood: patient.blood,
        sex: patient.sex,
      };

      const newReport = new Report({
        basicInformation,
        doctorInformation,
        patientId,
        doctorId,
      });

      await newReport.save();
      patient.files.set(doctorId, newReport._id);
      doctor.files.set(patientId, newReport._id);

      const message = `Dr. ${doctor.fullName} has accepted your request :)`;
      patient.notifications.push(message);
    } else {
      const message = `Unfortunately, Dr. ${doctor.fullName} is unable to take your appointment`;

      patient.notifications.push(message);
    }

    await patient.save();
    await doctor.save();

    res.status(200).json(doctor);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const checkRequest = async (req, res) => {
  try {
    const { patientId, doctorId } = req.params;

    const doctor = await Doctor.findById(doctorId);
    let exists = false;
    if (doctor.requests.indexOf(patientId) != -1) {
      exists = true;
    }

    res.status(200).json({ result: exists });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createReport = async (req, res) => {
  try {
    const { patientId, doctorId, medicine, symptoms, tests } = req.body;
    console.log(patientId);
    console.log(medicine);
    console.log(tests);
    const doctor = await Doctor.findById(doctorId);

    const report = await Report.findById(doctor.files.get(patientId));

    report.medicine = medicine;
    report.symptoms = symptoms;
    report.tests = tests;

    await report.save();

    res.status(201).json(report);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const handleBooking = async (req, res) => {
  try {
    const { request, result, doctorId } = req.body;

    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(request.patientId);

    const index = doctor.appointmentRequests.indexOf(request);

    doctor.appointmentRequests.splice(index, 1);

    const { date, time } = request;
    if (result === "true") {
      const patientRequest = {
        date,
        time,
        doctorId,
      };
      const message = `Your appointment with Dr. ${doctor.fullName} has been confirmed`;
      doctor.appointments.push(request);
      patient.appointments.push(patientRequest);
      patient.notifications.push(message);
    }

    await doctor.save();
    await patient.save();

    res.status(200).json(doctor);
  } catch (error) {
    res.status(407).json({ error: error.message });
  }
};
export const getRequestPatients = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);

    const allrequest = await Promise.all(
      doctor.requests.map(async (idd) => {
        const patient = await Patient.findById(idd);

        const { fullName, picturePath, location, age, sex, _id } = patient;
        const newObj = {
          _id,
          fullName,
          picturePath,
          location,
          age,
          sex,
        };

        return newObj;
      })
    );

    res.status(200).json(allrequest);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getAppointmentsreq = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    const appointmentsreq = await Promise.all(
      doctor.appointmentRequests.map(async (appointmentObj) => {
        const { date, time } = appointmentObj;
        const patient = await Patient.findById(appointmentObj.patientId);

        const { fullName, picturePath, age, location, sex, _id } = patient;
        const newObj = {
          date,
          time,
          patient: {
            _id,
            fullName,
            picturePath,
            age,
            location,
            sex,
          },
        };

        return newObj;
      })
    );

    res.status(200).json(appointmentsreq);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editDataD = async (req, res) => {
  try {
    const {
      doctorId,
      fullName,
      picturePath,
      fee,
      startTime,
      stopTime,
      specialist,
      location,
    } = req.body;

    let doctor = await Doctor.findById(doctorId);

    const locationObj = await axios.get(
      "https://geocode.maps.co/search?q=" +
        location +
        "%20india" +
        "&api_key=65eee4b0c9e2b147377658rsp5199d9"
    );

    const latitude = locationObj.data[0].lat,
      longitude = locationObj.data[0].lon;

    doctor.fullName = fullName;
    doctor.picturePath = picturePath;
    doctor.fee = fee;
    doctor.startTime = startTime;
    doctor.stopTime = stopTime;
    doctor.specialist = specialist;
    doctor.location = location;
    doctor.latitude = latitude;
    doctor.longitude = longitude;

    await doctor.save();

    res.status(200).json(doctor);
  } catch (error) {
    res.status(407).json({ error: error.message });
  }
};
export const getDoctorReviews = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    const patientReviews = await Promise.all(
      Array.from(doctor.reviews.keys()).map(async (patientId) => {
        const patient = await Patient.findById(patientId);
        const review = doctor.reviews.get(patientId); // Get the review object from the map
        const newObj = {
          fullName: patient.fullName,
          picturePath: patient.picturePath,
          myReview: review,
        };
        return newObj;
      })
    );

    res.status(200).json(patientReviews);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getdocAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await Doctor.findById(doctorId);
    const appointments = await Promise.all(
      doctor.appointments.map(async (appointmentObj) => {
        const { date, time } = appointmentObj;
        const patient = await Patient.findById(appointmentObj.patientId);

        const { fullName, picturePath, files, _id, location } = patient;
        const newObj = {
          date,
          time,
          patient: {
            fullName,
            picturePath,
            files,
            _id,
            location,
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
