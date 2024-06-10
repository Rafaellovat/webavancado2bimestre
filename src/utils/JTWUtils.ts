import jwt from "jsonwebtoken";

async function generationToken() {
    return jwt.sign({user: "teste"}, "secret");
    
}