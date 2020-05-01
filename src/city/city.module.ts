import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CityResolver } from "./city.resolver";
import { CityService } from "./city.service";
import { CitySchema } from "./schema/city.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "City", schema: CitySchema }])],
  providers: [CityResolver, CityService]
})
export class CityModule {}
