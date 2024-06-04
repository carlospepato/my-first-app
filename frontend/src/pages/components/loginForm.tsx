import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
//import { config } from "../../../config.ts";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20)
})

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginForm(){
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{ errors } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    async function handleSubmitForm(data: LoginSchema){
        console.log(data);
        try{
            const baseUrl = "https://todo-app-gsc5.vercel.app";
            const response = await fetch(`${baseUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if(response.status === 200){
                console.log("Login successful");
                navigate("/home");
            }else{
                alert("Invalid email or password")
                console.log(response.status + "Invalid email or password");
            }
        }catch(error){
            console.error(error);
        }
    }

    return(
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(handleSubmitForm)}>
            <input 
                type="email"
                placeholder="Email"
                className="bg-zinc-900 border-2 border-zinc-800 p-2 rounded-lg text-zinc-200 focus:outline-none"
                {...register("email")}
                />
            {errors.email && <span className="text-red-600">Invalid email address</span>}
            <input 
                type="password"
                placeholder="Password"
                className="bg-zinc-900 border-2 border-zinc-800 p-2 rounded-lg text-zinc-200 focus:outline-none"
                {...register("password")}
                />
            {errors.password && <span className="text-red-600">Password must be between 6 and 20 characters</span>}
            <button type="submit" className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-700">Login</button>
        </form>
    )
}