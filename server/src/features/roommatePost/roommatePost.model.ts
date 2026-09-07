import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    accommodationType: {
      type: String,
      enum: ["apartment", "dorm", "studio"],
      required: true,
    },
    totalBeds: {
      type: Number,
      required: true,
    },
    availableBeds: {
      type: Number,
      required: true,
    },
    monthlyRent: {
      type: Number,
      required: true,
    },
    expenses: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      required: true,
    },
    rules: {
      type: String,
      required: true,
    },
    availableFrom: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "FULL", "CLOSED"],
      default: "ACTIVE",
    },
    images:{
      type: [String],
      default:[]
    }
  },
  {
    timestamps: true,
  }
);

const RoommatePost = mongoose.model("RoommatePost", postSchema);

export default RoommatePost;