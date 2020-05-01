import { Module } from "@nestjs/common";
import { AuthorizationResolver } from "./authorization.resolver";
import { AuthorizationService } from "./authorization.service";
import { TwilioService } from "../services/Twilio";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  providers: [
    AuthorizationResolver,
    AuthorizationService,
    JwtStrategy,
    TwilioService
  ],
  imports: [
    PassportModule,
    UsersModule,
    PassportModule.register({
      defaultStrategy: "jwt",
      property: "user",
      session: false
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "7d" }
    })
  ]
})
export class AuthorizationModule {}
