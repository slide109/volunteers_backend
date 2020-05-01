import { Resolver, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../authorization/jwt-auth.guard";
import { CallsService } from "./calls.service";
import { CallInput } from "./models/callInput.model";

@Resolver("Call")
@UseGuards(GqlAuthGuard)
export class CallsResolver {
  constructor(private callService: CallsService) {}

  @Query(returns => Boolean, { name: "call" })
  async handleCall(@Args("input") input: CallInput) {
    return await this.callService.handleCall(input);
  }
}
