const nodemailer = require("nodemailer");
const {CONSOLE_LOG} = require("../../logger/logger");

const sendEmailNotification = async (emailContent, configuration) => {
    let transporter = nodemailer.createTransport(configuration.notifications.email.transportsConfiguration);

    for (const recipient of configuration.notifications.email.recipients) {
        CONSOLE_LOG.info(`Sending email notification to recipient: ${recipient}`);
        let info = await transporter.sendMail({
            from: '"Bookkit Notifications 📚" <noreply@bookkit-notifier.com>',
            to: recipient,
            subject: `What's new in ${configuration.bookkit.name}`,
            html: emailContent
        });
        CONSOLE_LOG.info(`Email sent to ${recipient} - ID: ${info.messageId}`);
    }

}

module.exports = {
    sendEmailNotification
}