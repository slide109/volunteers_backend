import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class AssignTaskInput {
  @Field(type => String)
  taskID: string;
}
