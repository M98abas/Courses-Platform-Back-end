import { Request, Response } from "express";
import { errRes,getOtp, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import bcrypt from "bcrypt";
import CONFIG from "../../../config";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";
// import sendEmail from "../../../utils/SendEmail";
import { sendEmail } from "../../../utils/emailSending/sender";

const prisma = new PrismaClient();

export default class AdminController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.admin.findMany({
      where: {
        active: true,
      },
    });

    if (data.length === 0)
      return errRes(res, { msg: "Sorry! There is no data" });
    return okRes(res, data, 200);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getOne(req: Request, res: Response): Promise<object> {
    const email: any = req.headers.email;
    const id: any = parseInt(req.params.id);
    const data: any = await prisma.admin.findMany({
      where: {
        id,
        email,
      },
    });

    if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, data, 200);
  }
 /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async otpCheck(req: Request, res: Response): Promise<object> {
    try {
      // get body
      const body = req.body;
      console.log(body);

      // validate body
      const notValide = validate(body, Validation.otpAdmin());
      if (notValide)
        return errRes(res, "Kindly double check with the value that you enter");

      // Get the user from DB
      let user: any = await prisma.admin.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!user) return errRes(res, { error: "Email is not exist!!!" });
    if (body.otp != user.otp) {

        const otp = getOtp();
        // console.log(otp);
        await prisma.admin.update({
          where: {
            id: user.id,
          },
          data: {
            otp,
          },
        });

        sendEmail(`The OTP is : ${otp}`, body.email, "OTP validation");
        return errRes(res, { errMsg: "OTP is not equlas" });
      }
 
      // create the Token
      let token = jwt.sign({ email: body.email }, CONFIG.jwtUserSecret);
//       let token = jwt.sign({ email: body.email }, CONFIG.jwtUserSecret);
      return okRes(res, { token, verified: user.verified });
    } catch (err) {
      return errRes(res, `Something went wrong ${err}`);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async register(req: Request, res: Response): Promise<object> {
    try {
      // get body
      const body: any = req.body;

      // Body validation
      const notValide = validate(body, Validation.adminRegister());
      if (notValide) return errRes(res, { msg: "Sorry! There is no data" });

      // check if the password is less than 8 characters
      if (body.password.length <= 7)
        return errRes(res, {
          msg: "Password Is to weak, Kindly make it stronger.",
        });
      // create Salt
      const salt: any = await bcrypt.genSalt(12);
      // Encrypt Password
      const password: any = await bcrypt.hash(body.password, salt);
      body.password = password;

      // check if the user already exists
      let user: any = await prisma.admin.findUnique({
        where: { email: body.email },
      });
      if (user) {
        return errRes(res, messageReturn("emailExist"));
      } else {
        user = await prisma.admin.create({
          data: {
            name: body.name,
            email: body.email,
            password: body.password,
          },
        });
      }
      // Return Response if Done
      return okRes(res, {
        user,
      });
    } catch (err) {
      return errRes(res, `Something went wrong, ${err}`);
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async login(req: Request, res: Response): Promise<object> {
 //   try {
      // get body
      const body = req.body;
console.log(body)
      // validate body
      const notValide = validate(body, Validation.login());
  console.log(notValide)      
if (notValide)
        return errRes(res,{errMsg:"Kindly double check with the value that you enter"});

      // Get the user from DB
      let user: any = await prisma.admin.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!user) return errRes(res, { errMsg: "Email is not exist!!!" });

      // compare password
      let valide = await bcrypt.compare(body.password, user.password);
      if (!valide) return errRes(res, "Password is wronge, Kindly try again.");
      const otp = getOtp();

await prisma.admin.update({
        where: {
          email: body.email,
        },data:{
otp,
}
      });
      sendEmail(`The OTP is : ${otp}`, body.email, "OTP validation");
      
return okRes(res, {
        msg: "OTP has been sent through an email",
        verified: user.verified,
      });

      // create the Token
   //   let token = jwt.sign({ email: body.email }, CONFIG.jwtUserSecret);
      return okRes(res, { msg:"OTP has been sent to you", verified: user.verified });
  //  } catch (err) {
    //  return errRes(res, `Something went wrong ${err}`);
//    }
  }
  /**
   *
   * @param req
   * @param res
   * @param
   */
  static async update(req: any, res: any): Promise<object> {
    try {
      // get body data
      const body = req.body;
      const id = parseInt(req.user.id);
      // validate data
      const notValide = validate(body, Validation.adminRegister(false));
      if (notValide) return errRes(res, { msg: "Data not valid" });
      // update data
      const data: any = await prisma.admin.update({
        where: { id },
        data: {
          name: body.name,
          email: body.email,
        },
      });
      return errRes(res, { data });
    } catch (err) {
      return errRes(res, `Something went wrong ${err}`);
    }
  }
  /**
   *
   * @param req
   * @param res
   * @param
   */
  static async activate(req: any, res: any): Promise<object> {
    try {
      // get body data
      const body = req.body;
      const id = parseInt(req.user.id);

      // validate data
      const notValide = validate(body, Validation.adminRegister(false));
      if (notValide) return errRes(res, { msg: "Data not valid" });
      // update data
      const data: any = await prisma.admin.update({
        where: { id },
        data: {
          active: body.active,
        },
      });
      return errRes(res, { data });
    } catch (err) {
      return errRes(res, `Something went wrong ${err}`);
    }
  }
}
