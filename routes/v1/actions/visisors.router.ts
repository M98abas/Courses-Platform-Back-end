import * as express from "express";
import VisistorsController from "../../../controller/v1/actiions/visitor.controller";
import adminMiddleware from "../../../middleware/admin.middleware";

const routes = express.Router();

// Add Routes
routes.post("/", VisistorsController.add);

// Delete one
routes.put("/update/:id", VisistorsController.update);

// Get one
routes.get("/", adminMiddleware, VisistorsController.getCalculation);

export default routes;
