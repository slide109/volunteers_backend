import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class AuthorizationInput {
  @Field(type => String)
  phone: string;

  @Field(type => String)
  password: string;
}
