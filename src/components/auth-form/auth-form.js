import React from 'react';
import styles from './auth-form.module.css';
import PropTypes from 'prop-types';

function AuthForm({ name, children }) {
  return (
    <div className={styles.content}>
      <h1 className='text text_type_main-medium mb-6'>{name}</h1>
      {children}
    </div>
  )
}

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default AuthForm;
