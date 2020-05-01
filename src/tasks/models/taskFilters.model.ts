import { InputType, Field } from "@nestjs/graphql";
import { TaskStatus } from "../enums/TaskStatus";
import { UserRole } from "../../users/enums/UserRole";

@InputType()
export class TaskFilter {
  @Field(type => String, { nullable: true })
  user?: string;

  @Field(type => String, { nullable: true })
  assignee?: string;

  @Field(type => [TaskStatus], { nullable: true })
  status?: TaskStatus[];
}
