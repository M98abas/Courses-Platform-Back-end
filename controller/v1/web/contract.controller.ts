import { Request, Response } from "express";
import { errRes, makeid, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";
import sendEmail from "../../../utils/SendEmail";
import CONFIG from "../../../config";

// Init prisma
const prisma = new PrismaClient();

export default class ContentController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.contract.findMany({
      where: {
        active: true,
      },
      include: {
        constractor: true,
        Copon: true,
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

    const data: any = await prisma.contract.findUnique({
      where: {
        id,
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
  static async add(req: any, res: any): Promise<object> {
    try {
      // Get body || generate new one
      const body = req.body;

      // Get user
      const user = body.user;

      var copons: any = body.copons
        ? await prisma.copon.findUnique({ where: { text: body.copon } })
        : 0;
      // validate body
      const notValide: any = validate(body, Validation.contract());
      if (notValide) return errRes(res, messageReturn("checkData"));

      // Copons
      if (copons.target != "contract") copons = 0;
      else
        await prisma.copon.update({
          where: {
            id: copons.id,
          },
          data: {
            availableFor: {
              decrement: 1,
            },
          },
        });

      // save data
      const data = await prisma.contract.create({
        data: {
          amount: body.amount,
          coponId: copons.id ?? 0,
          constractorId: user.id,
          service: body.service,
          serviceTitle: body.serviceTitle,
        },
      });
      const coponData: any = await prisma.copon.findUnique({
        where: {
          text: copons,
        },
      });
      if (coponData && coponData.availableFor != 0) {
        await prisma.copon.update({
          where: {
            id: coponData.id,
          },
          data: {
            availableFor: {
              decrement: 1,
            },
          },
        });
      } else
        await prisma.copon.update({
          where: {
            id: coponData.id,
          },
          data: {
            active: false,
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
      const data: any = await prisma.contract.update({
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
  static async makeDecision(req: Request, res: Response): Promise<object> {
    try {
      // get body
      const body = req.body;

      // Get Token
      const id: any = parseInt(req.params.id);
      // Validate Data
      if (!id) return errRes(res, messageReturn("checkData"));

      // Save data
      const data: any = await prisma.contract.update({
        where: {
          id,
        },
        data: {
          decision: body.decision,
        },
      });
      if (body.decision)
        sendEmail("Congraculations", CONFIG.sendingEmailTo, "Xenon - Radon Contract");
      else sendEmail("Sorry", CONFIG.sendingEmailTo, "Xenon - Radon Contract");
      return okRes(
        res,
        `The ${data.title} Token has been Deactivated successfully.`
      );
    } catch {
      return errRes(res, messageReturn("wentWrong"));
    }
  }
}
