import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../authorization/jwt-auth.guard";
import { Task } from "./models/task.model";
import { TasksService } from "./tasks.service";
import { TaskInput } from "./models/taskIput.model";
import { TaskFilter } from "./models/taskFilters.model";
import { AssignTaskInput } from "./models/assignTaskInput";
import { CurrentUser } from "../authorization/currentUser.decorator";
import { User } from "../users/models/user.model";
import { TaskStatus } from "./enums/TaskStatus";
import { UpdateStatusInput } from "./models/updateStatusInput.model";

@Resolver(of => Task)
@UseGuards(GqlAuthGuard)
export class TasksResolver {
  constructor(private taskService: TasksService) {}

  @Query(returns => [Task], { name: "tasks" })
  async getTasks(@Args("filters", { nullable: true }) filters: TaskFilter) {
    return await this.taskService.findAll(filters);
  }

  @Query(returns => Task, { name: "task" })
  async getTask(@Args("id") id: String) {
    return await this.taskService.findById(id);
  }

  @Query(returns => [Task], { name: "userTasks" })
  async getUserTasks(@CurrentUser() user: User) {
    return await this.taskService.findUserTasks(user.id);
  }

  @Query(returns => [Task], { name: "assignedTasks" })
  async getAssignedTasks(@CurrentUser() user: User) {
    return await this.taskService.findAll({
      assignee: user.id,
      status: TaskStatus.Assigned
    });
  }

  @Mutation(returns => Task, { name: "taskCreate" })
  async createTask(
    @Args("taskInput") TaskInput: TaskInput,
    @CurrentUser() user: User
  ) {
    return this.taskService.create({
      ...TaskInput,
      user: user.id,
      status: TaskStatus.New
    });
  }

  @Mutation(returns => Boolean)
  async assignTask(
    @Args("input") assignTaskInput: AssignTaskInput,
    @CurrentUser() user: User
  ) {
    return await this.taskService.assign({
      ...assignTaskInput,
      assigneeID: user.id
    });
  }

  @Mutation(returns => Boolean)
  async updateTaskStatus(
    @Args("input") input: UpdateStatusInput,
    @CurrentUser() user: User
  ) {
    const task = await this.taskService.updateTaskStatus(input);
    return task.status === input.status;
  }
}
