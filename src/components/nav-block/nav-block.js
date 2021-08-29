import React from 'react';
import NavigationLink from '../nav-link/nav-link';
import navBlockStyles from './nav-block.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function NavBlock() {
    return (
        <nav className={navBlockStyles['nav-block']}>
          <div className={navBlockStyles['left-side']}>
            <NavigationLink
              iconComponent={<BurgerIcon />}
              linkName='Конструктор'
              href='/'
            />
            <NavigationLink
              iconComponent={<ListIcon />}
              linkName='Лента заказов'
              href='/feed'
            />
          </div>
          <NavigationLink
            iconComponent={<ProfileIcon />}
            linkName='Личный кабинет'
            href='/profile'
          />
        </nav>
    )
}

export default NavBlock;
