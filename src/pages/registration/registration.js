import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Redirect } from 'react-router-dom';
import { registerUser } from '../../services/actions/user-info';
import styles from '../login/login.module.css';

function Registration() {
  const [emailValue, setEmail] = useState('');
  const [nameValue, setName] = useState('');
  const [passwordValue, setPassword] = useState('');

  const { info, requestError } = useSelector(store => store.userInfo);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(nameValue, emailValue, passwordValue))
  }

  if (info.email)
    return <Redirect to='/' exact='true'/>

  return (
    <form className={styles.content} onSubmit={submitHandler}>
      <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
      <Input
        type='text'
        placeholder='Имя'
        onChange={e => setName(e.target.value)}
        value={nameValue}
        name='user-name'
      />
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
      <Button type='primary' size='medium'>Зарегистрироваться</Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Уже зарегистрированы? <NavLink className={styles.link} to='/login'>Войти</NavLink>
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


export default Registration;
