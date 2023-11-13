import Config from "../configs.json" assert { type: "json" };
import nodemailer from "nodemailer";

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: Config.nodemailer.user,
                pass: Config.nodemailer.pass
            }
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: 'Setting for you',
            to,
            subject: 'Activation account USOF',
            text: '',
            html:
                `
                    <div>
                        <h1>Activation link</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        });
    }
}

export default new MailService();