import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema(
  {
    applicantId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "RoommatePost",
      required: true,
    },
    message: {
    type: String,
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const RoommateRequest = mongoose.model("RoommateRequest", requestSchema);

export default RoommateRequest;