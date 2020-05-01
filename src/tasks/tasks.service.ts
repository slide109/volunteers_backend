import { Model } from "mongoose";
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, TaskStatus } from "../graphql";
import { UpdateStatusInput } from "./models/updateStatusInput.model";
import { TwilioService } from "../services/Twilio";

@Injectable()
export class TasksService {
  private twilio: TwilioService;

  constructor(
    @InjectModel("Task") private taskModel: Model<any>,
    @Inject("TwilioService") twilio: TwilioService
  ) {
    this.twilio = twilio;
  }

  async findAll(filtes: any): Promise<Task[]> {
    const filterOptions = {};

    Object.keys(filtes).forEach(key => {
      Boolean(key) && (filterOptions[key] = filtes[key]);
    });

    return this.taskModel.find(filterOptions).populate(["user", "assignee"]);
  }

  async findById(id: String): Promise<Task> {
    return this.taskModel.findById(id).populate(["user", "assignee"]);
  }

  async assign({ taskID, assigneeID }) {
    const update = {
      assignee: assigneeID,
      status: TaskStatus.Assigned
    };

    const updatedDoc = await this.taskModel
      .findByIdAndUpdate(taskID, update, {
        new: true
      })
      .populate(["user", "assignee"]);

    const modified =
      updatedDoc.status === TaskStatus.Assigned &&
      updatedDoc.assignee.id === assigneeID;

    if (modified) {
      await this.twilio.sendText({
        to: updatedDoc.user.phone,
        body: `You task was assigned by ${updatedDoc.assignee.firstName}. Yours volunteers project`
      });
    }

    return modified;
  }

  async findUserTasks(userID: string): Promise<Task[]> {
    return this.taskModel.find().populate([
      {
        path: "user",
        match: { id: { $eq: userID } }
      },
      "assignee"
    ]);
  }

  async create(createTaskDTO: any) {
    try {
      const createdUser = await this.taskModel.create(createTaskDTO);
      return await createdUser.populate(["user", "assignee"]).execPopulate();
    } catch (err) {
      console.error(err);
    }
  }

  async updateTaskStatus({ taskID, ...update }: UpdateStatusInput) {
    return this.taskModel.findByIdAndUpdate(taskID, update);
  }
}
