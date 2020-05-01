import { Args, Mutation, Query, Resolver, Subscription } from "@nestjs/graphql";
import { User } from "./models/user.model";
import { UserInput } from "./models/userInput.model";
import { UsersService } from "./users.service";
import { CurrentUser } from "../authorization/currentUser.decorator";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../authorization/jwt-auth.guard";
import { UserUpdateInput } from "./models/userUpdateUnput.model";

@Resolver(of => User)
export class UsersResolver {
  constructor(private userService: UsersService) {}

  @Query(returns => [User])
  async getUsers() {
    return await this.userService.findAll();
  }

  @Query(returns => User, { name: "user" })
  async findUserById(@Args("id") id: string) {
    return this.userService.findById(id);
  }

  @Query(returns => User, { name: "whoAmI" })
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    console.log({ user });
    return this.userService.findById(user.id);
  }

  @Mutation(returns => User)
  async createUser(@Args("userInput") UserInput: UserInput) {
    return this.userService.create(UserInput);
  }

  @Mutation(returns => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(
    @Args("input") input: UserUpdateInput,
    @CurrentUser() user: User
  ) {
    return await this.userService.updateUser({ userID: user.id, input });
  }
}
