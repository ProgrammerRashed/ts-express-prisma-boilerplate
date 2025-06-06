import express from "express";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { UserRoutes } from "../modules/User/user.routes";


const router = express.Router();

const moduleRouter = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));

export default router;
