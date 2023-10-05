import { Request, Response } from "express";
import {generateNickname, errRes, getOtp, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import bcrypt from "bcrypt";
import CONFIG from "../../../config";
import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import emailSend from "../../../utils/SendEmail";
import * as admin from "firebase-admin";
import messageReturn from "../../../utils/messages";

import {
  sendEmail,
  congratulationEmail,
  alertEmail,
} from "../../../utils/emailSending/sender";
import sendSMS from "../../../utils/sendSMS";

const prisma = new PrismaClient();

export default class UserController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.constractors.findMany({
orderBy:[{
created_at:'desc'
}]
});
    if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
  }


  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getOne(req: any, res: any): Promise<object> {
//    const id = req.params.id;
try{
    const id: any = req.param.id || req.user.id;

    let data: any;
    if (id)
      data = await prisma.constractors.findUnique({
        where: {
          id,
        },
        include: {
          course_constractor: {
            include: {
              subCourse: true,
            },
},
          contract: true,
        },
      });
//    console.log(data);

    if (!data) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
  }catch{
      return errRes(res, messageReturn("wentWrong"));

}
}
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getSpacificOne(req: any, res: any): Promise<object> {
try{    
const email = req.user.email;
 console.log(req.user);
    let data: any;
    if (email)
      data = await prisma.constractors.findUnique({
        where: {
          email,
        },
      });
 //   console.log(data);

    if (!data) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
  }catch(err){
	console.error(err)
return errRes(res, messageReturn("wentWrong"));
}

}

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getCheck(req: any, res: any): Promise<object> {
    const check = req.user.check;

    let data: any;
    if (data)
      data = await prisma.constractors.findUnique({
        where: {
          nickName: check,
        },
      });

    if (!data) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getConOne(req: Request, res: Response): Promise<object> {
    const user: any = req.params.user;
    let data: any;
    data = await prisma.constractors.findFirst({
      where: {
        OR: [
          { email: { contains: user } },
          { nickName: { contains: user } },
          { name: { contains: user } },
        ],
      },
    });

    if (!data) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
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
      let body = req.body;
console.log(body);
      const otp: any = getOtp();
      const smsOtp: any = getOtp();
      // Body validation
      const notValide = validate(body, Validation.userRegister());
console.log(notValide)
      if (notValide) return errRes(res, messageReturn("checkData"));

      // check if the password is less than 8 characters
      if (body.password.length <= 7)
        return errRes(res, messageReturn("weakPassword"));
      // create Salt
      const salt: any = await bcrypt.genSalt(12);
      // Encrypt Password
      const password: any = await bcrypt.hash(body.password, salt);
      body.password = password;
      let refererCode: any = "";
      if (body.refererCode && body.refererCode != "")
        // add referer Points
        refererCode = await prisma.constractors.update({
          where: {
            nickName: body.refererCode,
          },
          data: {
            referingPoints: {
              increment: 10,
            },
          },
        });
      refererCode = refererCode.length != 0 ? refererCode.nickName : "";
      // check if the user already exists
      let users: any = await prisma.constractors.findUnique({
        where: { email: body.email },
      });

      const nickName = generateNickname(`${body.name}213`);

      if (users) {
        return errRes(res, messageReturn("emailExist"));
      } else {
        users = await prisma.constractors.create({
          data: {
            name: body.name,
            email: body.email,
            password: body.password,
            phoneNumber: body.phoneNumber,
            gender: body.gender,
            imageUrl: body.imgUrl,
            dateOfBirth: body.dateOfBirth,
            TCM:body.TCM,
            nickName,
            phoneId: body.phoneId,
            contactWith: body.contactWith,
            contry: body.contry,
            levelOfExperience: body.levelOfExperience,
            city: body.city,
            language: body.language,
            refererCode,
            otp,
            smsOtp,
          },
        });
       }

try{
      sendEmail(`OTP is ${otp}`, users.email, "XEneon OTP");
}catch(err) {
      console.error("Error retrieving data:", err);
}    

try{
  sendSMS(`Your OTP is ${smsOtp}`, users.phoneNumber);
      emailSend(
        `This person ${users.email} Register successfully,`,
        "hussoss96@gmail.com",
        "Xenon - New Registration"
      );}
catch(err) {
      console.error("Error retrieving data:", err);
}

      // make up .userRegister
      let token = jwt.sign({ email: body.email }, CONFIG.jwtUserSecret);

      // Return Response if Done
      return okRes(res, {
        token,
      });
  } catch (err) {
   return errRes(res, messageReturn("wentWrong"));
    }
  }

/**
   * @param req
   * @param res
   * @returns
   */
  static async validateEmailOtp(req: any, res: any): Promise<object> {
    try {
      // get OTP && User
      const body: any = req.body;
      const user: any = req.user;

      // validate otp
      const notValided = validate(body, Validation.otp());
      if (notValided) return errRes(res, messageReturn("checkData"));
      console.log(user.otp !== parseInt(body.otp));

      if (user.otp !== parseInt(body.otp)) {
        // generate new  otp and save it
        const newOtp: any = getOtp();

        // update OTP in user account
        await prisma.constractors.update({
          where: {
            email: user.email,
          },
          data: {
            otp: newOtp,
          },
        });
        // Send New OTP
        sendEmail(`Your OTP is ${newOtp}`, user, "XEneon OTP");

        // Send Email Admin
        emailSend(`This user : ${user.email} is new Login`, user, "XEneon OTP");

        return errRes(res, messageReturn("OtpWrongMsg"));
      } else if (user.isVerfy)
        return okRes(res, messageReturn("success"));

      // update to verify
      await prisma.constractors.update({
        where: {
          email: user.email,
        },
        data: {
         isVerfy: true,
        },
      });

      // Configure Firebase Admin SDK with your credentials
      admin.initializeApp({
        credential: admin.credential.cert(
          "path/to/your/serviceAccountKey.json"
        ),
      });

      // Create the notification payload
      const notificationPayload: admin.messaging.MessagingPayload = {
        notification: {
          title: "Notification Title", // Replace with your desired title
          body: "Xeneon - Congratulation",
        },
      };

      // Send the notification to each user's FCM token
      const sendPromises: any = async () => {
        await admin.messaging().sendToDevice(user.phoneId, notificationPayload);
      };

      // Wait for all notifications to be sent to users
      await Promise.all(sendPromises);

      // semd email for user
      congratulationEmail(user.email, user.email, "Xeneon - Congratulation");
      return okRes(res, { msg: messageReturn("verfiedSuccess") });
    } catch (err) {
      return errRes(res, messageReturn("wentWrong"));
    }
  }


  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async validateSMSOtp(req: any, res: any): Promise<object> {
    try {
      // get OTP && User
      const body: any = req.body;
      const user: any = req.user;

      // validate otp
      const notValided = validate(body, Validation.otp());
      if (notValided) return errRes(res, messageReturn("checkData"));
//user.smsOtp !== parseInt(body.otp)
//console.log(user.smsOtp, parseInt(body.otp))
      if (user.smsOtp !== parseInt(body.otp)) {
        // generate new  otp and save it
        const newOtp: any = getOtp();

        // update OTP in user account
        await prisma.constractors.update({
          where: {
            email: user.email,
          },
          data: {
            smsOtp: newOtp,
          },
        });
        // Send New OTP
        sendSMS(`Your OTP is ${newOtp}`, user);

        // Send Email Admin
        emailSend(`This user : ${user.email} is new Login`, user, "XEneon OTP")

        return errRes(res, messageReturn("OtpWrongMsg"));
      } else if (user.isDoubleVerfy) return okRes(res, messageReturn("success"));
      // update to verify
      await prisma.constractors.update({
        where: {
          email: user.email,
        },
        data: {
          isDoubleVerfy: true,
        },
      });

      // semd email for user
      congratulationEmail(user.email, user.email, "Xeneon - Congratulation");
      return okRes(res, { msg: messageReturn("verfiedSuccess") });
    } catch (err) {
     return errRes(res, messageReturn("wentWrong"));
    }
  }

 
 /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async sendOtpSMSForUsers(req: Request, res: Response): Promise<object> {
    // get body -> email
    const email: any = req.body.email;
	
    // search for it
    const data = await prisma.constractors.findUnique({
      where: {
        email,
      },
    });
// console.log(data);
    if (!data)
      // 1 -> send error
      return errRes(res, {
        ar: `لا يوجد ايميل`,
        en: "The email is not found double check the email or contact the tech team",
      });

    // 0 -> send OTP
    // generate new  otp and save it
    const newOtp: any = getOtp();

    await prisma.constractors.update({
      where: {
        email,
      },
      data: {
        smsOtp: newOtp,
      },
    });
// Send New OTP
        sendSMS(`Your otp is:${newOtp}`, data.phoneNumber);

    return okRes(res, messageReturn("success"));
  }

    /**
   *
   * @param req
   * @param res
   * @returns
   */
    static async validateOtp(req: any, res: any): Promise<object> {
      try {
        // get OTP && User
        const body: any = req.body;
  
        // validate otp
        const notValided = validate(body, Validation.OTPChecking());
//console.log(notValided)
        if (notValided) return errRes(res, messageReturn("checkData"));
        const data:any = await prisma.constractors.findUnique({
          where:{
            email: body.email
          }
        })
//console.log(data.otp, parseInt(body.otp))
        if (data.otp !== parseInt(body.otp)) {
          // generate new  otp and save it
          const newOtp: any = getOtp();
  
          // update OTP in user account
          await prisma.constractors.update({
            where: {
              email: data.email,
            },
            data: {
              smsOtp: newOtp,
            },
          });

          sendEmail(`${newOtp}`, data.email, "XEneon OTP");
  
        // Send Email Admin
//          emailSend(`This user : ${data.email} is new Login`, data.email, "XEneon OTP");
  
          return errRes(res, messageReturn("OtpWrongMsg"));
        } 


        return okRes(res, { msg: messageReturn("success") });
      } catch (err) {
        return errRes(res, messageReturn("wentWrong"));
      }
    }
    

/**
 * @param req
   * @param res
   * @returns
   */
  static async login(req: Request, res: Response): Promise<object> {
   try {
      // get body
      const body = req.body;

      // validate body
      const notValide = validate(body, Validation.login());
      if (notValide) return errRes(res, messageReturn("checkData"));
      console.log(body);

      // Get the user from DB
      let user: any = await prisma.constractors.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!user) return errRes(res, messageReturn("notFound"));
//if(body.phoneId != user.phoneId) return errRes(res, messageReturn("notFound"));

      // compare password	
      let valide = await bcrypt.compare(body.password, user.password);
      if (!valide) return errRes(res, messageReturn("passwordWrong"));

      // Check if the user is active or not
      if (!user.active) return errRes(res, messageReturn("accountNotActive"));

      // update data in DB
      user = await prisma.constractors.update({
        where: { email: user.email },
        data: {
          isVerfy: true,
        },
      });

      // create the Token
      let token = jwt.sign({ email: body.email }, CONFIG.jwtUserLoginSecret);
      return okRes(res, { token, isDoubleVerfy: user.isDoubleVerfy });
 
   } catch (err) {
      return errRes(res, messageReturn("wentWrong"));
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async sendOtpForUsers(req: Request, res: Response): Promise<object> {
    // get body -> email
    const email: any = req.body.email;

    // search for it
    const data = await prisma.constractors.findUnique({
      where: {
        email,
      },
    });
    if (!data)
      // 1 -> send error
      return errRes(res, {
        ar: `لا يوجد ايميل`,
        en: "The email is not found double check the email or contact the tech team",
      });

    // 0 -> send OTP
    // generate new  otp and save it
    const newOtp: any = getOtp();

    await prisma.constractors.update({
      where: {
        email,
      },
      data: {
        otp: newOtp,
      },
    });
    sendEmail(`Your OTP is ${newOtp}`, data.email, "XEneon OTP");
    return okRes(res, messageReturn("success"));
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async changePassword(req: Request, res: Response): Promise<object> {
    // get body
    const body = req.body;
    // validate Email
    const notValide = validate(body, Validation.login());
console.log(notValide);  
  if (notValide) return errRes(res, messageReturn("checkData"));

    // encrpt new password
    // create Salt
    const salt: any = await bcrypt.genSalt(12);
    // Encrypt Password
    const password: any = await bcrypt.hash(body.password, salt);
    body.password = password;

    // save new one
    const data = await prisma.constractors.update({
      where: {
        email: body.email,
      },
      data: {
        password,
      },
    });

    congratulationEmail(
      "Dear you your account password <br/> if this activity is not you kindly contact the support",
      data.email,
      "Xenon - Change password successfuly"
    );

    if (!data) return errRes(res, messageReturn("wentWrong"));
    return okRes(res, messageReturn("success"));
  }

  /**
   *
   * @param req
   * @param res
   * @param
   */
  static async update(req: Request, res: Response): Promise<object> {
    try {
      // get body data
      const body = req.body;
      console.log(body);
      const id = req.params.id;
      // validate data
      const notValide = validate(body, Validation.userRegister(false));
      if (notValide) return errRes(res, messageReturn("checkData"));
      // update data
      const data: any = {};
      // List of fields to potentially update
      const fieldsToUpdate = [
"isVerfy",
"isDoubleVerfy",
        "name",
        "email",
        "password",
        "language",
        "brokerage_firm_name",
        "subsribtion_email",
        "imageUrl",
"radonName"
      ];

      // Loop through the fields and add them to the data object if they exist in the request body
      fieldsToUpdate.forEach((field) => {
        if (body[field] !== "") {
          data[field] = body[field];
        }
      });

      // Check if there's any data to update
      if (Object.keys(data).length === 0) {
        return errRes(res, "No data provided for update");
      }

      const dataUpdated: any = await prisma.constractors.update({
        where: { id },
        data: data,
      });
      return okRes(res, { data: dataUpdated });
    } catch (err) {
      return errRes(res, messageReturn("wentWrong"));
    }
  }


  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async blockAccount(req: any, res: any): Promise<object> {
    const user = req.user;
    await prisma.constractors.update({
      where: {
        id: user.id,
      },
      data: {
        active: false,
      },
    });
    sendEmail(
      `This user ${user.name} - ${user.email} - has been blocked due to Violance from his side`,
      "hussoss95@gmail.com",
      "Block user - Xeenon App"
    );
    return okRes(res, {
      msg: "Dear the account had been blocked Successfully",
    });
  }
  /**
   *
   * @param req
   * @param res
   * @param
   */
  static async delete(req: Request, res: Response): Promise<object> {
    try {
      // Get Id
      const id = req.params.id;
      // update data
      const data: any = await prisma.constractors.update({
        where: { id },
        data: {
          active: false,
        },
      });
      // Send Email to user
     

      // Send Email to Admin
      sendEmail(
        `This user ${data.email} you are attempting to delete his account`,
        "admin.account@test.com",
        "Xeneon - Delete Action"
      );

      // Return The response
      return errRes(res, { errMsg:"there some issue appearing" });
    } catch (err) {
      return errRes(res, messageReturn("wentWrong"));
   }
  }
  /**
   *
   * @param req
   * @param res
   * @param
   */
  static async activate(req: Request, res: Response): Promise<object> {
   // try {
      // get body data
      const body = req.body;
      const id = req.params.id;
console.log(id);
      
// validate data
  //    const notValide = validate(body, Validation.userRegister(false));
//      if (notValide) return errRes(res, messageReturn("checkData"));
      // update data
      const data: any = await prisma.constractors.update({
        where: { id },
        data: {
          active: true,
          isVerfy:true,
        },
      });

      congratulationEmail(
        "Dear your account is activated",
        data.email,
        "Xenon - Account Activated"
      );
      return okRes(res, { data });
   // } catch (err) {
   ///   return errRes(res, messageReturn("wentWrong"));
   // }
  }
}
