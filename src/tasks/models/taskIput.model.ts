import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class TaskInput {
  @Field(type => String)
  title: string;

  @Field(type => String, { nullable: true })
  description?: string;

  @Field(type => String, { nullable: true })
  coordinates?: string;
}
