import React, { useState } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Redirect } from 'react-router-dom';
import styles from '../login/login.module.css';
import { resetPassword } from '../../utils/api-requests';
import { useSelector } from 'react-redux'

function ForgotPassword() {
  const SUCCESS = 'SUCCESS';
  const ERROR_MESSAGE = 'Ошибка обращения к серверу. Проверьте корректность введенных данных или попробуйте выполнить действие позже';
  const [emailValue, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const { info } = useSelector(store => store.userInfo);

  const submitHandler = (e) => {
    e.preventDefault();
    resetPassword(emailValue)
      .then(res => {
        if (res.success) {
          localStorage.setItem('resetPassword', 'true');
          setStatus(SUCCESS);
          return
        }

        return Promise.reject(res)
      })
      .catch(err => setStatus(ERROR_MESSAGE))
  }

  if (info.email)
    return <Redirect to='/' />

  if (status === SUCCESS)
    return <Redirect to='/reset-password' />

  return (
    <form className={styles.content} onSubmit={submitHandler}>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <Input
        type='email'
        placeholder='Укажите e-mail'
        onChange={e => setEmail(e.target.value)}
        value={emailValue}
        name='email'
      />
      <Button type='primary' size='medium'>Восстановить</Button>
      <p className='text text_type_main-default text_color_inactive mt-20'>
        Вспомнили пароль? <NavLink className={styles.link} to='/login'>Войти</NavLink>
      </p>
      {status === ERROR_MESSAGE
        ? <p className={`${styles.error} text text_type_main-default mt-10`}>
            {status}
          </p>
        : null
      }
    </form>
  )
}


export default ForgotPassword;
