import { Inject, Injectable } from "@nestjs/common";
import { TwilioService, HandleProneCallArgs } from "../services/Twilio";

@Injectable()
export class CallsService {
  private twilio: TwilioService;

  constructor(@Inject("TwilioService") twilio: TwilioService) {
    this.twilio = twilio;
  }

  handleCall = async (input: HandleProneCallArgs): Promise<boolean> => {
    const status = await this.twilio.handlePhoneCall(input);
    return status === "queued";
  };
}
