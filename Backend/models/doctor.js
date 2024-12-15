import mongoose from "mongoose";
const DoctorSchema = new mongoose.Schema(
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
    patientList: {
      type: Array,
      default:[],
    },
    appointmentRequests: {
      type: Array,
      default: [],
    },
    appointments: {
      type: Array,
      default: [],
    },
    files: {
      type: Map,
      of: String,
    },
    fee: {
      type: String,
      required: true,
    },
    startTime: {
      type: Object,
      default: {
        hours: 0,
        minutes: 0,
      },
    },
    stopTime: {
      type: Object,
      default: {
        hours: 23,
        minutes: 59,
      },
    },
    specialist: {
      type: String,
      required: true,
      max: 50,
    },
    requests: {
      type: Array,
      default: [],
    },
    reviews: {
      type: Map,
      of: Object,
    },
    rating: {
      type: Object,
      default: {
        total: 0,
        number: 0,
      },
    },
  },
  { timestamps: true }
);
const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
