import * as express from "express";
import ContractController from "../../../controller/v1/web/contract.controller";
import adminMiddleware from "../../../middleware/admin.middleware";
import userMiddleware from "../../../middleware/user.middleware";
import bothMiddleware from "../../../middleware/both.middleware";

const routes = express.Router();

// Register routes
routes.get("/", adminMiddleware, ContractController.getAll);

// Register routes
routes.get("/:id", bothMiddleware, ContractController.getOne);

// login Routes
routes.post("/", userMiddleware, ContractController.add);

// Get All USers
routes.post("/delete/:id", adminMiddleware, ContractController.delete);

// post All USers
routes.post("/descision/:id", userMiddleware, ContractController.makeDecision);

export default routes;
