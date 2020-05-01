import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CallInput {
  @Field(type => String)
  userPhone: string;

  @Field(type => String, { nullable: true })
  userName: string;

  @Field(type => String, { nullable: true })
  assigneeName: string;

  @Field(type => String)
  assigneePhone: string;
}
