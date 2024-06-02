import fastify from "fastify";
import cors from "@fastify/cors";

const server = fastify({ logger: true });
server.register(cors,{
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
});

server.get("/users", async (req, res) => {
    return {users: ["Alice", "Bob", "Charlie"]};
});

server.listen({port: 3333}).then(() =>{
    console.log("Server is running on http://localhost:3333");
});
