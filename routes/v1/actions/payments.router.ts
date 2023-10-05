import * as express from "express";
import PaymentsController from "../../../controller/v1/actiions/payment.controller";
import adminMiddleware from "../../../middleware/admin.middleware";

const routes = express.Router();

// Add Routes
routes.post("/", adminMiddleware, PaymentsController.add);

// Get All
routes.get("/", PaymentsController.getAll);

// Delete one
routes.get("/delete/:id", adminMiddleware, PaymentsController.delete);

// Active one
//routes.get("/active/:id", adminMiddleware, PaymentsController.active);

// Get title one
routes.get("/title/:id", PaymentsController.getOneUsingValue);

// Get one
routes.get("/:id", PaymentsController.getOne);

export default routes;
