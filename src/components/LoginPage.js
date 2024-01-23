
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Box,
  Paper,
} from "@mui/material";
import { Toaster } from "react-hot-toast";
import logoImage from "../Logos/logo-no-background.png";
import { useDispatch} from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {loginAction} from "../actions/authActions"

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate()
  

  // const loading = useSelector(state=> state.authReducer.loading)
  

  const handleMobileNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); 
    setMobileNumber(input);
    const isValid = /^\d{10}$/.test(input);
    setMobileNumberError(!isValid);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      mobile: mobileNumber,
      password: password
    }
    dispatch(loginAction(userData, navigate))
  };
  

  return (
    <>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            border: "1px solid #ddd",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <img
            src={logoImage}
            alt="Logo"
            style={{ width: "150px", marginBottom: "16px" }}
          />
          <Typography component="h1" variant="h4" sx={{ textAlign: "left" }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="mobileNumber"
              label="Mobile Number"
              name="mobileNumber"
              autoComplete="tel"
              autoFocus
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              error={mobileNumberError}
              helperText={mobileNumberError ? 'Please enter a valid 10-digit number' : ''}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <Button
                    onClick={handleTogglePasswordVisibility}
                    color="primary"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              // disabled={loading}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
    <Toaster
                position="top-center"
                reverseOrder={true}
            />
    </>
  );
};

export default Login;

// import { useDispatch } from "react-redux";
// import { login } from "../actions/authActions";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import Card from "react-bootstrap/Card";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// const LoginPage = () => {
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     dispatch(login(mobile, password));
//     navigate("/dashboard");
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <Card style={{ width: "400px" }}>
//         <Card.Body>
//           <Card.Title className="text-center">Login</Card.Title>
//           <Form>
//             <Form.Group controlId="formMobile">
//               <Form.Label>Mobile</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter your mobile number"
//                 value={mobile}
//                 onChange={(e) => setMobile(e.target.value)}
//               />
//             </Form.Group>

//             <Form.Group controlId="formPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <div
//                 style={{
//                   position: "absolute",
//                   right: "20px",
//                   top: "70%",
//                   transform: "translateY(-60%)",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//               </div>
//             </Form.Group>
//             <Button
//               variant="primary"
//               type="button"
//               onClick={handleLogin}
//               className="w-100"
//             >
//               Login
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;