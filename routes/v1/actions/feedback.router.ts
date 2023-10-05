import * as express from "express";
import feedbackController from "../../../controller/v1/actiions/feedback.controller";
import adminMiddleware from "../../../middleware/admin.middleware";

const routes = express.Router();

// Add Routes
routes.post("/", adminMiddleware, feedbackController.add);

// Get All
routes.get("/", feedbackController.getAll);

// Delete one
routes.get("/delete/:id", adminMiddleware, feedbackController.delete);

// Delete one
routes.put("/update/:id", adminMiddleware, feedbackController.update);


// Active one
routes.put("/active/:id", adminMiddleware, feedbackController.active);

// Get some category
routes.get("/target/:target", feedbackController.getTargetOne);

// Get Course ID
routes.get("/course/:id", feedbackController.getCourseOne);

// Get one
routes.get("/:id", feedbackController.getOne);

export default routes;
