import { registerEnumType } from "@nestjs/graphql";

export enum UserRole {
  User = "User",
  Volunteer = "Volunteer"
}

export enum UserGender {
  Female = "Female",
  Male = "Male"
}

registerEnumType(UserRole, { name: "UserRole" });
registerEnumType(UserGender, { name: "UserGender" });
