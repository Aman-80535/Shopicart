import React, { useState, useEffect } from "react";
import { waitForUser } from "./redux/user/userActions";
import { LogIn } from "./components/Login";

// const ProtectedRoute = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(true);

// useEffect(() => {
//     const checkUser = async () => {
//         try {
//             const currentloginUser = await waitForUser();
//             console.log("User fetched:", currentUser);
//             setCurrentUser(currentloginUser);
//         } catch (error) {
//             console.error("Error fetching user:", error);
//             setCurrentUser(null);
//         } finally {
//             setLoading(false); 
//         }
//     };

//     checkUser();
// }, []);

//     if (loading) {
//         console.log("Loading user...");
//         return <div>Loading...</div>;  
//     }

//     if (!currentUser) {
//         console.log("User not found, redirecting...");
//         return <Navigate to="/login" replace />;
//     }

//     return children;
// };

// export default ProtectedRoute;



// export const PublicRoute = ({ Component }) => {
//     const token = localStorage.getItem("authToken");
//     return token ? <Navigate to="/dashboard" replace /> : <Component />;
//   };

export const PrivateRoute = ({ Component }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const currentloginUser = await waitForUser();
                console.log("User fetched:", currentUser);
                setCurrentUser(currentloginUser);
            } catch (error) {
                console.error("Error fetching user:", error);
                setCurrentUser(null);
            }
        };

        checkUser();
    }, []);

    return currentUser ? <Component /> : <LogIn />;
};


