import { Module } from "@nestjs/common";
import { CallsResolver } from "./calls.resolver";
import { CallsService } from "./calls.service";
import { TwilioService } from "../services/Twilio";

@Module({
  providers: [CallsResolver, CallsService, TwilioService]
})
export class CallsModule {}
