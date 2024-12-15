import express from "express";
import path from "path";
import dotenv from "dotenv";
import { registerDoctor, registerPatient } from "./controllers/auth.js";
import { editDataP } from "./controllers/patient.js";
import { editDataD } from "./controllers/doctor.js";
import { verifyToken } from "./middleware/auth.js";
import multer from "multer";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import doctorRoutes from "./routes/doctor.js";
import patientRoutes from "./routes/patient.js";
import chatRoutes from "./routes/chat.js";
import cors from "cors";
import { socketSetup } from "./controllers/socket.js";
import { Server } from "socket.io";
import { createServer } from "http";
//configuration

const app = express();
app.use(cors());
export const server = createServer(app);
const PORT = process.env.PORT || 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

//middleware
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

//server setup for socket
socketSetup();

// File Storage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// File Storage

//requests with data
app.post("/auth/patient/register", upload.single("picture"), registerPatient);
app.post("/auth/doctor/register", upload.single("picture"), registerDoctor);
app.patch("/edit/patient", upload.single("picture"), verifyToken, editDataP);
app.patch("/edit/doctor", upload.single("picture"), verifyToken, editDataD);
app.use("/auth", authRoutes);
app.use("/doctor", doctorRoutes);
app.use("/patient", patientRoutes);
app.use("/chat", chatRoutes);
//mongoose setup
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    server.listen(PORT, () => console.log(`Server Port : ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connected`));

//Sockets-Video Call
//const { Server } = require("socket.io");
const io = new Server(8000, {
  cors: true,
});

const emailToSocketIdMap = new Map();
const socketidToEmailMap = new Map();

io.on("connection", (socket) => {
  socket.on("room:join", (data) => {
    const { email, room } = data;
    emailToSocketIdMap.set(email, socket.id);
    socketidToEmailMap.set(socket.id, email);
    io.to(room).emit("user:joined", { email, id: socket.id });
    socket.join(room);
    io.to(socket.id).emit("room:join", data);
  });

  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incomming:call", { from: socket.id, offer });
  });

  socket.on("call:accepted", ({ to, ans }) => {
    io.to(to).emit("call:accepted", { from: socket.id, ans });
  });

  socket.on("peer:nego:needed", ({ to, offer }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  socket.on("peer:nego:done", ({ to, ans }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, ans });
  });
});
