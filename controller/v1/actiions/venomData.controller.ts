import { Request, Response } from "express";
import { errRes, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";

// Init prisma
const prisma = new PrismaClient();

export default class VenomController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async latestDetails(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.venomData.findFirst({
      where: {
        active: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    if (data == null) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.venomData.findMany({
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
    const id: any = req.params.id;
    const data: any = await prisma.venomData.findFirst({
      where: {
        id,
      },
    });

    if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data });
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
      const notValide: any = validate(body, Validation.venom());
      if (notValide) return errRes(res, messageReturn("checkData"));

      // save data
      const data = await prisma.venomData.create({
        data: {
          traders: body.traders,
          users: body.users,
          toper: body.toper,
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
      // Get body || generate new one
      const id: any = parseInt(req.params.id);
      const body = req.body;

      // validate body
      const notValide: any = validate(body, Validation.venom(false));
      if (notValide) return errRes(res, messageReturn("checkData"));

      // save data
      const data: any = {};

      // List of fields to potentially update
      const fieldsToUpdate = ["traders", "users", "toper"];

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

      // save data
      const dataUpdated = await prisma.venomData.update({
        where: {
          id,
        },
        data: data,
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
      const data: any = await prisma.venomData.update({
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
      const data: any = await prisma.venomData.update({
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
