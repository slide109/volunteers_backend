import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AuthorizationService } from "./authorization.service";
import { ValidatePhoneInput } from "./models/validatePhoneInput.model";
import { AuthorizationInput } from "./models/authorizationInut.model";
import { User } from "../users/models/user.model";
import { Authorization } from "./models/authorization.model";

@Resolver("Authorization")
export class AuthorizationResolver {
  constructor(private authService: AuthorizationService) {}

  @Mutation(returns => Boolean, { name: "sendValidationCode" })
  async sendValidationCode(@Args("phone") phone: string) {
    return await this.authService.sendValidationCode(phone);
  }

  @Mutation(returns => Boolean, { name: "validatePhone" })
  async validatePhone(@Args("validatePhoneInput") input: ValidatePhoneInput) {
    return await this.authService.validatePhone(input);
  }

  @Mutation(returns => Authorization, { name: "authorization" })
  async authorize(@Args("input") input: AuthorizationInput) {
    const response = await this.authService.validateUser({
      phone: input.phone,
      password: input.password
    });
    const success = await this.authService.login(response);

    return {
      token: success.access_token,
      user: response
    };
  }
}
