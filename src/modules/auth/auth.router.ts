import { Router } from "express";
import validateRequst from "../../Middlewares/validateRequest";
import { userValidation } from "./auth.validation";
import { authController } from "./auth.controller";




const authRouter = Router()

authRouter.post('/register',  validateRequst(userValidation.createUserValidationSchema), authController.register)
authRouter.post('/login', validateRequst(userValidation.loginValidaton),  authController.login )
authRouter.post('/refresh-token',  authController.getRefreshToken)

export default authRouter; 