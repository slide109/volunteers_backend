import * as bcrypt from "bcryptjs";
import { Injectable, Inject } from "@nestjs/common";
import { TwilioService } from "../services/Twilio";
import { UsersService } from "../users/users.service";
import { ValidatePhoneInput } from "./models/validatePhoneInput.model";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthorizationService {
  private twilio: TwilioService;

  constructor(
    @Inject("TwilioService") twilio: TwilioService,
    private userService: UsersService,
    private jwtService: JwtService
  ) {
    this.twilio = twilio;
  }

  async sendValidationCode(phone: string): Promise<boolean> {
    return await this.twilio.getVerificationCode(phone);
  }

  async validatePhone({ phone, code }: ValidatePhoneInput): Promise<boolean> {
    return await this.twilio.verifyPhone({ phone, code });
  }

  async validateUser({
    phone,
    password: userPassword
  }: {
    phone: string;
    password: string;
  }): Promise<any> {
    const user = await this.userService.findByPhone(phone);

    if (
      user &&
      (await AuthorizationService.passwordsAreEqual(
        user.password,
        userPassword
      ))
    ) {
      const { _id, password, ...result } = user as any;
      result.id = _id;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { phone: user.phone, id: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  static async passwordsAreEqual(
    hashedPassword: string,
    plainPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
