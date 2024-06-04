import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { config } from "../../../config.ts";

const passwordSchema = z.object({
    email: z.string().email(),
    newPassword: z.string().min(6).max(20),
    confirmNewPassword: z.string().min(6).max(20)
}).refine(data => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

type PasswordSchema = z.infer<typeof passwordSchema>;

export function ChangePassoword(){
    const navigate = useNavigate();
    const {register, handleSubmit, formState:{ errors }} = useForm<PasswordSchema>({
        resolver: zodResolver(passwordSchema)
    });

    async function handleSubmitForm(data: PasswordSchema){
        console.log(data);
        try{
            const baseUrl = config.backendUrl;
            const response = await fetch(`${baseUrl}/changepassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if(response.status === 200){
                console.log("Password changed successfully");
                navigate("/login");
            }else {
                const errorData = await response.json();
                alert(errorData.message);
                console.log(response.status + " " + errorData.message);
            }
        }catch(error){
            console.error(error);
        }
    }

    return(
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(handleSubmitForm)}>
            <input 
                type="email"
                placeholder="email"
                className="bg-zinc-900 border-2 border-zinc-800 p-2 rounded-lg text-zinc-200 focus:outline-none"
                {...register("email")}
                />
                {errors.email && <span className="text-red-600">Invalid email address</span>}
            <input 
                type="password"
                placeholder="New Password"
                className="bg-zinc-900 border-2 border-zinc-800 p-2 rounded-lg text-zinc-200 focus:outline-none"
                {...register("newPassword")}
                />
                {errors.newPassword && <span className="text-red-600">Password must be between 6 and 20 characters</span>}
            <input 
                type="password"
                placeholder="Confirm New Password"
                className="bg-zinc-900 border-2 border-zinc-800 p-2 rounded-lg text-zinc-200 focus:outline-none"
                {...register("confirmNewPassword")}
                />
                {errors.confirmNewPassword && <span className="text-red-600">Passwords do not match</span>}
            <button
                type="submit"
                className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-700">Change Password
            </button>
        </form>
    )
}