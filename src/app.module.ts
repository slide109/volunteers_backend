import { join } from "path";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from "./users/users.module";
import { TasksModule } from "./tasks/tasks.module";
import { AuthorizationModule } from "./authorization/authorization.module";
import { CityModule } from "./city/city.module";
import { CallsModule } from "./calls/calls.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot({
      debug: false,
      playground: process.env.NODE_ENV !== "production",
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      definitions: {
        path: join(process.cwd(), "src/graphql.ts"),
        outputAs: "class"
      },
      context: ({ req }) => ({ req })
    }),
    MongooseModule.forRoot(process.env.MONGO_DB_URI, {
      user: process.env.MONGO_DB_USER,
      pass: process.env.MONGO_DB_PASSWORD,
      useFindAndModify: false
    }),
    UsersModule,
    TasksModule,
    AuthorizationModule,
    CityModule,
    CallsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
