import { Request, Response } from "express";
import { errRes, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";

const prisma = new PrismaClient();

export default class DiscountController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.discount.findMany({
      where: {
        active: true,
        end_at: {
          not: {
            lte: new Date(),
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
    const id = parseInt(req.params.id);
    const data: any = await prisma.discount.findMany({
      where: {
        id,
        active: true,
        NOT: {
          end_at: {
            lte: new Date(),
          },
        },
      },
    });

    if (data.length === 0) return errRes(res,  messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getSpacificOne(req: Request, res: Response): Promise<object> {
    const target = req.params.target;
    const data: any = await prisma.discount.findMany({
      where: {
        target,
        active: true,
        NOT: {
          end_at: {
            lte: new Date(),
          },
        },
      },
    });

    if (data.length === 0) return errRes(res,  messageReturn("dataNotFound"));
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
      // get body
      const body: any = req.body;
      console.log(body);

      // Body validation
      const notValide = validate(body, Validation.discount());
// console.log(body);
      if (notValide)
        return errRes(res, messageReturn("checkSendData"));
      // add item in DB
      const data: any = await prisma.discount.create({
        data: {
          target: body.target,
          value: parseInt(body.value),
          target_id: parseInt(body.ids),
          end_at: new Date(body.end_at),
        },
      });
     
      // Return Response if Done
      return okRes(res, { data });
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
  static async update(req: Request, res: Response): Promise<object> {
    try {
      // get body data
      const body = req.body;
      const id = req.params.id;
      //   console.log(body);
      // validate data
      const notValide = validate(body, Validation.discount(false));
      if (notValide) return errRes(res, { msg: "Data not valid" });

      // update data
      const data: any = await prisma.discount.update({
        where: { id: parseInt(id) },
        data: {
          value: parseInt(body.value),
        },
      });
      return errRes(res, { data });
    } catch (err) {
      return errRes(res,messageReturn("wentWrong"));
    }
  }
  /**
   *
   * @param req
   * @param res
   * @param
   */
  static async activate(req: Request, res: Response): Promise<object> {
    try {
      // get body data
      const body = req.body;
      const id = req.params.id;
      // update data
      const data: any = await prisma.discount.update({
        where: { id: parseInt(id) },
        data: {
          active: body.active,
        },
      });
      return errRes(res, { data });
    } catch (err) {
      return errRes(res, `حدث خطأ ما ${err}`);
    }
  }
  /**
   *
   * @param req
   * @param res
   * @param
   */
  static async delete(req: Request, res: Response): Promise<object> {
    try {
      // get body data
      const body = req.body;
      const id = req.params.id;
      // update data
      const data: any = await prisma.discount.update({
        where: { id: parseInt(id) },
        data: {
          active: false,
        },
      });
      return errRes(res, { data });
    } catch (err) {
      return errRes(res, `حدث خطأ ما ${err}`);
    }
  }
}
