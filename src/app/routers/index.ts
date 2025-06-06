import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { UserRoutes } from "../modules/User/user.routes";

const router = express.Router();


router.use("/auth", AuthRoutes )
router.use("/users", UserRoutes )


export default router;
