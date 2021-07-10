import mongoose from "mongoose";

const { Schema } = mongoose;
export const userSchema = new Schema({
  loginId: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
export default mongoose.model("User", userSchema);
