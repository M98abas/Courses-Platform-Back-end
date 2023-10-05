import * as express from "express";
import annousmentsController from "../../../controller/v1/actiions/annousments.controller";
import adminMiddleware from "../../../middleware/admin.middleware";
import bothMiddleware from "../../../middleware/both.middleware";

const routes = express.Router();

// Add Routes
routes.post("/", adminMiddleware, annousmentsController.add);

// Get All
routes.get("/", annousmentsController.getAll);

// Delete one
routes.get("/delete/:id", adminMiddleware, annousmentsController.delete);

// Active one
routes.get("/active/:id", adminMiddleware, annousmentsController.active);

// Get one
routes.get("/check/:copon", bothMiddleware, annousmentsController.getOne);

export default routes;
