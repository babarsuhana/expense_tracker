import { Navigate } from "react-router-dom";


function PrivateRoutes({ children }) {
    const isloggedIn = localStorage.getItem("user");

    if (!isloggedIn) {
        return <Navigate to="/login" replace/>
    }

    return children;
}

export default PrivateRoutes; 
