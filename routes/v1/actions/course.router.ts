import * as express from "express";
import CourseController from "../../../controller/v1/actiions/course.controller";
import adminMiddleware from "../../../middleware/admin.middleware";
import bothMiddleware from "../../../middleware/both.middleware";

const routes = express.Router();

// Get All
routes.get("/", CourseController.getAll);

// Delete
routes.get("/delete/:id", adminMiddleware, CourseController.delete);

// Get one
routes.get("/sub/:id", CourseController.getSub);

// Get one
routes.get("/:id", bothMiddleware, CourseController.getOne);

// Add
routes.post("/", adminMiddleware, CourseController.add);

// update
routes.put("/update/:id", adminMiddleware, CourseController.update);

// Active
routes.put("/activate/:id", adminMiddleware, CourseController.active);

export default routes;
