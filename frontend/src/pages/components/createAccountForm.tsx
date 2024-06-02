import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const accountSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20)
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"]
});

type AccountSchema = z.infer<typeof accountSchema>;

export function CreateAccountForm(){

    const { register, handleSubmit, formState:{ errors } } = useForm<AccountSchema>({
        resolver: zodResolver(accountSchema)
    });

    function handleSubmitForm(data: AccountSchema){
        console.log(data);

    }

    return(
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit(handleSubmitForm)}>
            <input 
                type="text"
                placeholder="Name"
                className="bg-zinc-900 border-2 border-zinc-800 p-2 rounded-lg text-zinc-200 focus:outline-none"
                {...register("name")}
            />
            {errors.name && <span className="text-red-600">Name must be at least 3 characters</span>}
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
            <input 
                type="password"
                placeholder="Confirm Password"
                className="bg-zinc-900 border-2 border-zinc-800 p-2 rounded-lg text-zinc-200 focus:outline-none"
                {...register("confirmPassword")}
            />
            {errors.confirmPassword && <span className="text-red-600">Passwords must match</span>}
            <button
                type="submit"
                className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-700">Criar conta
            </button>
        </form>
    )
}