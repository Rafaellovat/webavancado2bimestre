import { Router } from "express";
import UserController from "../controllers/UserController";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

const UserRouter = Router();


//UserRouter.get("/api/users", authMiddlewares.auth ,authMiddlewares.isAdmin , UserController.listUsers);
UserRouter.get("/api/users", AuthMiddlewares.auth , UserController.listUsers);

UserRouter.post("/api/user", AuthMiddlewares.auth ,UserController.createUser);

UserRouter.patch("/api/user/:id", AuthMiddlewares.auth , UserController.updateUser);

UserRouter.delete("/api/user/:id", AuthMiddlewares.auth ,UserController.deleteUser);

export default UserRouter;
