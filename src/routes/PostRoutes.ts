import { Router } from "express";
import PostController from "../controllers/PostController";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

const PostRouter = Router();

PostRouter.get("/api/comments", AuthMiddlewares.auth , PostController.listPostComments);

PostRouter.post("/api/comment", AuthMiddlewares.auth , PostController.createPostComment);

PostRouter.patch("/api/post/:id", AuthMiddlewares.auth , PostController.updatePost);

PostRouter.delete("/api/comments/:commentid", AuthMiddlewares.auth , PostController.deletePostComment);

export default PostRouter;