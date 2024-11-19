import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from '../../axios';
import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister, isAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const Registration = () => {
  const auth = useSelector(isAuth);
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onChange'
  });
  console.log(errors);

  const onSubmit = async (data) => {
    const user = await dispatch(fetchRegister(data));

    if (!user.payload) {
      alert('Не удалось зарегистрироваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };


  if (auth) {
    return <Navigate to='/' />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper classes={{ root: styles.root }}>
        <Typography classes={{ root: styles.title }} variant="h5">
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label="Полное имя"
          fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register("fullName", { required: 'Укажите полное имя' })}

        />
        <TextField
          className={styles.field}
          label="E-Mail"
          fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", { required: 'Укажите email' })}
        />
        <TextField
          className={styles.field}
          label="Пароль"
          fullWidth
          type='password'
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register("password", { required: 'Укажите пароль' })}
        />
        <Button type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </Paper>
    </form>
  );
};
