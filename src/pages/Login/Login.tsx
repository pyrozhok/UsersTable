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
  email: string;
  password: string;
};

const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <div className={style.container}>
      <div className={style.title}>Log in</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container component="main">
          <TextField
            defaultValue=""
            {...register("email", {
              required: true,
              maxLength: 320,
              pattern: emailPattern,
            })}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
