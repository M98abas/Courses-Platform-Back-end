import { errRes } from "../utils/util.services";
import * as jwt from "jsonwebtoken";
import CONFIG from "../config";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../utils/messages";
const prisma = new PrismaClient();

export default async (req: any, res: any, next: any) => {
  // get token
  const token = req.headers.token;
  // console.log(token);
  if (!token) return errRes(res, messageReturn("checkSendData"));

  // verfie token
  try {
    // get payload
    let payload: any;
    payload = jwt.verify(token, CONFIG.jwtUserLoginSecret);

    // Find the user and add to Request
    let user: any = await prisma.admin.findUnique({
      where: { email: payload.email },
    });
    if (!user) {
      user = await prisma.constractors.findUnique({
        where: { email: payload.email },
      });
      if (!user) return errRes(res, messageReturn("dataNotFound"));
    }
    // Add user data to request param
    req.user = user;
    return next();
  } catch (err) {
    return errRes(res, { msg: `The error in ${err}` });
  }
};
