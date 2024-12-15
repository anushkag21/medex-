import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ChatRoomSchema = new mongoose.Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
    messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);
const ChatRoom = mongoose.model("ChatRoom", ChatRoomSchema);
export default ChatRoom;
