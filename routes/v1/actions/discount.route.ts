import * as express from "express";
import CoponController from "../../../controller/v1/actiions/discout.controller";
import adminMiddleware from "../../../middleware/admin.middleware";

const routes = express.Router();

// Add Routes
routes.post("/", adminMiddleware, CoponController.add);

// Get All
routes.get("/", CoponController.getAll);

// Get one
routes.get("/target/:target", CoponController.getSpacificOne);

// Get one
routes.get("/:id", CoponController.getOne);

// Delete one
routes.put("/update/:id", adminMiddleware, CoponController.update);

// Delete one
routes.get("/delete/:id", adminMiddleware, CoponController.delete);

// Active one
routes.put("/active/:id", adminMiddleware, CoponController.activate);

export default routes;
