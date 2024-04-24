import mongoose from "mongoose";

const docterSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "The firstname is required"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "The lastname is required"],
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
    },
    
    department: {
      type: String,
      unique: true,
      trim: true,
    },
    profession: {
      type: String,
      unique: true,
      trim: true,
    },
    experaince: {
      type: String,
      unique: true,
      trim: true,
      require: [true, "experaince are required"],
    },
    address: {
      type: String,
      unique: true,
      require: [true, "address are required"],
      trim: true,
    },
    feePerConsultant: {
      type: String,
      unique: true,
      trim: true,
    },
    timing: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Docter = mongoose.model("docter", docterSchema);
export default Docter;
