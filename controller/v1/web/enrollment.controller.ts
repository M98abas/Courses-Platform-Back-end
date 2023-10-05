import { Request, Response } from "express";
import { errRes, okRes } from "../../../utils/util.services";
import { PrismaClient } from "@prisma/client";
import messageReturn from "../../../utils/messages";
// import sendEmail from "../../../utils/SendEmail";
import { sendEmail } from "../../../utils/emailSending/sender";
import CONFIG from "../../../config";

import moment from "moment";
// Init prisma
const prisma = new PrismaClient();

export default class EnrollmentController {
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async get(req: Request, res: Response): Promise<object> {
    // Get data from DB
    const data: any = await prisma.courseConstractor.findMany({
      where: {
        active: true,
      },
      include: {
        subCourse: {
          select: {
            titleAr: true,
          },
        },
        constractor: {
          select: {
            name: true,
            email: true,
          },
        },
        Copon: {
          select: {
            text: true,
          },
        },
        token: true,
      },
    });
    //    console.log(data.length);

    // Return response if data not exist
    if (data.length == 0) return errRes(res, messageReturn("dataNotFound"));

    // Return response with data
    return okRes(res, { data });
  }
  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async delete(req: any, res: any): Promise<object> {
    const id = parseInt(req.params.id);
    // Get data from DB
    const data: any = await prisma.courseConstractor.update({
      where: {
        id,
      },
      data: { active: false },
    });
    console.log(data);

    // Return response if data not exist
    if (data.length == 0) return errRes(res, messageReturn("dataNotFound"));

    // Return response with data
    return okRes(res, { data });
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  static async enrolled(req: any, res: any): Promise<object> {
    try {
      // Get token
      let user: any = req.user;
      const body: any = req.body;

      // Get token from req
      let token: any = body.token ? body.token : null;
      if (!token) return errRes(res, messageReturn("checkData"));

      var copon: any = body.copon
        ? await prisma.copon.findUnique({
            where: {
              text: body.copon,
            },
          })
        : 0;
      if (copon.subCoursesId != parseInt(body.courseId)) copon = 0;
      else
        await prisma.copon.update({
          where: {
            id: copon.id,
          },
          data: {
            availableFor: {
              decrement: 1,
            },
          },
        });
      const date = new Date();
      // check if it's correct
      token = await prisma.tokens.findUnique({
        where: {
          token,
        },
      });
      // Check

      if (!token || token.courseConstractorId != null) {
        sendEmail(
          `This id-> ${user.id}, Email -> ${user.email} is entering usage token [${token}]`,
          CONFIG.sendingEmailTo,
          `Token - used - ${user.email}`
        );
        return errRes(res, messageReturn("usedMessage"));
      } else if (
        moment(token.expire_at).format("MMMM Do YYYY") ==
        moment(date.getDate()).format("MMMM Do YYYY")
      ) {
        await prisma.tokens.update({
          where: {
            id: token.id,
          },
          data: {
            active: false,
          },
        });

        // Send Email to the Admin
        sendEmail(
          `This id-> ${user.id}, Email -> ${
            user.email
          } is entering Expierd token [${token}] seince ${moment(
            token.expire_at,
            "YYYYMMDD"
          ).fromNow()}`,
          CONFIG.sendingEmailTo,
          `Token - used - ${user.email}`
        );
        return errRes(res, messageReturn("expiredMessage"));
      }

      // 1-> save user data
      let data: any = await prisma.courseConstractor.findFirst({
        where: {
          constractorId: user.id,
          subCourseId: parseInt(body.courseId),
        },
      });

      // If data excist
      if (data) {
        data = await prisma.courseConstractor.update({
          where: {
            id: data.id,
          },
          data: {
            renewalNum: {
              increment: 1,
            },

            active: true,
            violanceNum: 2,
            status: "Updated",
          },
        });

        sendEmail(
          `This id-> ${user.id}, Email -> ${user.email} is entering this token [${token}]`,
          CONFIG.sendingEmailTo,
          `Token - Updated - ${user.email}`
        );
        // update the token with new course
        await prisma.tokens.update({
          where: {
            id: token.id,
          },
          data: {
            courseConstractorId: data.id,
            subCoursesId: parseInt(body.courseId),
          },
        });
        return okRes(res, messageReturn("success"));
      }

      // In case data not exsist
      data = await prisma.courseConstractor.create({
        data: {
          constractorId: user.id,
          subCourseId: parseInt(body.courseId),
          status: "New",
          repeated: 1,
          coponId: copon ? copon.id : null,
        },
      });

      // update the token with new course
      await prisma.tokens.update({
        where: {
          id: token.id,
        },
        data: {
          courseConstractorId: data.id,
          subCoursesId: body.courseId,
        },
      });

      // INcrement
      const subCourse = await prisma.subCourses.findUnique({
        where: {
          id: parseInt(data.subCourseId),
        },
      });
      let incrementValue: number;
      if (subCourse?.titleEn == "Venom" || subCourse?.titleEn == "VENOM")
        incrementValue = 3;
      else if (subCourse?.titleEn == "radon" || subCourse?.titleEn == "RADON")
        incrementValue = 50;
      else incrementValue = 15;

      console.log(incrementValue);
      if (user.refererCode != null) {
        await prisma.constractors.updateMany({
          where: {
            nickName: user.refererCode,
          },
          data: {
            referingPoints: {
              increment: incrementValue,
            },
          },
        });
      }
      // Send Email
      sendEmail(
        `This id-> ${user.id}, Email -> ${user.email} is entering this token [${token}]`,
        CONFIG.sendingEmailTo,
        `Token - New - ${user.email}`
      );

      await prisma.constractors.update({
        where: {
          id: user.id,
        },
        data: {
          referingPoints: {
            increment: 15,
          },
        },
      });

      if (data.length != 0)
        return okRes(res, { mag: messageReturn("success") });
      // 0 -> send email to Admin
      return errRes(res, messageReturn("wentWrong"));
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
  static async courseIncrements(req: any, res: any): Promise<object> {
    try {
      // Get body
      const body: any = req.body;
      const id = parseInt(req.body.subCourse);
      const user: any = req.user;
      // Save data
      const data: any = await prisma.courseConstractor.updateMany({
        where: {
          subCourseId: id,
          constractorId: user.id,
          active: true,
        },
        data: {
          finished: body.finishedDate,
          status: body.status,
          repeated: {
            increment: 1,
          },
        },
      });
      if (data.length != 0 && data.repeatedCourse == 5) {
        await prisma.courseConstractor.update({
          where: {
            id,
          },
          data: {
            active: false,
          },
        });
        return okRes(
          res,
          `The ${data.titleEn} course has been Updated successfully.`
        );
      }
      return errRes(res, messageReturn("wentWrong"));
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
  static async violanceAction(req: any, res: any): Promise<object> {
    try {
      // Get body
      const id: any = req.params.id;
      const user: any = req.user;
      //console.log(id,user);
      // Get Data and update it
      let data: any = await prisma.courseConstractor.findFirst({
        where: {
          constractorId: user.id,
          subCourseId: parseInt(id),
        },
      });
      //console.log("Before --> ",data)
      if (data && data.violanceNum == 4) {
        data = await prisma.courseConstractor.updateMany({
          where: {
            constractorId: user.id,
            subCourseId: parseInt(id),
          },
          data: { active: false },
        });
        sendEmail(
          `This ${user.email} user is blocked due to do some violance`,
          CONFIG.sendingEmailTo,
          "Xenenon - Limitaion for users"
        );
        //console.log("Before --> ",data)
        return errRes(res, messageReturn("violanceBlocked"));
      }
      //console.log("Before --> ",data)
      // Save data
      data = await prisma.courseConstractor.update({
        where: {
          id: data.id,
        },
        data: {
          violanceNum: {
            increment: 1,
          },
        },
      });

      //console.log("Before --> ",data)
      return okRes(res, messageReturn("violanceError"));
    } catch {
      return errRes(res, messageReturn("wentWrong"));
    }
  }
}
