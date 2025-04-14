import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerConfig } from "../../axiosConfig";
import { Helmet } from "react-helmet";
import { userDataContext } from "../../App";
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    let { updateUserData } = useContext(userDataContext);

    async function handleRegister(e) {
        setErrorMessage("");
        e.preventDefault();
        await registerConfig
            .post("/", { email, password, name: name })
            .then((response) => {
                console.log(response.data);

                if (response.data.status === 2200) {
                    let data = response.data.token;
                    localStorage.setItem("user_data", JSON.stringify(data));

                    updateUserData({ type: "LOGIN", payload: data });

                    navigate("/");
                    // alert(response.data.message);
                } else {
                    setErrorMessage(
                        `${response.data.message}!`
                    );
                }
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage(
                    `${error.response.statusText}! ${error.response.data.detail}`
                );
            });
        setPassword("");
        setName("");
        setEmail("");
    }
    return (
        <div className="register-container">
            <Helmet>
                <title>Register | Moke Travels</title>
            </Helmet>
            <h3>Register into Account</h3>
            <p>Create an account to acccess all the features</p>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <Link to="/auth/login/">Login Now</Link>

                {errorMessage && <p>{errorMessage}</p>}

                <button type="submit">Create an Account</button>
            </form>
        </div>
    );
}

export default Register;

// As we are creating the register with the help of traveller talrop api
// they require name email and password
// So we created a form of the input of 3
//onChnage of the input we set State of each field to the value of input
// when we submit it will create a post request with the body name password and email
// we specified first_name because in the api the name is configured as first_name
// and there is a problem if an error occurs the api is not sending the error message as error
// instead it is sending the response of error with status code 6001
// So we checked if the statusCode 6000 which is success and declared a variable called data and we stored the data to local storage of broswer
// after that we send an alert and navigated to home page
// if any error occurs it will be stored in the error message
// the JSX checks is there something in the error message, if yes it will display it as a <P>

// Go To Login 


// here we took the function from the context 
// first set the local storage and we set the userData state