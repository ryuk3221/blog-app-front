import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, isAuth } from "../../redux/slices/auth";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const auth = useSelector(isAuth);
  const dispatch = useDispatch();


  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'all'
  });

  const onSubmit = (values) => {
    dispatch(fetchAuth(values));
  };


  if (auth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register('email', { required: 'Укажите почту' })}
          type="email"
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          {...register('password', { required: 'Укажите пароль' })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
