import * as express from "express";
import VenomController from "../../../controller/v1/actiions/venomData.controller";
import adminMiddleware from "../../../middleware/admin.middleware";
import bothMiddleware from "../../../middleware/both.middleware";

const routes = express.Router();

// Add Routes
routes.post("/", adminMiddleware, VenomController.add);

// Get All
routes.get("/", adminMiddleware, VenomController.getAll);

// Get Latest
routes.get("/latest", VenomController.latestDetails);

// Delete one
routes.get("/delete/:id", adminMiddleware, VenomController.delete);

// Active one
routes.put("/update/:id", adminMiddleware, VenomController.update);


// Active one
routes.get("/active/:id", adminMiddleware, VenomController.active);

// Get one
routes.get("/check/:copon", bothMiddleware, VenomController.getOne);

export default routes;
