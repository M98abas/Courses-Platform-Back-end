import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import * as https from "https";
import sendingData from "../utils/sendingNot";
const prisma = new PrismaClient();

// Function to send notifications to all users based on the sendDate field in the Notification table
const sendNotificationsToAllUsers = async () => {
  try {
    // Fetch all pending notifications where the sendDate is less than or equal to the current date and time
    const currentDateTime: any = new Date();
    const pendingNotifications: any = await prisma.notification.findMany({
      where: {
        status: "Pending",
        sendDate: {
          lte: currentDateTime,
        },
      },
    });

    // Create a notification payload and update the notification status for each pending notification
    const notificationPromises = pendingNotifications.map(
      async (notification: any) => {
        const { id, title, message }: any = notification;

        // Fetch all FCM tokens for users from the database
        const users: any = await prisma.constractors.findMany({
          select: { TCM: true },
        });

        // Send the notification to each user's FCM token
        const sendPromises: any = users.map(async (user: any) => {
          if (user.TCM) {
            await sendingData(user.TCM, title, message);
          }
        });

        // Wait for all notifications to be sent to users
        await Promise.all(sendPromises);

        // Update the notification status to "Sent"
        await prisma.notification.update({
          where: { id },
          data: { status: "Sent" },
        });
      }
    );

    // Wait for all notifications to be sent and updated
    await Promise.all(notificationPromises);

    console.log("Notifications sent and status updated successfully.");
  } catch (error: any) {
    console.error("Error sending notifications:", error);
  }
};

// Schedule the task to run at the specific date and time (in this example, set to 8 AM every day)
cron.schedule("0 9 * * *", async () => {
  // Call the function to send notifications for pending notifications
  await sendNotificationsToAllUsers();
});
