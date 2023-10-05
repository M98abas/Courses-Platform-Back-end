import * as express from "express";
import ContentController from "../../../controller/v1/actiions/content.controller";
import adminMiddleware from "../../../middleware/admin.middleware";
import bothMiddleware from "../../../middleware/both.middleware";

const routes = express.Router();

// Get All
routes.get("/", ContentController.getAll);

// Add
routes.post("/", adminMiddleware, ContentController.add);

// update
routes.put("/update/:id", adminMiddleware, ContentController.update);

// Delete
routes.get("/delete/:id", adminMiddleware, ContentController.delete);

// Active
routes.post("/activate/:id", adminMiddleware, ContentController.active);

// Get one
routes.get("/:id", bothMiddleware, ContentController.getOne);

export default routes;
