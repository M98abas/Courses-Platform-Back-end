import * as express from "express";
import SubCourseController from "../../../controller/v1/actiions/subcourses.controller";
import adminMiddleware from "../../../middleware/admin.middleware";
import bothMiddleware from "../../../middleware/both.middleware";

const routes = express.Router();

// Get All
routes.get("/", bothMiddleware, SubCourseController.getAll);

// Get All WIth con
routes.get("/all/:id", adminMiddleware, SubCourseController.getWithConstractor);

// Delete
routes.get("/delete/:id", adminMiddleware, SubCourseController.delete);

// Get one
routes.get("/content/:id", bothMiddleware, SubCourseController.getAllContent);

// Get one
routes.get("/cate/:id", SubCourseController.getOneCate);

// Get one
routes.get("/:id", bothMiddleware, SubCourseController.getOne);

// Add
routes.post("/", adminMiddleware, SubCourseController.add);

// updates
routes.put("/update/:id", adminMiddleware, SubCourseController.update);

// Active
routes.put("/activate/:id", adminMiddleware, SubCourseController.active);

export default routes;
