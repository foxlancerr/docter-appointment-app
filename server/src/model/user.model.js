import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "The username is required"],
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "The email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "The password is required"],
      trim: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isDocter: {
      type: Boolean,
      default: false,
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  console.log(password);
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", userSchema);
export default User;
