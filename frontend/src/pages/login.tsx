import logo from '../assets/Logo.png';
import {Link} from 'react-router-dom';
import { LoginForm } from './components/loginForm';

export function Login(){

    return(
        <div className="max-w-5xl mx-auto my-4 flex flex-col">
            <div className= "justify-center items-center flex h-60">
                <img src={logo} alt="logo TodoList" />
            </div>
            <div className="flex flex-col w-[30rem] gap-4 mx-auto mt-20">
                <div className="flex flex-col justify-center items-center gap-4">
                    <h1 className="text-3xl font-bold text-center text-sky-500">Login</h1>
                    <LoginForm/>
                    <div className='flex w-full justify-between items-center'>
                        <p className="text-zinc-200">Forget your password? <Link to="/changepassword" className="text-sky-500 underline">Change</Link></p>
                        <p className="text-zinc-200">Don't have an account? <Link to="/createaccount" className="text-sky-500 underline">Sign up</Link></p>
                    </div>
                </div>
            </div>        
        </div>
    )
}