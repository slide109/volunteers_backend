import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CityService {
  constructor(@InjectModel("City") private cityModel: Model<any>) {}

  async findAll() {
    return await this.cityModel
      .find()
      .populate("coordinates")
      .exec();
  }
}
