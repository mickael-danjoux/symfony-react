import React, {useState, useContext} from 'react';
import InputField from "../components/forms/InputField";
import AuthAPI from "../sevices/AuthAPI";
import AuthContext from "../contexts/AuthContext";


const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState(false)

    const handleChange = ({currentTarget}) => {
        const { value, name } = currentTarget;
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthAPI.login(credentials)
            setError(false);
            setIsAuthenticated(true);
            history.replace('/people')
        } catch (e) {
            setError(true);
        }
    }

    return (
        <>
            <h1>Login</h1>

            {error &&
                <div className="container">
                    <div className="alert alert-danger">
                        <p>Invalid credentials</p>
                    </div>
                </div>
            }

            <form>
                <InputField
                    type="email"
                    name="username"
                    label="Email"
                    placeholder="Enter your email"
                    value={credentials.username}
                    onChange={handleChange}
                />
                <InputField
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
                />

                <button className="btn btn-success" onClick={handleSubmit}>Log In</button>

            </form>
        </>
    );
};

export default LoginPage;