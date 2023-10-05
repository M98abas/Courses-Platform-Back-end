// Import required modules
import cron from "node-cron";
import report from "./users.report";

// Schedule the task to run every day at 8 AM (local server time)
const task = cron.schedule(
  "0 8 * * *",
  () => {
    report()
      .then(() => {
        console.log("Daily report sent successfully");
      })
      .catch((error) => {
        console.error("Error sending daily report:", error);
      });
  },
  {
    scheduled: true,
    timezone: "Your_Timezone", // Replace with your desired timezone (e.g., 'America/New_York')
  }
);

// Start the cron job
task.start();
