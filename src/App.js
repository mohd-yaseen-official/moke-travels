import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useLocation,
} from "react-router-dom";
import Home from "./components/screens/Home";
import ViewPlace from "./components/screens/viewPlace";
import NotFound from "./components/screens/NotFound";
import { Helmet } from "react-helmet";
import Register from "./components/addons/Register";
import Login from "./components/addons/Login";
import Auth from "./components/screens/Auth";
import React, { createContext, useEffect, useState } from "react";
import Loader from "./components/addons/Loader";

export const userDataContext = createContext();

function App() {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserData = localStorage.getItem("user_data");
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
        setLoading(false);
    }, []);

    const updateUserData = (action) => {
        switch (action.type) {
            case "LOGOUT":
                setUserData(null);
                localStorage.clear();
                break;
            case "LOGIN":
                setUserData(action.payload);
                localStorage.setItem(
                    "user_data",
                    JSON.stringify(action.payload)
                );
                break;
            default:
                break;
        }
    };

    function RequireAuth({ children }) {
        const { userData } = React.useContext(userDataContext);
        const location = useLocation();

        if (!userData?.access) {
            
            const redirectTo = {
                pathname: "/auth/login",
                search: `?next=${location.pathname}`
            };
            return <Navigate to={redirectTo} replace />;
            
        }else{
            return children;
        }

        
    }

    return loading ? (
        <Loader />
    ) : (
        <userDataContext.Provider value={{ userData, updateUserData }}>
            <Router>
                <Helmet>
                    <title>Places | Moke Travel</title>
                    <link
                        rel="shortcut icon"
                        href={require("./components/assets/images/favicon.ico")}
                        type="image/x-icon"
                    />
                </Helmet>

                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/places/:id"
                        element={
                            <RequireAuth>
                                <ViewPlace />
                            </RequireAuth>
                        }
                    />

                    <Route path="/auth" element={<Auth />}>
                        <Route path="create" element={<Register />} />
                        <Route path="login" element={<Login />} />
                    </Route>

                    <Route path="/loader" element={<Loader />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </userDataContext.Provider>
    );
}

export default App;
