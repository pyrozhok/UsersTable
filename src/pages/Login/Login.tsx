import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../services/auth-header";
import { setAuthHeader, setLoggedIn } from "../../services/auth.service";
import { login } from "../../services/auth.service";
import style from "./login.module.css";

type Inputs = {
  username: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);
  const authorized = isLoggedIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    document.title = "EmphaSoft Demo App - Log in";
  }, []);

  const onSubmit: SubmitHandler<Inputs> = data => {
    setLoading(true);
    setError(null);
    login(data.username, data.password)
      .then(response => {
        if (response.ok) {
          response.json().then(body => {
            setAuthHeader(body.token);
            setLoggedIn();
            navigate("/users");
          });
        } else {
          if (response.status !== 404) {
            response.json().then(body => {
              const errorMessages = Object.keys(body).map(key => body[key]);
              console.log(errorMessages);
              setError(errorMessages);
            });
          } else setError(["Entire error"]);
          setLoading(false);
          throw Error(response.statusText);
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {authorized ? (
        <Navigate to="/users" />
      ) : (
        <div className={style.container}>
          <div className={style.title}>
            <Typography variant="h2" component="h1" gutterBottom>
              Log in
            </Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Container component="main">
              <TextField
                defaultValue=""
                {...register("username", {
                  required: "Username is required",
                })}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                error={errors.username?.message.length > 0 ? true : false}
                helperText={errors.username ? errors.username.message : ""}
              />
              <TextField
                defaultValue=""
                {...register("password", { required: "Password is required" })}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={errors.password?.message.length > 0 ? true : false}
                helperText={errors.password ? errors.password.message : ""}
              />
              {error &&
                error.map((message, index) => (
                  <Alert key={index} severity="error">
                    {message}
                  </Alert>
                ))}
              <div className={style.submit}>
                <Button
                  disabled={loading}
                  onClick={handleSubmit(onSubmit)}
                  fullWidth
                  variant="contained"
                >
                  Sign In
                </Button>
              </div>
            </Container>
          </form>
        </div>
      )}
    </>
  );
};
export default Login;
