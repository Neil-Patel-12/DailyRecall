// authRoutes.tsx

import { Route, Routes } from "react-router-dom"
import { Login } from "./Login"
import { Signup } from "./Signup"

export const AuthRoutes = () => {
    
    return (
        <Routes>
            <Route index element={<Signup />} />
            <Route path="signup/*" element={<Signup/>} />
            <Route path="login/*" element={<Login />} />
            
        </Routes>
    )
}