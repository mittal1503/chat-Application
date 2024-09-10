import "./App.css";
import React,{useRef, useState} from 'react'
import {useForm} from 'react-hook-form';
import axiosReq from '../utils/axios';
import {useNavigate} from'react-router-dom';
import { Alert, Stack } from "@mui/material";
export default function Login() {
  const{register,handleSubmit,formState:{errors},watch} = useForm();
    const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const password = useRef({})
  password.current = watch("password","")

 
  const onSubmit = async(data)=>{
    try{
     const response = await axiosReq.post("/api/user/login", data);
     
    if(response.data.error_message ) {
      setErrorMessage(response.data.error_message)
    }
    else if(response.data.err)
    {
       
        alert("something went wrong")
    }
    else{
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("token", response.data.user.jwtToken);
          localStorage.setItem("userId",response.data.user._id)
          navigate('/');
    }
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="form-global">
      <div className="form-container">
        <h3 className="form-field"> Admin Login</h3>
        {errorMessage && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity="error">{errorMessage}</Alert>
          </Stack>
        )}
        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="success-message">
          <div> Please check you Mail for verification and continue.. </div>
        </div> */}
          <input
            className="form-field"
            type="email"
            placeholder="Email"
            name="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <span id="email-error">Please enter an email address</span>
          )}
          <input
            className="form-field"
            type="password"
            placeholder="Password"
            name="password"
            {...register("password", {
              required: true,
              pattern: /^[a-zA-Z0-9]{3,30}$/,
            })}
          />
          {errors.password && (
            <span id="email-error">password must be filled and valid</span>
          )}

          <p>
            Already registered? <a href="/registration">Register</a>
          </p>
          <button className="form-field" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
