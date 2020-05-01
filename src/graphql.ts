/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum UserRole {
  User = "User",
  Volunteer = "Volunteer"
}

export enum UserGender {
  Female = "Female",
  Male = "Male"
}

export enum TaskStatus {
  New = "New",
  Assigned = "Assigned",
  Completed = "Completed",
  Cancelled = "Cancelled"
}

export class TaskFilter {
  user?: string;
  assignee?: string;
  status?: TaskStatus[];
}

export class CallInput {
  userPhone: string;
  userName?: string;
  assigneeName?: string;
  assigneePhone: string;
}

export class UserInput {
  firstName: string;
  lastName?: string;
  role?: UserRole;
  email?: string;
  phone: string;
  password: string;
  bio?: string;
  age?: number;
  gender?: UserGender;
}

export class UserUpdateInput {
  firstName: string;
  lastName?: string;
  email?: string;
  bio?: string;
  age?: number;
  gender?: UserGender;
}

export class TaskInput {
  title: string;
  description?: string;
  coordinates?: string;
}

export class AssignTaskInput {
  taskID: string;
}

export class UpdateStatusInput {
  taskID: string;
  status: TaskStatus;
}

export class ValidatePhoneInput {
  phone: string;
  code: string;
}

export class AuthorizationInput {
  phone: string;
  password: string;
}

export class User {
  id: string;
  firstName: string;
  lastName?: string;
  role: UserRole;
  email?: string;
  phone: string;
  password: string;
  bio?: string;
  age?: number;
  gender?: UserGender;
}

export class Task {
  id: string;
  title: string;
  description?: string;
  user: User;
  assignee?: User;
  status?: TaskStatus;
  coordinates?: string;
  created_at: DateTime;
}

export class Authorization {
  token: string;
  user: User;
}

export class Coordinates {
  id: string;
  latitude: string;
  longitude: string;
}

export class City {
  id: string;
  name: string;
  coordinates: Coordinates;
}

export abstract class IQuery {
  abstract getUsers(): User[] | Promise<User[]>;

  abstract user(id: string): User | Promise<User>;

  abstract whoAmI(): User | Promise<User>;

  abstract tasks(filters?: TaskFilter): Task[] | Promise<Task[]>;

  abstract task(id: string): Task | Promise<Task>;

  abstract userTasks(): Task[] | Promise<Task[]>;

  abstract assignedTasks(): Task[] | Promise<Task[]>;

  abstract cities(): City[] | Promise<City[]>;

  abstract call(input: CallInput): boolean | Promise<boolean>;
}

export abstract class IMutation {
  abstract createUser(userInput: UserInput): User | Promise<User>;

  abstract updateUser(input: UserUpdateInput): User | Promise<User>;

  abstract taskCreate(taskInput: TaskInput): Task | Promise<Task>;

  abstract assignTask(input: AssignTaskInput): boolean | Promise<boolean>;

  abstract updateTaskStatus(
    input: UpdateStatusInput
  ): boolean | Promise<boolean>;

  abstract sendValidationCode(phone: string): boolean | Promise<boolean>;

  abstract validatePhone(
    validatePhoneInput: ValidatePhoneInput
  ): boolean | Promise<boolean>;

  abstract authorization(
    input: AuthorizationInput
  ): Authorization | Promise<Authorization>;
}

export type DateTime = any;
