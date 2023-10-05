import * as express from "express";
import TokenController from "../../../controller/v1/actiions/token.controller";
import adminMiddleware from "../../../middleware/admin.middleware";
import bothMiddleware from "../../../middleware/both.middleware";

const routes = express.Router();

// Add Routes
routes.post("/", adminMiddleware, TokenController.add);

// Get All
routes.get("/", adminMiddleware, TokenController.getAll);

// Delete one
routes.get("/delete/:id", adminMiddleware, TokenController.delete);

// Delete one
routes.put("/update/:id", adminMiddleware, TokenController.update);

// Active one
routes.get("/active/:id", adminMiddleware, TokenController.active);

// Get one
routes.get("/:token", bothMiddleware, TokenController.getOne);

export default routes;
