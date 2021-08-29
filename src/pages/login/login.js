import React, { useState } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Redirect, useLocation } from 'react-router-dom';
import styles from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { userLogIn } from '../../services/actions/user-info';

function Login() {
  const [emailValue, setEmail] = useState('');
  const [passwordValue, setPassword] = useState('');

  const { info, requestError } = useSelector(store => store.userInfo);
  const dispatch = useDispatch();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userLogIn(emailValue, passwordValue));
  }

  if (info.email)
    return <Redirect to={location.state?.from || '/'}/>

  return (
    <form className={styles.content} onSubmit={submitHandler}>
      <h1 className='text text_type_main-medium mb-6'>Вход</h1>
      <Input
        type='email'
        placeholder='E-mail'
        onChange={e => setEmail(e.target.value)}
        value={emailValue}
        name='email'
      />
      <PasswordInput
        onChange={e => setPassword(e.target.value)}
        value={passwordValue}
        name='password'
      />
      <Button type='primary' size='medium'>Войти</Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вы новый пользователь? <NavLink className={styles.link} to='/register'>Зарегистрироваться</NavLink>
      </p>
      <p className='text text_type_main-default text_color_inactive mt-4'>
        Забыли пароль? <NavLink className={styles.link} to='/forgot-password'>Восстановить пароль</NavLink>
      </p>
      {requestError
        ? <p className={`${styles.error} text text_type_main-default mt-10`}>
            {requestError}
          </p>
        : null
      }
    </form>
  )
}


export default Login;
