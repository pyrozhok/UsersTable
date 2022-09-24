import {
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import style from "./login.module.css";

type Inputs = {
  username: string;
  password: string;
};

const API_URL = "http://emphasoft-test-assignment.herokuapp.com";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{"username":"${data.username}","password":"${data.password}"}`,
    };

    fetch(`${API_URL}/api-token-auth/`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  };

  return (
    <div className={style.container}>
      <div className={style.title}>Log in</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container component="main">
          <TextField
            defaultValue=""
            {...register("username", {
              required: true,
              maxLength: 20,
            })}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            defaultValue=""
            {...register("password", { required: true, minLength: 6 })}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password (min 6 symbols)"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Container>
      </form>
    </div>
  );
};
export default Login;
