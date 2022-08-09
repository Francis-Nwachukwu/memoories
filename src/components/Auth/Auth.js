import React, { useState, useCallback } from "react";
import {
  Avatar,
  Paper,
  Button,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import People from "@mui/icons-material/People";
import { Alert } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { signin, signup } from "../../actions/auth";
import * as api from "../../api/index";

import Input from "./Input";

import useStyles from "./styles";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [hasError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history, setError, setErrorMsg));
    } else {
      dispatch(signin(formData, history, setError, setErrorMsg));
    }
  };

  const handleChange = (e) => {
    setError(false);
    setErrorMsg("");
    setFormData({ ...formData, [e.target.name]: e.target.value }); //gets the data off the formData obj but changes only the name of the specific input
  };
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const googleSuccess = (res) => {
    const decoded = jwt_decode(res.credential);

    const { email, family_name, given_name, sub, picture, name } = decoded;
    const result = {
      email: email,
      familyName: family_name,
      givenName: given_name,
      _id: sub,
      imageUrl: picture,
      name: name,
    };
    dispatch({ type: "AUTH", data: { result, token: res.credential } });
    history("/");
  };
  const googleFailure = (err) => {
    console.log(err);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <People />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        {hasError && (
          <Alert variant="outlined" severity="error">
            {errorMsg}
          </Alert>
        )}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup ? (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            ) : null}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />

            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          {/* <Grid container spacing={2} justifyContent="center"> */}
          <Grid container style={{ margin: `10px 0` }}>
            <GoogleLogin
              context="use"
              theme="filled_black"
              onSuccess={googleSuccess}
              onError={googleFailure}
            />

            {/* <Button
            className={classes.googleButton}
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => googleLogin()}
            // startIcon={<Icon />}
          >
            Google Sign In
          </Button> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid items="true">
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
export default Auth;
