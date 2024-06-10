import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { generateHash } from "../utils/BcryptUtils";

class AuthController {
    constructor() { }

    async signUp(req: Request, res: Response) {
        const body = req.body;
        console.log(body);

        if (!body.email || !body.name || !body.password) {
            res.json({
                status: "error",
                message: "Falta parâmetros",
            });
            return;
        }

        const hashPassword = await generateHash(body.password);

        if (!hashPassword) {
            res.json({
                status: "error",
                message: "Erro ao criptografar senha ...",
            });
        }

        try {
            const newuser = await AuthService.signUp({
                name: body.name,
                email: body.email,
                password: hashPassword as string
            });
            res.json({
                status: "ok",
                newuser: newuser,
            });
        } catch (error) {
            res.json({
                status: "error",
                message: error,
            });
        }
    }

    async signIn(req: Request, res: Response) {
        const { email, password } = req.body;
    
        try {
            const token = await AuthService.signIn(email) && AuthService.signIn(password)
            if (token) {
                res.json({
                    status: "ok",
                    token: token,
                });
            } else {
                res.status(401).json({
                    status: "error",
                    message: "Credenciais inválidas",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "error",
                message: "Erro ao realizar o login",
            });
        }
    }
    
    async signOut(req: Request, res: Response) {
        // Aqui, você pode adicionar qualquer lógica necessária para limpar a sessão do usuário
        // Por exemplo, invalidar o token de autenticação, remover informações da sessão, etc.
        res.json({
            status: "ok",
            message: "Usuário desconectado com sucesso",
        });
    }
}