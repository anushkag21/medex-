import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    notification: {
      type: Boolean,
      default: false,
    },
    senderIsPatient: {
      type: Boolean,
      default: true,
    },
    content: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", MessageSchema);
export default Message;
