import React, { FC } from 'react';
import styles from './auth-form.module.css';

type TAuthFormProps = {
  name: string;  
}

const AuthForm: FC<TAuthFormProps> = ({ name, children }) => {
  return (
    <div className={styles.content}>
      <h1 className='text text_type_main-medium mb-6'>{name}</h1>
      {children}
    </div>
  )
}

export default AuthForm;
