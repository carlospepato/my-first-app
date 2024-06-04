import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: join(__dirname, '..', '.env') });

console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('PORT:', process.env.PORT);

import fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient({ log: ["query"] });
const server = fastify({ logger: true });

server.register(cors, {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
});

server.post("/login", async (request, reply) => {
    const userSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(20),
    });

    const data = userSchema.parse(request.body);
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (user && user.password === data.password) {
            reply.status(200).send({ message: "Login successful" });
        } else {
            reply.status(401).send({ message: "Invalid email or password" });
        }
    } catch (error) {
        reply.status(500).send({ message: "API is not running" });
    }
});

server.put("/changepassword", async (request, reply) => {
    const userSchema = z.object({
        email: z.string().email(),
        newPassword: z.string().min(6).max(20),
    });

    const data = userSchema.parse(request.body);
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            return reply.status(404).send({ message: "User not found" });
        }
        const updatedUser = await prisma.user.update({
            where: {
                email: data.email,
            },
            data: {
                password: data.newPassword,
                updatedAt: new Date(),
            },
        });
        reply.status(200).send(updatedUser);
    } catch (error) {
        console.error("There was an error processing the request:", error);
        reply.status(500).send({ message: "Internal server error" });
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
        password: z.string().min(6).max(20),
    });

    const data = userSchema.parse(request.body);
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: data.password,
        },
    });
    return reply.status(201).send(user);
});

const start = async () => {
    try {
        const port = process.env.PORT || 3333;
        await server.listen({ port: Number(port), host: '0.0.0.0' });
        console.log(`Server is running on port ${port}`);
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
