import mongoose from "mongoose";
const PatientSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    blood: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    doctorList: {
      type: Array,
      default: [],
    },
    notifications: {
      type: Array,
      default: [],
    },
    files: {
      type: Map,
      of: String,
    },
    appointments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
const Patient = mongoose.model("Patient", PatientSchema);
export default Patient;
