import * as mongoose from "mongoose";

export const CitySchema = new mongoose.Schema({
  name: String,
  coordinates: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coordinates"
  }
});
