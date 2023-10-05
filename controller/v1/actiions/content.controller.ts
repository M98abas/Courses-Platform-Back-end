import { Request, Response } from "express";
import {
  errRes,
  okRes,
  sixMonthsLaterFunction,
} from "../../../utils/util.services";
import { validate } from "validate.js";
import Validation from "../../../utils/Validations";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";
import sendEmail from "../../../utils/SendEmail";

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
    const data: any = await prisma.content.findMany({
      where: {
        active: true,
      },
    });

    if (data.length === 0)
      return errRes(res, { msg: "Sorry! There is no data" });
    return okRes(res, { data }, 200);
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getOne(req: any, res: any): Promise<object> {
    try {
      const id: any = parseInt(req.params.id);
      const data: any = await prisma.content.findMany({
        where: {
          id,
        },
      });

      // Check and save watched videos
      let contentData: any;
      let courseData: any;
      const user = req.user;
      courseData = await prisma.courseConstractor.findFirst({
        where: {
          constractorId: req.user.id,
          subCourseId: data.courseId,
        },
      });
      if (!req.admin && courseData) {

        let sixMonthsLater: any = sixMonthsLaterFunction(courseData.created_at);
        if (courseData.length != 0 && courseData.created_at >= sixMonthsLater)
          return errRes(res, messageReturn("reachLimited"));

        contentData = await prisma.contentConstactor.findFirst({
          where: {
            constractorsId: req.user.id,
            contentId: id,
            active: true,
          },
        });
        sixMonthsLater = sixMonthsLaterFunction(contentData?.created_at);
        // Check if the data is not reach repeated limits
        if (
          contentData != null &&
          contentData.created_at <= sixMonthsLater
        ) {
          sendEmail(
            `This ${user.email} reach to the limit with his token`,
            "mahmoud.ud@gmail.com",
            "Xeneon - limites"
          );
          return errRes(res, messageReturn("reachLimited"));
        } else if (contentData != null) {
          contentData = await prisma.contentConstactor.update({
            where: {
              id: contentData.id,
            },
            data: {
              repeated: {
                increment: 1,
              },
            },
          });
          return okRes(res, data);
        }

        contentData = await prisma.contentConstactor.create({
          data: {
            contentId: data.id,
            constractorsId: req.user.id,
          },
        });
      }

      if (data.length === 0)
        return errRes(res, { msg: "Sorry! There is no data" });
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
      // Get body
      const body: any = req.body;

      // Validate Data
      const notValide: any = validate(body, Validation.content());
      if (notValide) return errRes(res, "There something you missing");

      // Save data
      const data = await prisma.content.create({
        data: {
          titleAr: body.titleAr,
          titleEn: body.titleEn,
          descriptionAr: body.descriptionAr,
          descriptionEn: body.descriptionEn,
          videoURL: body.videoURL,
          isFree: body.isFree,
          duration: parseInt(body.duration),
          subCourseId: parseInt(body.id),
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
  static async update(req: Request, res: Response): Promise<object> {
try {
      // Get body
      const body: any = req.body;
      const id = parseInt(req.params.id);

      // Validate Data
      const notValide: any = validate(body, Validation.courses(false));
      if (notValide) return errRes(res, "There something you missing");

          console.log(body);

    // Define the data object
    const data: any = {};

    // List of fields to potentially update
    const fieldsToUpdate = [
      "titleAr",
      "titleEn",
      "descriptionAr",
      "descriptionEn",
      "isFree",
      "duration",
      "courseId",
    ];

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
    const updatedData: any = await prisma.content.update({
      where: {
        id,
      },
      data,
    });
    return okRes(
        res,
        `The ${data.titleAr} course has been created successfully.`
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
  static async delete(req: Request, res: Response): Promise<object> {
    try {
      const id = parseInt(req.params.id);

      // Save data
      const data: any = await prisma.content.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });

      return okRes(
        res,
        `The ${data.title} course has been created successfully.`
      );
    } catch {
      return errRes(res, "Something went wrong ...");
    }
  }

  /**
   *
   *
   * @param req
   * @param res
   * @returns
   */
  static async active(req: Request, res: Response): Promise<object> {
    try {
      // Get body
      const body: any = req.body;
      const id = parseInt(req.params.id);

      // Validate Data
      const notValide: any = validate(body, Validation.courses());
      if (notValide) return errRes(res, "There something you missing");

      // Save data
      const data: any = await prisma.content.update({
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
      return errRes(res, "Something went wrong ...");
    }
  }
}
