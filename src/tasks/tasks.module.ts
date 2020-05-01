import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksResolver } from "./tasks.resolver";
import { TasksService } from "./tasks.service";
import { TaskSchema } from "./schema/task.schema";
import { TwilioService } from "../services/Twilio";

@Module({
  imports: [MongooseModule.forFeature([{ name: "Task", schema: TaskSchema }])],
  providers: [TasksResolver, TasksService, TwilioService]
})
export class TasksModule {}
