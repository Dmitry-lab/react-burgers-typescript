import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './user-info-navigation.module.css';
import { useDispatch } from 'react-redux';
import { userLogOut } from '../../services/actions/user-info';

const UserInfoNavigation: FC<{ info: string}> = ({ info }) => {
  const mediumTextClassName = 'text text_type_main-medium text_color_inactive';
  const defaultTextClassName = 'text text_type_main-default text_color_inactive';

  const dispatch = useDispatch();

  const logoutHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(userLogOut());
  }

  return (
    <nav className={styles.links}>
      <NavLink exact to='/profile' className={styles.link} activeClassName={styles.active}>
        <span className={mediumTextClassName}>Профиль</span>
      </NavLink>
      <NavLink to='/profile/orders' className={styles.link} activeClassName={styles.active}>
        <span className={mediumTextClassName}>История заказов</span>
      </NavLink>
      <NavLink to='/login' className={styles.link} activeClassName={styles.active} onClick={logoutHandler}>
        <span className={mediumTextClassName}>Выход</span>
      </NavLink>
      <p className={`${defaultTextClassName} mt-20 ${styles.info}`}>{info}</p>
    </nav>
  )
}

export default UserInfoNavigation
