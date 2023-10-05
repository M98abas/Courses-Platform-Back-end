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
  static async getAll(req: Request, res: Response): Promise<object> {
    try {
      const data: any = await prisma.feedback.findMany({
        where: {
          active: true,
        },
        include: {
          Course: true,
        },
      });
      // console.log(data);

      if (data.length == 0) return errRes(res, messageReturn("dataNotFound"));
      return okRes(res, { data }, 200);
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
  static async getOne(req: Request, res: Response): Promise<object> {
    try {
      const id: any = parseInt(req.params.id);

      const data: any = await prisma.feedback.findUnique({
        where: {
          id,
        },
      });
      // console.log(data);

      if (!data) return errRes(res, messageReturn("dataNotFound"));
      return okRes(res, { data }, 200);
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
  static async getCourseOne(req: Request, res: Response): Promise<object> {
    try {
      const id: any = parseInt(req.params.id);

      const data: any = await prisma.feedback.findMany({
        where: {
          courseId: id,
        },
      });
      // console.log(data);

      if (!data) return errRes(res, messageReturn("dataNotFound"));
      return okRes(res, { data }, 200);
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
  static async getTargetOne(req: Request, res: Response): Promise<object> {
    try {
      const target: any = req.params.target;

      const data: any = await prisma.feedback.findMany({
        where: {
          target,
        },
      });

      if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
      return okRes(res, { data }, 200);
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
  static async add(req: Request, res: Response): Promise<object> {
    try {
      // Get body || generate new one
      const body = req.body;
      //console.log(body);
      // validate body
      const notValide: any = validate(body, Validation.feedback());
      //console.log(notValide);

      if (notValide) return errRes(res, messageReturn("checkData"));
      var data: any;
      if (body.courseId)
        // save data
        data = await prisma.feedback.create({
          data: {
            title: body.title,
            isAudio: body.isAudio,
            isCertificate: body.isCertificate,
            target: body.target,
            courseId: parseInt(body.courseId) ?? null,
            url: body.URL,
          },
        });
      else
        data = await prisma.feedback.create({
          data: {
            title: body.title,
            isAudio: body.isAudio,
            isCertificate: body.isCertificate,
            target: body.target,
            url: body.URL,
          },
        });
      // if 0
      if (!data) return errRes(res, messageReturn("wentWrong"));

      // 1
      return okRes(res, messageReturn("success"));
    } catch (err) {
      console.log(err);
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
      console.log(id);

      // Validate Data
      if (!id) return errRes(res, messageReturn("checkData"));
      //console.log(id)
      // Save data
      const data: any = await prisma.feedback.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });
      console.log(data);

      return okRes(
        res,
        `The ${data.title} Token has been Deactivated successfully.`
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
  static async update(req: Request, res: Response): Promise<object> {
    try {
      // Get body
      const body: any = req.body;
      console.log(body);
      // Get ID
      const id: any = parseInt(req.params.id);

      // Validate Data
      if (!id) return errRes(res, messageReturn("checkData"));

      const data: any = {};

      // List of fields to potentially update
      const fieldsToUpdate = ["title", "target"];

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
      const dataUpdated: any = await prisma.feedback.update({
        where: {
          id,
        },
        data: data,
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
  static async active(req: Request, res: Response): Promise<object> {
    try {
      // Get Token
      const id: any = parseInt(req.params.id);

      // Validate Data
      if (!id) return errRes(res, messageReturn("checkData"));

      // Save data
      const data: any = await prisma.feedback.update({
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
}
