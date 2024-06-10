import { NextFunction, Request, Response } from "express";
class AuthMiddlewares{
    constructor(){}

    async auth(req: Request,res: Response, next: NextFunction)
    {
        if(req.url.includes("users")){
            console.log("Passei pelo middleware ...");
            next();
        }else{
            res.json({
                status: 401
            });
        }
    }

    async isAdmin(req: Request,res: Response, next: NextFunction)
    {
        if(req.url.includes("admin")){
            console.log("Admin");
            next();
        }else{
            res.json({
                status: 401,
                message: "Unauthorized"
            });
        }
    }

}
export default new AuthMiddlewares;