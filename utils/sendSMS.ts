import axios from "axios";
import CONFIG from "../config";

// const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${CONFIG.accountSid}/Messages.json`;

const client = require("twilio")(CONFIG.accountSid, CONFIG.authToken);

const sendSMS = async (messageText: string, to: string) => {
  try {
    await client.messages
      .create({
        from: "your_twilio_phone_number",
        body: messageText,
        to,
      })
      .then((message: any) => console.log(message.body));

    return "Done";
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to handle it further if needed
  }
};

export default sendSMS;
