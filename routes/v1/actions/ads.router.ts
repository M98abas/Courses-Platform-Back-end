import * as express from "express";
import CoponController from "../../../controller/v1/actiions/ads.controller";
import adminMiddleware from "../../../middleware/admin.middleware";

const routes = express.Router();

// Add Routes
routes.post("/", adminMiddleware, CoponController.add);

// Get All
routes.get("/", CoponController.getAll);

// Delete one
routes.get("/delete/:id", adminMiddleware, CoponController.delete);

// Delete one
routes.put("/update/:id", adminMiddleware, CoponController.update);

// Active one
routes.get("/active/:id", adminMiddleware, CoponController.active);

// Get one
routes.get("/query/:query", CoponController.getComOne);

// Get one
routes.get("/:id", CoponController.getOne);

export default routes;
