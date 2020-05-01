import { Field, Int, ObjectType } from "@nestjs/graphql";
import { UserRole, UserGender } from "../enums/UserRole";

@ObjectType()
export class User {
  @Field(type => String)
  id: string;

  @Field(type => String)
  firstName: string;

  @Field(type => String, { nullable: true })
  lastName: string;

  @Field(type => UserRole)
  role: UserRole;

  @Field(type => String, { nullable: true })
  email: string;

  @Field(type => String)
  phone: string;

  @Field(type => String)
  password: string;

  @Field(type => String, { nullable: true })
  bio: string;

  @Field(type => Int, { nullable: true })
  age: number;

  @Field(type => UserGender, { nullable: true })
  gender: UserGender;
}
