import { Request, Response } from "express";
import PostDataBaseService from "../services/PostDataBaseService";

class PostController {
  constructor() {}

  async listPosts(req: Request, res: Response) {
    try {
      const posts = await PostDataBaseService.listDBPosts();
      res.json({
        status: "ok",
        posts: posts,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async createPost(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    if (!body.title || !body.content || !body.authorId) {
      res.json({
        status: "error",
        message: "Faltam parâmetros",
      });
      return;
    }

    try {
      const newPost = await PostDataBaseService.insertDBPost({
          title: body.title,
          author: {
              create: undefined,
              connectOrCreate: undefined,
              connect: undefined
          }
      });
      res.json({
        status: "ok",
        newPost: newPost,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async updatePost(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
      return;
    }

    const { title, content } = req.body;
    if (!title && !content) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
      return;
    }

    try {
      const updatedPost = await PostDataBaseService.updateDBPost(
        {
          title: title,
          content: content,
        },
        parseInt(id)
      );
      res.json({
        status: "ok",
        updatedPost: updatedPost,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async deletePost(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
      return;
    }

    try {
      await PostDataBaseService.deleteDBPost(parseInt(id));
      res.json({
        status: "ok",
        message: "Post deletado com sucesso",
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

export default new PostController();
