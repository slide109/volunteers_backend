import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  firstName: String!,
  lastName: String,
  role: String!,
  email: String,
  phone: String!,
  password: String!,
  bio: String,
  age: Number,
  gender: String
});
