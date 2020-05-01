import { registerEnumType } from "@nestjs/graphql";

export enum TaskStatus {
  New = "New",
  Assigned = "Assigned",
  Completed = "Completed",
  Cancelled = "Cancelled"
}

registerEnumType(TaskStatus, { name: "TaskStatus" });
