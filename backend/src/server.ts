import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client"
import { z } from "zod";

const prisma = new PrismaClient({ log: ["query"]});
const server = fastify({ logger: true });
server.register(cors,{
    //origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
});

// verifica se existe um user no banco de dados e se a senha está correta.
// Caso esteja tudo certo, retorna um status 200 e a mensagem "Login successful".
server.post("/login", async (request, reply) => {
    const userSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(20)
    });

    const data = userSchema.parse(request.body);
    try{
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if(user && user.password === data.password){
            reply.status(200).send({message: "Login successful"});
        }else{
            reply.status(401).send({message: "Invalid email or password"});
        }
    }catch (error){
        reply.status(500).send({message: "API is not running"});
    }
});

// Altera a senha do usuário fora da area logada.
server.put("/changepassword", async (request, reply) => {
    const userSchema = z.object({
        email: z.string().email(),
        newPassword: z.string().min(6).max(20),
    });
    console.log("Request body:", request.body);
    const data = userSchema.parse(request.body);
    console.log("Parsed data:", data)
    try{
        const user = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        });
        if (!user) {
            // Retornar erro se o usuário não for encontrado
            return reply.status(404).send({ message: "User not found" });
        }
        const updatedUser = await prisma.user.update({
            where: {
                email: data.email
            },
            data: {
                password: data.newPassword,
                updatedAt: new Date()
            }
        });
        reply.status(200).send(updatedUser);
    }catch (error){
        console.error("There was an error processing the request:", error);
        reply.status(500).send({ message: "Internal server error" });
    }
});


// Retorna todos os usuários cadastrados no banco de dados.
server.get("/users", async (request, reply) => {
    const users = await prisma.user.findMany();
    reply.status(200).send(users);
});

// Cadastra um novo usuário no banco de dados.
server.post("/users", async (request, reply) => {
    const userSchema = z.object({
        name: z.string().min(3).max(50),
        email: z.string().regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        password: z.string().min(6).max(20)
    });

    const data = userSchema.parse(request.body);
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
    return reply.status(201).send(user);

});

server.listen({port: 3333}).then(() =>{
    console.log("Server is running on http://localhost:3333");
});
