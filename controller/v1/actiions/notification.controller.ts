import { Request, Response } from "express";
import { errRes, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";

// Init prisma
const prisma = new PrismaClient();

export default class FeedbackController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getSuccess(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.notification.findMany({
      where: {
        OR: [
          {
            status: "sent",
          },
          {
            status: "Sent DM",
          },
        ],
      },
    });

    //console.log(data);

    if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.notification.findMany({
      where: {
        dm: false,
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
  static async getAllDm(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.notification.findMany({
      where: {
        dm: true,
        active: true,
      },
    });

    console.log(data.length);
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
    const id: any = parseInt(req.params.id);
    // Tes
    const data: any = await prisma.notification.findUnique({
      where: {
        id,
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
  static async add(req: Request, res: Response): Promise<object> {
    try {
      // Get body || generate new one
      const body = req.body;
      console.log(body);

      // validate body
      const notValide: any = validate(body, Validation.notification());
      if (notValide) return errRes(res, messageReturn("checkData"));

      // save data
      const data = await prisma.notification.create({
        data: {
          title: body.title,
          message: body.message,
          target: body.target,
          sendDate: body.sendDate,
          dm: false,
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
  static async update(req: Request, res: Response): Promise<object> {
    try {
      // Get body
      const body: any = req.body;

      // Get ID
      const id: any = parseInt(req.params.id);

      // Validate Data
      if (!id) return errRes(res, messageReturn("checkData"));

      const data: any = {};

      // List of fields to potentially update
      const fieldsToUpdate = ["title", "message", "target"];

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

      // Save data
      const dataUpdated: any = await prisma.notification.update({
        where: {
          id,
        },
        data: data,
      });

      //      console.log(data);

      return okRes(res, { data: dataUpdated });
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
      const data: any = await prisma.notification.update({
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
