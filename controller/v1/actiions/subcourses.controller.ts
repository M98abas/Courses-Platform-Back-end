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
import { sendEmail } from "../../../utils/emailSending/sender";

// Init prisma
const prisma = new PrismaClient();

export default class SubCourseController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getAll(req: Request, res: Response): Promise<object> {
    const data: any = await prisma.subCourses.findMany({
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
  static async getOneCate(req: any, res: any): Promise<object> {
    const data: any = await prisma.subCourses.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
  }

  /**
   * @abstract --> Rebuild this
   * @param req
   * @param res
   * @returns
   */
  static async getAllContent(req: any, res: any): Promise<object> {
    if (req.params.id) {
      if (req.user.name == "Admin") {
        let data: any = await prisma.content.findMany({
          where: {
            active: true,
            subCourseId: parseInt(req.params.id),
          },
        });
        //    console.log(req.params.id)
        // console.log(typeof(req.params.id))
        if (data.length === 0)
          return errRes(res, messageReturn("dataNotFound"));
        return okRes(res, { data }, 200);
      }

      const id = parseInt(req.params.id);
      console.log(id);
      let data: any = await prisma.content.findMany({
        where: {
          active: true,
          subCourseId: id,
        },
      });
      console.log(data);
      let courseData: any;
      const user = req.user;
      courseData = await prisma.courseConstractor.findFirst({
        where: {
          constractorId: req.user.id,
          subCourseId: id,
          active: true,
        },
      });
      console.log(courseData);
      if (!courseData) {
        data = await prisma.content.findMany({
          where: {
            subCourseId: id,
            active: true,
            isFree: true,
          },
        });
        return okRes(res, { data, isPuchase: false });
      }
      const currentDate = new Date(); // Get the current date
      const sixMonthsLater = new Date(courseData?.created_at); // Convert courseData?.created_at to a Date object

      // Calculate six months later from the course creation date
      sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

      if (courseData != null && currentDate >= sixMonthsLater) {
        sendEmail(
          `This ${user.email} reach to the limit with his token`,
          "mahmoud.ud@gmail.com",
          "Xeneon - limites"
        );
        return errRes(res, messageReturn("reachLimited"));
      }

      return okRes(res, { data, isPuchase: true }, 200);
    }
    return errRes(res, messageReturn("dataNotFound"));
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getWithConstractor(
    req: Request,
    res: Response
  ): Promise<object> {
    try {
      // Get data from DB
      const data: any = await prisma.subCourses.findMany({
        include: {
          courseConstractor: {
            include: {
              constractor: true,
            },
          },
        },
      });

      // Return response if data not exist
      if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));

      // Return response with data
      return okRes(res, [data]);
    } catch (error) {
      console.error("Error retrieving data:", error);
      return errRes(res, messageReturn("wentWrong"));
    }
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async getOne(req: any, res: any): Promise<object> {
    //try{
    const id: any = parseInt(req.params.id);

    const user: any = req.user;
    const data: any = await prisma.subCourses.findUnique({
      where: {
        id,
      },
      include: {
        content: true,
      },
    });

    if (!req.admin) {
      let courseData: any = await prisma.courseConstractor.findFirst({
        where: {
          constractorId: user.id,
          subCourseId: data.id,
          active: true,
        },
      });
      const sixMonthsLater = sixMonthsLaterFunction(courseData.created_at);

      if (courseData.length != 0 && courseData.created_at <= sixMonthsLater) {
        await prisma.courseConstractor.update({
          where: {
            id: courseData.id,
          },
          data: {
            repeated: {
              increment: 1,
            },
          },
        });
      }
    }
    if (data.length === 0) return errRes(res, messageReturn("dataNotFound"));
    return okRes(res, { data }, 200);
    // }catch{
    //   return errRes(res, messageReturn("wentWrong"));
    // }
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
      console.log(notValide);

      if (notValide) return errRes(res, messageReturn("checkData"));

      // Save data
      const data = await prisma.subCourses.create({
        data: {
          titleAr: body.titleAr,
          titleEn: body.titleEn,
          descriptionAr: body.descriptionAr,
          descriptionEn: body.descriptionEn,
          price: body.price,
          isWorkshop: body.isWorkshop,
          imageUrl: body.imgUrl,
          courseId: parseInt(body.id),
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

      if (notValide) return errRes(res, messageReturn("checkData"));
      const data: any = {};

      // List of fields to potentially update
      const fieldsToUpdate = [
        "titleAr",
        "titleEn",
        "descriptionAr",
        "descriptionEn",
        "isWorkshop",
        "imageUrl",
      ];
      // violanceText
      //  violanceNum
      // Loop through the fields and add them to the data object if they exist in the request body
      fieldsToUpdate.forEach((field) => {
        if (body[field] !== undefined) {
          data[field] = body[field];
        }
      });

      // Check if there's any data to update
      if (Object.keys(data).length === 0) {
        return errRes(res, "No data provided for update");
      }
      // Save data
      const dataUpdated: any = await prisma.subCourses.update({
        where: {
          id,
        },
        data: data,
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
      // Get body
      const body: any = req.body;
      const id = parseInt(req.params.id);

      // Save data
      const data: any = await prisma.subCourses.update({
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
      // Get body
      const body: any = req.body;
      const id = parseInt(req.params.id);

      // Save data
      const data: any = await prisma.subCourses.update({
        where: {
          id,
        },
        data: {
          active: true,
        },
      });

      return okRes(res, { data });
    } catch {
      return errRes(res, messageReturn("wentWrong"));
    }
  }
}
