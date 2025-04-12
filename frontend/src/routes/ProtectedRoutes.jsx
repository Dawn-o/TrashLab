import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axiosInstance";
import MainLayout from "../layouts/MainLayout";

const ProtectedRoute = ({ children }) => {
    const [auth, setAuth] = useState(null); // null = loading, true/false = udah dicek

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                setAuth(false);
                return;
            }

            try {
                const res = await axios.get("/profile");
                console.log("res.data =>", res.data);

                if (res.data.profile || res.data.data?.profile) {
                    setAuth(true);
                } else {
                    setAuth(false);
                }
            } catch (err) {
                console.log("ERROR GET /profile:", err.response?.data || err.message);
                setAuth(false);
            }
        }

        verifyToken();
    }, []);

    if (auth === null) return <MainLayout><div className="fixed top-[50%] left-[50%]">Loading...</div></MainLayout>; 
    if (!auth) return <Navigate to="/login" />;

    return children; // token valid → masukin
};

export default ProtectedRoute;