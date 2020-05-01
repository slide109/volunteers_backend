import { Resolver, Query, Args } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../authorization/jwt-auth.guard";
import { City } from "./models/city.model";
import { CityService } from "./city.service";

@Resolver(of => City)
@UseGuards(GqlAuthGuard)
export class CityResolver {
  constructor(private cityService: CityService) {}

  @Query(returns => [City], { name: "cities" })
  async getCities() {
    return await this.cityService.findAll();
  }
}
