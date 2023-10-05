import * as express from "express";
import adminRoute from "../routes/v1/actions/admin.router";
import constractorRoute from "../routes/v1/actions/constractor.router";
import subcourseRoute from "../routes/v1/actions/subCourse.router";
import courseRoute from "../routes/v1/actions/course.router";
import discountRoute from "../routes/v1/actions/discount.route";
import contentRoute from "../routes/v1/actions/content.router";
import enrollmentRoute from "../routes/v1/web/enrollment.router";
import coponRoute from "../routes/v1/actions/copons.routes";
import paymentsRoute from "../routes/v1/actions/payments.router";
import tokenRoute from "../routes/v1/actions/token.router";
import contractRoute from "../routes/v1/web/contract.router";
import adsRoute from "../routes/v1/actions/ads.router";
import feedbackRoute from "../routes/v1/actions/feedback.router";
import commonQuestionRoute from "../routes/v1/actions/commonQuestion.router";
import visitorRoute from "../routes/v1/actions/visisors.router";
import notifictionRoute from "../routes/v1/actions/notification.router";
import annousmentsRoute from "../routes/v1/actions/annousments.routes";
import venomRoute from "../routes/v1/actions/venomData.routes";
import handleHttpError from "../middleware/handleAPiError";


const app: any = express.Router();
// Admin Router
app.use("/admin", adminRoute);

// Constractor Router
app.use("/constractor", constractorRoute);

// Discount Router
app.use("/discount", discountRoute);

// Course Router
app.use("/course", courseRoute);

// SubCourse Router
app.use("/subCourse", subcourseRoute);

// Content Router
app.use("/content", contentRoute);

// enrollment Router
app.use("/enrolled", enrollmentRoute);

// Annousment Router
app.use("/annousments", annousmentsRoute);

// Annousment Router
app.use("/venomData", venomRoute);

// Copon Router
app.use("/copon", coponRoute);

// Visitors Router
app.use("/visit", visitorRoute);

// Contract Router
app.use("/contract", contractRoute);

// payments Router
app.use("/payments", paymentsRoute);

// Ads Router
app.use("/ads", adsRoute);

// token Router
app.use("/token", tokenRoute);

// feedback Router
app.use("/feedback", feedbackRoute);

// feedback Router
app.use("/commonQuestions", commonQuestionRoute);

// Notification Router
app.use("/notification", notifictionRoute);

export default app;
