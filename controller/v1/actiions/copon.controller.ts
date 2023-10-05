import { Request, Response } from "express";
import { errRes,  okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";
import sendingData from "../../../utils/sendingNot";


// Init prisma
const prisma = new PrismaClient();

export default class CoponController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.copon.findMany({
      where: {
        active: true,
      },
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
  static async getOne(req: Request, res: Response): Promise<object> {
 try{
    const coponValue: any = req.params.copon;
//  console.log(coponValue  != '' );
if (coponValue == '') return errRes(res, messageReturn("dataNotFound"))
 // console.log(coponValue);
  const data: any = await prisma.copon.findFirst({
      where: {
        text: coponValue,
        active: true,
        availableFor: {
          not: 0,
        },
      },
    });
//console.log(data);
    if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data });
  }catch(err){
//console.log(err);
	return errRes(res, messageReturn("wentWrong"));
}
}

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async add(req: Request, res: Response): Promise<object> {
    try {
      // Get body || generate new one
      const body = req.body;

      // validate body
      const notValide: any = validate(body, Validation.copon());
      if (notValide) return errRes(res, messageReturn("checkData"));

      // save data
      const data = await prisma.copon.create({
        data: {
          text: body.text,
          percentage: body.percentage,
          availableFor: body.availableFor,
          target: body.target,
          constValue: body.constValue,
        },
      });

      // if 0
      if (!data) return errRes(res, messageReturn("wentWrong"));
      // 1
      return okRes(res, messageReturn("success"));
    } catch {
      return errRes(res, messageReturn("wentWrong"));
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async delete(req: Request, res: Response): Promise<object> {
    try {
      // Get Token
      const id: any = parseInt(req.params.id);

      // Validate Data
      if (!id) return errRes(res, messageReturn("checkData"));

      // Save data
      const data: any = await prisma.copon.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });

      return okRes(res, { data });
    } catch {
      return errRes(res, messageReturn("wentWrong"));
    }
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async active(req: Request, res: Response): Promise<object> {
    try {
      // Get Token
      const id: any = parseInt(req.params.id);

      // Validate Data
      if (!id) return errRes(res, messageReturn("checkData"));

      // Save data
      const data: any = await prisma.copon.update({
        where: {
          id,
        },
        data: {
          active: true,
        },
      });

      return okRes(
        res,
        `The ${data.title} Token has been activated successfully.`
      );
    } catch {
      return errRes(res, messageReturn("wentWrong"));
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async sendSMS(req: Request, res: Response): Promise<object> {
//try{
// Get body || generate new one
 const { title, message } = req.body;
    
    // Validate data
    if (!title || !message) {
      return res.status(400).json({ error: 'Invalid data. Both title and message are required.' });
    }
    
    // Fetch users
    const users: any = await prisma.constractors.findMany({
where:{
isVerfy:true,
isDoubleVerfy:true,
},
});
//console.log(users);


const data = await prisma.notification.create({
data:{
title,message,target:"all",
status:"DM",dm:true,sendDate:new Date().toISOString()
}})
    users.map(async(user:any)=>{
if(user.TCM)
//console.log(user.TCM);
	await sendingData(user.TCM,title,message)
})

    // Wait for all notifications to be sent to users
//    await Promise.all(sendPromises);

    // Update notification status
    await prisma.notification.update({
      where: { id: data.id }, // Ensure `data` is defined
      data: {
        status: 'Sent DM',
        sendDate: new Date().toISOString(),
      },
    });

    return res.status(200).json({ msg: 'Messages sent successfully' });
   // } catch {
    //  return errRes(res, messageReturn("wentWrong"));
  //  }
  }
}
