import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20)
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

type PasswordSchema = z.infer<typeof passwordSchema>;

export function ChangePassoword(){

    const {register, handleSubmit, formState:{ errors }} = useForm<PasswordSchema>({
        resolver: zodResolver(passwordSchema)
    });

    function handleSubmitForm(data: PasswordSchema){
        console.log(data);
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
                {...register("password")}
                />
                {errors.password && <span className="text-red-600">Password must be between 6 and 20 characters</span>}
            <input 
                type="password"
                placeholder="Confirm New Password"
                className="bg-zinc-900 border-2 border-zinc-800 p-2 rounded-lg text-zinc-200 focus:outline-none"
                {...register("confirmPassword")}
                />
                {errors.confirmPassword && <span className="text-red-600">Passwords do not match</span>}
            <button
                type="submit"
                className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-700">Change Password
            </button>
        </form>
    )
}