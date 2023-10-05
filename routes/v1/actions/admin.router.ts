import * as express from "express";
import AdminController from "../../../controller/v1/actiions/admin.controller";
import adminMiddleware from "../../../middleware/admin.middleware";

const routes = express.Router();

// Register routes
routes.post("/register", AdminController.register);

// login Routes
routes.post("/login", AdminController.login);

// Add New Account Routes
routes.post("/otp", AdminController.otpCheck);

// Add New Account Routes
routes.post("/add", adminMiddleware, AdminController.register);

// Get All USers
routes.get("/", adminMiddleware, AdminController.getAll);

// Get All USers
routes.get("/:id", adminMiddleware, AdminController.getOne);

// Get All USers
routes.post("/update", adminMiddleware, AdminController.update);

// Get All USers
routes.post("/active", adminMiddleware, AdminController.activate);

export default routes;
