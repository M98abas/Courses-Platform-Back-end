import { Request, Response } from "express";
import { errRes, makeid, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";

// Init prisma
const prisma = new PrismaClient();

export default class VisistorsController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getCalculation(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.visitor.count();
    console.log(data);

    if (data.length == 0) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
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
      //  console.log(body);
      // validate body
      const notValide: any = validate(body, Validation.visitor());
      // console.log(notValide);

      if (notValide) return errRes(res, messageReturn("checkData"));

      // save data
      const data = await prisma.visitor.create({
        data: {
          mobileID: body.mobileID,
        },
      });

      console.log(body);
      // if 0
      if (!data) return errRes(res, messageReturn("wentWrong"));
      // 1
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
  static async update(req: Request, res: Response): Promise<object> {
    try {
      // get Id
      const id: any = parseInt(req.params.id);

      // Get body || generate new one
      const body = req.body;

      // validate body
      const notValide: any = validate(body, Validation.visitor(false));
      if (notValide) return errRes(res, messageReturn("checkData"));

      // save data
      const data = await prisma.visitor.update({
        where: {
          mobileID: id,
        },
        data: {
          exitTime: body.exitTime,
        },
      });
      // if 0
      if (!data) return errRes(res, messageReturn("wentWrong"));
      // 1
      return okRes(res, { data });
    } catch {
      return errRes(res, messageReturn("wentWrong"));
    }
  }
}
