import { createTransport } from "nodemailer";

class MailService {
  transport: any;

  constructor() {
    this.transport = createTransport({
      service: process.env.SMTP_SERVICE,
      // host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT as unknown as number,
      logger: true,
      debug: true,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(email: string, activationLink: string) {
    await this.transport.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: "Подтверждение активации" + process.env.APP_URL,
      html: `<a href="${process.env.APP_URL}/api/activate/${activationLink}">Подтверждение активации</a>`,
    });
  }
}

export const mailService = new MailService();
