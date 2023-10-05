import { Request, Response } from "express";
import { errRes, makeid, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";

// Init prisma
const prisma = new PrismaClient();

export default class AdsController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.ads.findMany({
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
    const id: any = parseInt(req.params.id);

    const data: any = await prisma.ads.findUnique({
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
  static async getComOne(req: Request, res: Response): Promise<object> {
    const query = req.params.query;
    const data: any = await prisma.ads.findFirst({
      where: {
        company: query,
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

      // validate body
      const notValide: any = validate(body, Validation.ads());
  console.log(notValide);

      if (notValide) return errRes(res, messageReturn("checkData"));

      // save data
      const data = await prisma.ads.create({
        data: {
          company: body.company,
          url: body.url,
          titleAr: body.titleAr,
          titleEn: body.titleEn,
          imgUrl: body.imgUrl,
          descriptionAr: body.descriptionAr,
          descriptionEn: body.descriptionEn,
          startFrom: body.startFrom,
          endAt: body.endAt,
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
      console.log(id);

      // Save data
      const data: any = await prisma.ads.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });

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

      // Get ID
      const id: any = parseInt(req.params.id);

      // Validate Data
      if (!id) return errRes(res, messageReturn("checkData"));
//	console.log(body);
      const data: any = {};
      // List of fields to potentially update
      const fieldsToUpdate = [
        "company",
        "url",
        "titleAr",
        "titleEn",
        "imgUrl",
        "descriptionAr",
        "descriptionEn",
        "startFrom",
        "endAt",
      ];

      // Loop through the fields and add them to the data object if they exist in the request body
      fieldsToUpdate.forEach((field) => {
        if (body[field] !== "") {
          console.log(body[field] !== "");

          data[field] = body[field];
        }
      });

      // Check if there's any data to update
      if (Object.keys(data).length === 0) {
        return errRes(res, "No data provided for update");
      }

      // Save data
      const dataUpdated: any = await prisma.ads.update({
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
      const data: any = await prisma.ads.update({
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
