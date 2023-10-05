import * as express from "express";
import EnrolledController from "../../../controller/v1/web/enrollment.controller";
import adminMiddleware from "../../../middleware/admin.middleware";
import userMiddleware from "../../../middleware/user.middleware";

const routes = express.Router();

// Register routes
routes.get("/", adminMiddleware, EnrolledController.get);

// login Routes
routes.post("/", userMiddleware, EnrolledController.enrolled);

// Get All USers
//routes.post"/icourse/:id",userMiddleware,EnrolledController.courseIncrements

// Add violace to user
routes.get("/violance/:id",userMiddleware,EnrolledController.violanceAction);

// Add violace to user
routes.get("/delete/:id",adminMiddleware,EnrolledController.delete);

// post All USers
// routes.post(  "/icontent/:id",  userMiddleware, EnrolledController.contentIncrements);

export default routes;
