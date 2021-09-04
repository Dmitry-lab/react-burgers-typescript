import React, { FC } from 'react';
import styles from './user-info.module.css';
import UserInfoNavigation from '../../components/user-info-navigation/user-info-navigation';
import UserInfoForm from '../../components/user-info-form/user-info-form';

const UserInfo: FC = () => {
  return (
    <section className={styles.content}>
      <UserInfoNavigation info='В этом разделе вы можете изменить свои персональные данные'/>
      <UserInfoForm />
    </section>
  )
}

export default UserInfo;
