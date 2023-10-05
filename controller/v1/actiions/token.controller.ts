import { Request, Response } from "express";
import { errRes, makeid, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";

// Init prisma
const prisma = new PrismaClient();

export default class TokenController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.tokens.findMany({
      where: {
        active: true,
      },
      orderBy: [
        {
          id: "desc",
        },
      ],
      include: {
        course: {
          select: {
            titleAr: true,
          },
        },
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
    const token: any = req.params.token;

    const data: any = await prisma.tokens.findUnique({
      where: {
        token,
      },
    });

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

      // validate body
      const notValide: any = validate(body, Validation.token());
      console.log(notValide);
      if (notValide) return errRes(res, messageReturn("checkData"));

      // generate token
      const token = `XE-T${makeid()}`;
      console.log(token);

      // save data
      const data = await prisma.tokens.create({
        data: {
          token,
          subCoursesId: body.subCoursesId,
          expire_at: body.expire_at,
        },
      });
      //    console.log(data);

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
      console.log(id);

      // Get body || generate new one
      const body = req.body;

      // validate body
      const notValide: any = validate(body, Validation.token(false));
      if (notValide) return errRes(res, messageReturn("checkData"));

      // save data
      const data = await prisma.tokens.update({
        where: { id },
        data: {
          expire_at: body.expire_at,
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
  static async delete(req: Request, res: Response): Promise<object> {
    try {
      // Get Token
      const id: any = parseInt(req.params.id);

      // Validate Data
      if (!id) return errRes(res, messageReturn("checkData"));

      // Save data
      const data: any = await prisma.tokens.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });

      const token = await prisma.courseConstractor.updateMany({
        where: {
          id: data.courseConstractorId,
        },
        data: {
          active: false,
        },
      });

      return okRes(res, { data, token });
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
      const token: any = req.params.token;

      // Validate Data
      if (!token) return errRes(res, messageReturn("checkData"));

      // Save data
      const data: any = await prisma.tokens.update({
        where: {
          token,
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
