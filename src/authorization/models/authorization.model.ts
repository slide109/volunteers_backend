import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../users/models/user.model";

@ObjectType()
export class Authorization {
  @Field(type => String)
  token: string;

  @Field(type => User)
  user: User;
}
