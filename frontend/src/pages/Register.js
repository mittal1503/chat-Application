import "./App.css";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axiosReq from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Stack } from "@mui/material";
import { validationPattern } from "../constants/validation";
import axios from "axios";
export default function AdminRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const [errorMessage, setErrorMessage] = useState();
  const [imgError,setImageError] = useState(null)
  const [image,setImage] = useState(null);
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    setErrorMessage(null);
    const file = image;
    if(!file){
      setImageError("Please select an image")
      return;
    }
    if (file.type !== "image/jpeg" || file.type !== "image/jpeg") {
      setImageError('Image is not valid')
      return;
    }
    else{
      setIsLoading(true)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "chat-app");
      formData.append("cloud_name", "ddoaygdtm");
      setImageError(null);
        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/ddoaygdtm/image/upload",
            formData
          );
          let formdata = {
            ...data,
            image: res.data.secure_url,
            role: "ADMIN",
          };

          const response = await axiosReq.post("/api/user/register", formdata);
          if(response)
          {
            setIsLoading(false)
          }
          if (response.data.error_message) {
            setErrorMessage(response.data.error_message);
    
          } else if (response.data.err) {
            alert("something went wrong");
            
          } else {
           
            navigate("/login");
          }
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }
    }
  };
  return (
    <>
      <div className="form-global">
        <div className="form-container">
          <h3 className="form-field">Registration</h3>
          {errorMessage && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert severity="error">{errorMessage}</Alert>
            </Stack>
          )}
          {isLoading && (
            <div className="loader">
              <div className="face">
                <div className="circle"></div>
              </div>
              <div className="face">
                <div className="circle"></div>
              </div>
            </div>
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
              {...register("email", {
                required: true,
                pattern: validationPattern.EmailValidation,
              })}
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
            <label className="form-field" for="image">
              Upload Profile Image
            </label>
            <input
              className="form-field"
              type="file"
              name="image"
              placeholder="Upload image"
              onChange={(event) => setImage(event.target.files[0])}
            />
            {imgError && <span id="email-error">Image must be valid file</span>}
            <p>Alreday have an account? <a href="/login">Login</a></p>
            <button className="form-field" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
