import { Request, Response } from "express";
import { errRes, okRes } from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";
import sendEmail from "../../../utils/SendEmail";

// Init prisma
const prisma = new PrismaClient();

export default class CourseController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.course.findMany({
      where: {
        active: true,
      },
      include: {
        feedBack: true,
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
  static async getSub(req: any, res: any): Promise<object> {
    console.log(req.params.id);

    if (req.params.id !== undefined) {
      const id: any = parseInt(req.params.id);
      const data: any = await prisma.subCourses.findMany({
        where: {
          courseId: id,
          active: true,
        },
      });

      if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
      return okRes(res, { data }, 200);
    }
    return errRes(res, messageReturn("dataNotFound"));
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getOne(req: any, res: any): Promise<object> {
    const id: any = parseInt(req.params.id);
    const user: any = req.user;
    console.log(user);

    const date: any = new Date();
    const data: any = await prisma.course.findUnique({
      where: {
        id,
      },
      include: {
        subCourse: true,
      },
    });

    // If the request come from user
    let coursetData: any;
    if (!req.admin) {
      coursetData = await prisma.courseConstractor.findFirst({
        where: {
          constractorId: user.id,
          subCourseId: id,
          active: true,
        },
        include: {
          token: {
            where: {
              expire_at: {
                lte: new Date(),
              },
              subCoursesId: id,
            },
            select: {
              id: true,
              expire_at: true,
              token: true,
            },
          },
        },
      });
      // Check if the data is not reach repeated limits
      if (coursetData) {
        sendEmail(
          `This ${user.email} reach to the limited/Expired with his token`,
          "mahmoud.ud@gmail.com",
          "Xeneon - limites"
        );
        await prisma.tokens.update({
          where: {
            id: coursetData.token.id,
          },
          data: {
            active: false,
          },
        });

        await prisma.courseConstractor.update({
          where: {
            id: coursetData.id,
          },
          data: {
            active: false,
          },
        });

        return errRes(res, messageReturn("reachLimited"));
      } else if (coursetData) {
        coursetData = await prisma.courseConstractor.update({
          where: {
            id: coursetData.id,
          },
          data: {
            repeated: {
              increment: 1,
            },
          },
        });
      }
      if (coursetData && !coursetData.active)
        return errRes(res, messageReturn("reachLimited"));
    }

    if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, data, 200);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async add(req: Request, res: Response): Promise<object> {
    try {
      // Get body
      const body: any = req.body;

      // Validate Data
      const notValide: any = validate(body, Validation.courses());
      if (notValide) return errRes(res, messageReturn("checkData"));

      // Save data
      const data = await prisma.course.create({
        data: {
          titleAr: body.titleAr,
          titleEn: body.titleEn,
          descriptionAr: body.descriptionAr,
          descriptionEn: body.descriptionEn,
          imgUrl: body.imgUrl,
        },
      });

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
      const id = parseInt(req.params.id);
      //    console.log(body);

      // Validate Data
      const notValide: any = validate(body, Validation.courses(false));
      if (notValide) return errRes(res, messageReturn("checkData"));

      // Create an empty object to hold the data to be updated
      const updateData: any = {};

      // Check if fields are not empty and add them to the updateData object
      if (body.titleAr != "") updateData.titleAr = body.titleAr;
      if (body.titleEn != "") updateData.titleEn = body.titleEn;
      if (body.descriptionAr != "")
        updateData.descriptionAr = body.descriptionAr;
      if (body.descriptionEn != "")
        updateData.descriptionEn = body.descriptionEn;
      if (body.imgUrl != "") updateData.imgUrl = body.imgUrl;

      // Check if there is data to update
      if (Object.keys(updateData).length === 0) {
        return errRes(res, messageReturn("emptyData"));
      }
      // Save data
      const data: any = await prisma.course.update({
        where: {
          id,
        },
        data: updateData,
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
      // Get Only the Id
      console.log("Hiu");
      const id = parseInt(req.params.id);

      // Save data
      const data: any = await prisma.course.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });
      console.log(data);

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
      // Get body
      const id = parseInt(req.params.id);

      // Save data
      const data: any = await prisma.course.update({
        where: {
          id,
        },
        data: {
          active: true,
        },
      });

      return okRes(
        res,
        `The ${data.title} course has been created successfully.`
      );
    } catch {
      return errRes(res, messageReturn("wentWrong"));
    }
  }
}
