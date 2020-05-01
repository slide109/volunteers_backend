import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ValidatePhoneInput {
  @Field(type => String)
  phone: string;

  @Field(type => String)
  code: string;
}
