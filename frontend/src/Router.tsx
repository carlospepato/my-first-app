import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { CreateAccount } from "./pages/createAccount";
import { ChangePassword } from "./pages/changePassword";

export function Router(){
    return(
        <Routes>
            <Route>
                <Route path="/" element={<Login/>}></Route>
                <Route path="createaccount" element={<CreateAccount/>}></Route>
                <Route path="changepassword" element={<ChangePassword/>}></Route>
                <Route path="login" element={<Login/>}></Route>
                <Route path="home" element={<Home/>}></Route>
            </Route>
        </Routes>
    )
}