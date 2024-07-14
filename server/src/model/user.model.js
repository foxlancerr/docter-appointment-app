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
    userType: {
      type: String,
      default: "patient",
      enum: ["admin", "patient", "doctor"],
    },
    roleDetails: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "userType",
    },
    notification: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],

    // Add more common fields if needed
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
