import { Injectable } from "@nestjs/common";
import { Twilio } from "twilio";

export interface HandleProneCallArgs {
  userPhone: string;
  assigneePhone: string;
  userName?: string;
  assigneeName?: string;
}

@Injectable()
export class TwilioService {
  private client: Twilio;

  constructor() {
    this.client = new Twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
  }

  public async sendText({ to, body }) {
    try {
      const response = await this.client.messages.create({
        body,
        to,
        from: process.env.TWILIO_NUMBER
      });
    } catch (err) {
      console.error(err);
    }
  }

  public async getVerificationCode(phone): Promise<boolean> {
    try {
      const response = await this.client.verify
        .services(process.env.TWILIO_SMS_SERVICE_SID)
        .verifications.create({ to: phone, channel: "sms" });
      return response.status === "pending";
    } catch (err) {
      console.error(err);
    }
  }

  public async verifyPhone({ phone, code }: { phone: string; code: string }) {
    try {
      const response = await this.client.verify
        .services(process.env.TWILIO_SMS_SERVICE_SID)
        .verificationChecks.create({ to: phone, code });
      return response.valid;
    } catch (err) {
      console.error(err);
    }
  }

  public async handlePhoneCall({
    userPhone,
    assigneePhone,
    assigneeName,
    userName
  }: HandleProneCallArgs) {
    const getIntro = (
      userName: HandleProneCallArgs["userName"],
      assigneeName: HandleProneCallArgs["assigneeName"]
    ): string => {
      return userName && assigneeName
        ? `Hi ${userName}. This is a call from volunteers. We are putting you through to ${assigneeName}. Please, hold on`
        : "Hello. This is a call from volunteers. We are putting you through to your volunteer. Please, hold on";
    };

    try {
      const call = await this.client.calls.create({
        twiml: `
                    <Response>
                        <Say voice="alice">
                            ${getIntro(userName, assigneeName)}
                        </Say>
                        <Dial>${assigneePhone}</Dial>
                    </Response>
                `,
        to: userPhone,
        from: process.env.TWILIO_NUMBER
      });
      return call.status;
    } catch (e) {
      console.error(e);
    }
  }
}
