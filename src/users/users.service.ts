import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../graphql";
import { UserInput } from "./models/userInput.model";
import * as bcrypt from "bcryptjs";
import { UserUpdateInput } from "./models/userUpdateUnput.model";

@Injectable()
export class UsersService {
  constructor(@InjectModel("User") private userModel: Model<any>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async create(createUserDTO: UserInput) {
    const createdUser = new this.userModel({
      ...createUserDTO,
      password: await bcrypt.hash(createUserDTO.password, 10)
    });
    return createdUser.save();
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id);
  }

  async findByPhone(phone: string): Promise<User | undefined> {
    return this.userModel.findOne({ phone }, "", { lean: true });
  }

  async updateUser({
    userID,
    input
  }: {
    userID: string;
    input: UserUpdateInput;
  }): Promise<User | undefined> {
    return this.userModel.findByIdAndUpdate(userID, input, { new: true });
  }
}
