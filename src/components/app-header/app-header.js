import React from 'react';
import NavBlock from '../nav-block/nav-block';
import headerStyles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
    return (
      <header className={headerStyles.header}>
        <div className={headerStyles.content}>
          <NavBlock />
          <div className={headerStyles['logo-container']}>
            <Logo />
          </div>
        </div>
      </header>
    )
}

export default AppHeader;
