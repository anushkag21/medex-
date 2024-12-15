import bcrypt from "bcrypt";
import Patient from "../models/Patient.js";
import Doctor from "../models/doctor.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import { z } from "zod";

//registration

const emailSchema = z.object({
  email: z.string().email(),
});
export const registerPatient = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      picturePath,
      location,
      blood,
      age,
      sex,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const locationObj = await axios.get(
      "https://geocode.maps.co/search?q=" +
        location +
        "%20india" +
        "&api_key=65eee4b0c9e2b147377658rsp5199d9"
    );

    const latitude = locationObj.data[0].lat,
      longitude = locationObj.data[0].lon;
    const newPatient = new Patient({
      fullName,
      email,
      password: passwordHash,
      picturePath,
      location,
      latitude,
      longitude,
      blood,
      age,
      sex,
      files: [],
      doctorList: [],
      notifications: [],
      appointments: [],
    });
    const xyz = await newPatient.save();

    res.status(201).json(xyz);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;
    const requiredUser = await Patient.findOne({ email: email });
    
    if (!requiredUser) {
      return res.status(400).json({ msg: "Requested user does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      requiredUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Wrong password for requested user" });
    }

    const sessionToken = jwt.sign(
      { id: requiredUser._id },
      process.env.JWT_SECRET
    );

    delete requiredUser.password;

    res.status(200).send({ sessionToken, requiredUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(email);
    const requiredUser = await Doctor.findOne({ email: email });

    if (!requiredUser) {
      return res.status(400).json({ msg: "Requested user does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      requiredUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Wrong password for requested user" });
    }

    const sessionToken = jwt.sign(
      { id: requiredUser._id },
      process.env.JWT_SECRET
    );

    delete requiredUser.password;

    res.status(200).send({ sessionToken, requiredUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export const registerDoctor = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      picturePath,
      location,
      specialist,
      fee,
    } = req.body;

    // let { startTime, endTime } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // const startTimeHours = parseInt(startTime.split(":")[0]),
    //   startTimeMinutes = parseInt(startTime.split(":")[1]);

    // const endTimeHours = parseInt(endTime.split(":")[0]),
    //   endTimeMinutes = parseInt(endTime.split(":")[1]);

    // startTime = {
    //   hours: startTimeHours,
    //   minutes: startTimeMinutes,
    // };

    // endTime = {
    //   hours: endTimeHours,
    //   minutes: endTimeMinutes,
    // };

    const locationObj = await axios.get(
      "https://geocode.maps.co/search?q=" +
        location +
        "%20india" +
        "&api_key=65eee4b0c9e2b147377658rsp5199d9"
    );

    const latitude = locationObj.data[0].lat,
      longitude = locationObj.data[0].lon;

    const newDoctor = new Doctor({
      fullName,
      email,
      password: passwordHash,
      picturePath,
      location,
      latitude,
      longitude,
      specialist,
      fee,
      files: [],
      requests: [],
      appointmentRequests: [],
      appointments: [],
      reviews: new Map(),
    });

    emailSchema.parse(newDoctor);
    const xyz = await newDoctor.save();

    res.status(201).json(xyz);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
