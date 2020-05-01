import * as mongoose from "mongoose";
import { UserSchema as User } from "../../users/schema/user.schema";

export const TaskSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    status: String,
    coordinates: String
  },
  { timestamps: { createdAt: "created_at" } }
);
