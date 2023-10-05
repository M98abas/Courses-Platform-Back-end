import * as express from "express";
import UserController from "../../../controller/v1/actiions/constractor.controller";
import bothAuthMiddleware from "../../../middleware/both.middleware";
import userMiddleware from "../../../middleware/user.middleware";
import adminMiddleware from "../../../middleware/admin.middleware";
import registerMiddleware from "../../../middleware/register.middleware";

const routes = express.Router();

// Register routes
routes.post("/register", UserController.register);

// login Routes
routes.post("/login", UserController.login);

// Validate OTP email
routes.post(
  "/validate/email",
  registerMiddleware,
  UserController.validateEmailOtp
);

// Validate OTP SMS
routes.post("/validate/sms", registerMiddleware, UserController.validateSMSOtp);

// Block Account
routes.get("/blockAccount", bothAuthMiddleware, UserController.blockAccount);

// Get All USers
routes.get("/", adminMiddleware, UserController.getAll);

// Get data upon username
routes.get("/get/:user", adminMiddleware, UserController.getConOne);

// Delte Route
routes.get("/delete/:id", bothAuthMiddleware, UserController.delete);

// Update Route
routes.put("/update/:id", bothAuthMiddleware, UserController.update);

// Update Route
routes.get("/check/:check", bothAuthMiddleware, UserController.getCheck);

// active and Deactive USer
routes.get("/active/:id", adminMiddleware, UserController.activate);

// Get One USer
routes.get("/spacific/", bothAuthMiddleware, UserController.getSpacificOne);

// Get One USer
routes.get("/profile", userMiddleware , UserController.getOne);

// Get One USer
routes.get("/:id", bothAuthMiddleware, UserController.getOne);

// Send OTP
routes.post("/otp", UserController.sendOtpForUsers);

// Send OTP
routes.post("/validateOtp", UserController.validateOtp);

//sendSMSOtpForUsers
// Send OTP
routes.post("/SMSotp", UserController.sendOtpSMSForUsers);

// Change Password
routes.post("/change-password", UserController.changePassword);

export default routes;
