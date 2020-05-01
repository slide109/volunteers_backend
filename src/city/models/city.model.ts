import { Field, ObjectType } from "@nestjs/graphql";
import { Coordinates } from "./coordinates.model";

@ObjectType()
export class City {
  @Field(type => String)
  id: string;

  @Field(type => String)
  name: string;

  @Field(type => Coordinates)
  coordinates: Coordinates;
}
