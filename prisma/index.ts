import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import mainRouter from "../routes/mainRoutes";
import handleHttpError from "../middleware/handleAPiError";
// Call dotEnv to deal with it
dotenv.config();
// init prisma client
const prisma = new PrismaClient();

async function main() {
  const app: any = express();
  const port: any = process.env.PORT;

  // Add cors middleware
  app.use(cors());

  // request Obj as JSON
  app.use(express.json());

  app.use("/v1", mainRouter);
  // Handle error
  app.use(handleHttpError);


  app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
