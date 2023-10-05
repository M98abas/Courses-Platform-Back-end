import * as express from "express";
import commonQuestionController from "../../../controller/v1/actiions/commonQuestion.controller";
import adminMiddleware from "../../../middleware/admin.middleware";

const routes = express.Router();

// Add Routes
routes.post("/", adminMiddleware, commonQuestionController.add);

// Get All
routes.get("/", commonQuestionController.getAll);

// Update one
routes.get("/delete/:id", adminMiddleware, commonQuestionController.delete);

// Update one
routes.put("/update/:id", adminMiddleware, commonQuestionController.update);

// Get one
routes.get("/:id", commonQuestionController.getOne);

export default routes;
