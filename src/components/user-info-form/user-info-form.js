import { React, useState, useEffect } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../services/actions/user-info';
import { getUserInfo, updateUser } from '../../utils/api-requests';
import styles from './user-info-form.module.css';

function UserInfoForm() {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [nameChanged, setNameChanged] = useState(false);
  const [loginChanged, setLoginChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const dispatch = useDispatch();
  const { info, requestError } = useSelector(store => store.userInfo);

  useEffect(() => {
    dispatch(setUserInfo(getUserInfo))
  }, [])

  useEffect(() => {
    setName(info.name);
    setLogin(info.email);
    setPassword('');
    setNameChanged(false);
    setPasswordChanged(false);
    setLoginChanged(false)
  }, [info])

  const nameChangeHandler = (e) => {
    setName(e.target.value);
    (e.target.value !== info.name) ? setNameChanged(true) : setNameChanged(false);
  }

  const nameResetHandler = () => {
    setName(info.name);
    setNameChanged(false)
  }

  const loginResetHandler = () => {
    setLogin(info.email);
    setLoginChanged(false)
  }

  const passwordResetHandler = () => {
    setPassword('');
    setPasswordChanged(false)
  }

  const loginChangeHandler = (e) => {
    setLogin(e.target.value);
    (e.target.value !== info.email) ? setLoginChanged(true) : setLoginChanged(false);
  }

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
    (e.target.value !== '') ? setPasswordChanged(true) : setPasswordChanged(false);
  }

  const resetButtonHandler = () => {
    nameResetHandler();
    loginResetHandler();
    passwordResetHandler();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setUserInfo(updateUser, name, login, password))
  }

  const checkSomeChanges = () => {
    return nameChanged || loginChanged || passwordChanged
  }

  return (
    <form>
      <Input
        type='text'
        value={name}
        onChange={nameChangeHandler}
        onIconClick={nameResetHandler}
        placeholder='Имя'
        icon={nameChanged ? 'CloseIcon' : 'EditIcon'}
        size='default'
      />
      <Input
        type='email'
        value={login}
        onChange={loginChangeHandler}
        onIconClick={loginResetHandler}
        placeholder='Логин'
        icon={loginChanged ? 'CloseIcon' : 'EditIcon'}
        size='default'
      />
      <Input
        type='password'
        value={password}
        onChange={passwordChangeHandler}
        onIconClick={passwordResetHandler}
        placeholder='Пароль'
        icon={passwordChanged ? 'CloseIcon' : 'EditIcon'}
        size='default'
      />
      {checkSomeChanges()
        ? <div className={styles.buttons}>
          <Button type="secondary" size="medium" onClick={resetButtonHandler}>Отмена</Button>
          <Button type="primary" size="medium" onClick={submitHandler}>Сохранить</Button>
        </div>
        : null
      }
      {requestError
        ? <p className={`${styles.error} text text_type_main-default`}>
          {requestError}
        </p>
        : null
      }
    </form>
  )
}

export default UserInfoForm;
