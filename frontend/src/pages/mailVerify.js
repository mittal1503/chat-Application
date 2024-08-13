import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
export const MailVerify = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Your Email verified successfully !!</div>
      <Button variant="outlined" style={{margin:"10px"}} onClick={()=>navigate('/login')}>Go to Login</Button>
    </>
  );
};
