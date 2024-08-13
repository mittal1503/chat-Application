import "./App.css";
import React,{useRef, useState} from 'react'
import {useForm} from 'react-hook-form';
import axiosReq from '../utils/axios';
import {useNavigate} from'react-router-dom';
import { Alert, Stack } from "@mui/material";
import { validationPattern } from "../constants/validation";
export default function AdminRegister() {
  const{register,handleSubmit,formState:{errors},watch} = useForm();
    const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const password = useRef({})
  password.current = watch("password","")


  const onSubmit = async(data)=>{
    const {confirmPassword,...formData} = data;
    const formdata = {...data,role:"ADMIN"}

    try{
     const response = await axiosReq.post("/api/user/register", formdata);

   
     if(response.data.error_message ) {
      setErrorMessage(response.data.error_message)
    }
    else if(response.data.err)
    {
        alert("something went wrong")
    }
    else{
          navigate('/login');
    }
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="form-container">
      <h3 className="form-field"> Admin Registration</h3>
      {errorMessage && (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">{errorMessage}</Alert>
        </Stack>
      )}
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
          {...register("firstname", { required: true, minLength: 3 })}
        />
        {errors.firstname && (
          <span id="first-name-error">
            First Name is required and must be more than 3 char
          </span>
        )}

        <input
          className="form-field"
          type="text"
          placeholder="Last Name"
          name="lastname"
          {...register("lastname", { required: true, minLength: 3 })}
        />

        {errors.lastname && (
          <span id="first-name-error">
            Last Name is required and must be more than 3 char
          </span>
        )}

        <input
          className="form-field"
          type="email"
          placeholder="Email"
          name="email"
          {...register("email", { required: true, pattern: validationPattern.EmailValidation })}
        />
        {errors.email && (
          <span id="email-error">Please enter valid email address</span>
        )}

        <input
          className="form-field"
          type="password"
          placeholder="Password"
          name="password"
          {...register("password", {
            required: true,
            pattern: validationPattern.passwordValidation,
          })}
        />
        {errors.password && (
          <span id="email-error">Password must be filled and valid</span>
        )}

        <input
          className="form-field"
          type="password"
          placeholder="confirmPassword"
          name="confirmPassword"
          {...register("confirmPassword", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />

        {errors.confirmPassword && (
          <span id="email-error">
            Password and confirm password must be same{" "}
          </span>
        )}

        <button className="form-field" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
