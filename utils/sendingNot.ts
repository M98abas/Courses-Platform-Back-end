import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const fcmUrl = "https://fcm.googleapis.com/fcm/send";

const headers = {
  Authorization: `Bearer ${process.env.TOKEN}`,
  "Content-Type": "application/json",
};

const sendingData = (fcmId: any, title: string, bodyMessage: string) => {
  const data = {
    to: fcmId,
    notification: {
      title,
      body: bodyMessage,
      sound: "default",
    },
  };

  axios
    .post(fcmUrl, data, { headers })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default sendingData;
