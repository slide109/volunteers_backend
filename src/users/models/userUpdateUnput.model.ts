import { InputType, Field, Int } from "@nestjs/graphql";
import { UserGender } from "../enums/UserRole";

@InputType()
export class UserUpdateInput {
  @Field(type => String)
  firstName: string;

  @Field(type => String, { nullable: true })
  lastName: string;

  @Field(type => String, { nullable: true })
  email: string;

  @Field(type => String, { nullable: true })
  bio: string;

  @Field(type => Int, { nullable: true })
  age: number;

  @Field(type => UserGender, { nullable: true })
  gender: UserGender;
}
