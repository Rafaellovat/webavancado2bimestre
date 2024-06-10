import { Router } from "express";
import CommentController from "../controllers/CommentController";
import AuthMiddlewares from "../middlewares/AuthMiddlewares";

const CommentRouter = Router();

CommentRouter.get("/api/comments", AuthMiddlewares.auth , CommentController.listPostComments);

CommentRouter.post("/api/comment", AuthMiddlewares.auth , CommentController.createPostComment);

CommentRouter.patch("/api/post/:id", AuthMiddlewares.auth , CommentController.updatePost);

CommentRouter.delete("/api/comments/:commentid", AuthMiddlewares.auth , CommentController.deletePostComment);

export default CommentRouter;