import { Outlet,Navigate } from "react-router-dom";

const PrivateRoute = () =>{
    const token = localStorage.getItem('token');
    if(!token){
        console.log("token not found")
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}

export default PrivateRoute;