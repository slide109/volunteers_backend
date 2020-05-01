import { Field, ObjectType } from "@nestjs/graphql";
import { TaskStatus } from "../enums/TaskStatus";
import { User } from "../../users/models/user.model";

@ObjectType()
export class Task {
  @Field(type => String)
  id: string;

  @Field(type => String)
  title: string;

  @Field(type => String, { nullable: true })
  description?: string;

  @Field(type => User)
  user: User;

  @Field(type => User, { nullable: true })
  assignee?: User;

  @Field(type => TaskStatus, { defaultValue: TaskStatus.New })
  status: TaskStatus;

  @Field(type => String, { nullable: true })
  coordinates?: string;

  @Field(type => Date)
  created_at: Date;
}
