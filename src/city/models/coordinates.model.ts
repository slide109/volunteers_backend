import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Coordinates {
  @Field(type => String)
  id: string;

  @Field(type => String)
  latitude: string;

  @Field(type => String)
  longitude: string;
}
