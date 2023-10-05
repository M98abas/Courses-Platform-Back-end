import * as express from "express";
import CoponController from "../../../controller/v1/actiions/copon.controller";
import adminMiddleware from "../../../middleware/admin.middleware";
import bothMiddleware from "../../../middleware/both.middleware";

const routes = express.Router();

// Add Routes
routes.post("/", adminMiddleware, CoponController.add);

// Add Routes
routes.post("/sms", adminMiddleware, CoponController.sendSMS);

// Get All
routes.get("/", adminMiddleware, CoponController.getAll);

// Delete one
routes.get("/delete/:id", adminMiddleware, CoponController.delete);

// Active one
routes.get("/active/:id", adminMiddleware, CoponController.active);

// Get one
routes.get("/check/:copon",CoponController.getOne);

export default routes;
