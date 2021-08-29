import React, { useState } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Redirect } from 'react-router-dom';
import styles from '../login/login.module.css';
import { setNewPassword } from '../../utils/api-requests';

function ResetPassword() {
  const SUCCESS = 'SUCCESS';
  const ERROR_MESSAGE = 'Ошибка обращения к серверу. Проверьте корректность введенных данных или попробуйте выполнить действие позже';
  const [passwordValue, setPassword] = useState('');
  const [codeValue, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    setNewPassword(passwordValue, codeValue)
      .then(res => {
        if (res.success === true) {
          localStorage.removeItem('resetPassword');
          setStatus(SUCCESS);
          return
        }

        return Promise.reject(res)
      })
      .catch(err => setStatus(ERROR_MESSAGE))
  }

  if (!localStorage.getItem('resetPassword'))
    return <Redirect to='/login' />

  return (
    <form className={styles.content} onSubmit={submitHandler}>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <PasswordInput
        onChange={e => setPassword(e.target.value)}
        value={passwordValue}
        name='password'
      />
      <Input
        type='text'
        placeholder='Введите код из письма'
        onChange={e => setEmail(e.target.value)}
        value={codeValue}
        name='email'
      />
      <Button type='primary' size='medium'>Сохранить</Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вспомнили пароль? <NavLink className={styles.link} to='/login'>Войти</NavLink>
      </p>
      {status === ERROR_MESSAGE
        ? <p className={`${styles.error} text text_type_main-default mt-10`}>
            {status}.
          </p>
        : null
      }
    </form>
  )
}


export default ResetPassword;
