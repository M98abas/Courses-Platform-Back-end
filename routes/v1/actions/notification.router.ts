import * as express from "express";
import feedbackController from "../../../controller/v1/actiions/notification.controller";
import adminMiddleware from "../../../middleware/admin.middleware";

const routes = express.Router();

// Add Routes
routes.post("/", adminMiddleware, feedbackController.add);

// Get All
routes.get("/", adminMiddleware, feedbackController.getAll);

// Get All
routes.get("/dm", adminMiddleware, feedbackController.getAllDm);

// Get All
routes.get("/success", feedbackController.getSuccess);

// Update one
routes.get("/delete/:id", adminMiddleware, feedbackController.delete);

// Update one
routes.put("/update/:id", adminMiddleware, feedbackController.update);

// Get one
routes.get("/:id", feedbackController.getOne);

export default routes;
