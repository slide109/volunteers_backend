import { InputType, Field } from "@nestjs/graphql";
import { TaskStatus } from "../enums/TaskStatus";

@InputType()
export class UpdateStatusInput {
  @Field(type => String)
  taskID: string;

  @Field(type => TaskStatus)
  status: TaskStatus;
}
