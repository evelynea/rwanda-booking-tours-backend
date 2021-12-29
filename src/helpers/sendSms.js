import dotenv from "dotenv"

dotenv.config();

const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_ID
);

// Hey [name], your application has been acccepted. applicationId:22222

const sendSms = (userName, tourName, applicationStatus, applicationId, userPhone) => {
    client.messages.create({
        body: "Hey " + userName + " your " + tourName + " booking tour has been " + applicationStatus +
            " refId " + applicationId, 
            from: "+12072233239",
             to: userPhone
    }).then(message => console.log(message.sid))
    .done()
};

export default sendSms;