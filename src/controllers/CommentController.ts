import { Request, Response } from "express";
import CommentDataBaseService from "../services/CommentDataBaseService";

class CommentController {
  constructor() {}

  async listComments(req: Request, res: Response) {
    try {
      const comments = await CommentDataBaseService.listDBComments();
      res.json({
        status: "ok",
        comments: comments,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async createComment(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    if (!body.content || !body.postId || !body.authorId) {
      res.json({
        status: "error",
        message: "Faltam parâmetros",
      });
      return;
    }

    try {
      const newComment = await CommentDataBaseService.insertDBComment({
          content: body.content,
          post: {
              create: undefined,
              connectOrCreate: undefined,
              connect: undefined
          },
          author: {
              create: undefined,
              connectOrCreate: undefined,
              connect: undefined
          }
      });
      res.json({
        status: "ok",
        newComment: newComment,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async updateComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
      return;
    }

    const { content } = req.body;
    if (!content) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
      return;
    }

    try {
      const updatedComment = await CommentDataBaseService.updateDBComment(
        {
          content: content,
        },
        parseInt(id)
      );
      res.json({
        status: "ok",
        updatedComment: updatedComment,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async deleteComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
      return;
    }

    try {
      await CommentDataBaseService.deleteDBComment(parseInt(id));
      res.json({
        status: "ok",
        message: "Comentário deletado com sucesso",
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }
}

export default new CommentController();
