import { Request, Response } from "express";
import { errRes, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";

// Init prisma
const prisma = new PrismaClient();

export default class commonQuestionController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.commonQuestions.findMany({
where:{
active:true,
}
});
    if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
    console.log(data);

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
    const id: any = parseInt(req.params.id);

    const data: any = await prisma.commonQuestions.findUnique({
      where: {
        id,
      },
    });

    if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
  }
catch{
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
      const notValide: any = validate(body, Validation.commonQuestion());
console.log(notValide)
      if (notValide) return errRes(res, messageReturn("checkData"));

      // save data
      const data = await prisma.commonQuestions.create({
        data: {
          questionEn: body.questionEn,
          answerEN: body.answerEn,
          questionAR: body.questionAr,
          answerAR: body.answerAr,
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

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async update(req: Request, res: Response): Promise<object> {
    try {
      // Get body
      const body: any = req.body;
//console.log(body);
      // Get ID
      const id: any = parseInt(req.params.id);

      // Validate Data
      if (!id) return errRes(res, messageReturn("checkData"));

     
      const data: any = {};
      // List of fields to potentially update
      const fieldsToUpdate = [
        "questionEn",
        "answerEN",
        "questionAR",
        "answerAR",
      ];

      // Loop through the fields and add them to the data object if they exist in the request body
      fieldsToUpdate.forEach((field) => {
        if (body[field] !== "") {
//          console.log(body[field] !== "");
          data[field] = body[field];
        }
      });

      // Check if there's any data to update
      if (Object.keys(data).length === 0) {
        return errRes(res, "No data provided for update");
      }
      // Save data
      const dataUpdated: any = await prisma.commonQuestions.update({
        where: {
          id,
        },
        data:data,
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
  static async delete(req: Request, res: Response): Promise<object> {
    try {
      // Get ID
      const id: any = parseInt(req.params.id);

      // Validate Data
      if (!id) return errRes(res, messageReturn("checkData"));

      // Save data
      const data: any = await prisma.commonQuestions.update({
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
}
