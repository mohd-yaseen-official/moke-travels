import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loginConfig } from "../../axiosConfig";
import { Helmet } from "react-helmet";
import { userDataContext } from "../../App";
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    let {updateUserData } = useContext(userDataContext);
    const [searchParam, setSearchParam] = useSearchParams()
    async function handleLogin(e) {
        setErrorMessage("");
        e.preventDefault();
        await loginConfig
            .post("/", { username, password })
            .then((response) => {
                console.log(response.data);
                let data = response.data;
                localStorage.setItem("user_data", JSON.stringify(data));
                updateUserData({type: "LOGIN", payload: data});
                
                alert("LOG IN SUCCESSFULL!");
                searchParam ? navigate( searchParam.get("next")) : navigate("/");

            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(
                    `${error.response.statusText}! ${error.response.data.detail}`
                );
            });
        setPassword("");
        setUsername("");
    }
    return (
        <div className="login-container">
            <Helmet>
                <title>Log In | Moke Travels</title>
            </Helmet>
            <h3>Login to your Account</h3>
            <p>Enter email and password to login</p>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <Link to="/auth/create/">Signup Now</Link>

                {errorMessage && <p>{errorMessage}</p>}

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;

// As we are creating the register with the help of traveller talrop api
// they require  email and password that we send during the signup
// So we created a form of the input of 2
//onChnage of the input we set State of each field to the value of input
// when we submit it will create a post request with the body password and email
// we specified the email as username because the api consider the email as username
// If its success we declared a variable called data and we stored the data to local storage of broswer
// after that we send an alert and navigated to home page
// if any error occurs it will be stored in the error message
// the JSX checks is there something in the error message, if yes it will display it as a <P>


//Now when we come back home we can see that its still syaing login
// go to app.js


// here we took the function from the context 
// first set the local storage and we set the userData state
//Go to signup and go to app