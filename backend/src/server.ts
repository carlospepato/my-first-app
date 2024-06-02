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

server.get("/test", async (request, reply) => {
    try{
        reply.status(200).send({message: "API is running"});
    }catch (error){
        reply.status(500).send({message: "API is not running"});
    }
});

server.get("/users", async (request, reply) => {
    const users = await prisma.user.findMany();
    reply.status(200).send(users);
});

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
    return {id : user.id}

});

server.listen({port: 3333}).then(() =>{
    console.log("Server is running on http://localhost:3333");
});
