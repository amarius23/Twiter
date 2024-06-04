import React from "react";
import { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginForm = (props) => {
    const [username, setUsername]  = useState('');
    const [password, setPassword] = useState('');
    const {updateUser,updateToken} = props;
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/login",
            {
                username: username,
                password:password
            }
        ).then(response => {
            if (response.data.data.success === true) {
                const user =  response.data.data.user;
                const token = response.data.data.token;

                updateUser(user);
                updateToken(token);
                useNavigate
                
                 // Store user and token in localStorage
                 localStorage.setItem('user', JSON.stringify(user));
                 localStorage.setItem('token', token);
                navigate('/')
            }
            else {
                console.log(response.data.message);
            }
            
            
        }).catch (error => {
            console.log(error);  
         })
    }
    return <div>
        <p className="h2">Login</p>
            <form className="form-control" onSubmit={submit}>
                <label className="form-label" >
                    Username
                    <input className="form-control" type="text" onChange={(e)=>setUsername(e.target.value)} value={username}/>
                </label>
                <label className="form-label">
                    Password
                    <input className="form-control" type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </label>
                <button className="btn btn-primary" role="submit">Submit</button>
            </form>
        </div>
}
LoginForm.propTypes = {
    updateToken: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
}
export default LoginForm;