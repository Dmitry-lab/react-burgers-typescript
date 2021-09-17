import React, { FC } from 'react';
import NavigationLink from '../nav-link/nav-link';
import navBlockStyles from './nav-block.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const NavBlock:FC = () => {
    return (
        <nav className={navBlockStyles['nav-block']}>
          <div className={navBlockStyles['left-side']}>
            <NavigationLink
              iconComponent={<BurgerIcon type='primary'/>}
              linkName='Конструктор'
              href='/'
            />
            <NavigationLink
              iconComponent={<ListIcon type='primary'/>}
              linkName='Лента заказов'
              href='/feed'
            />
          </div>
          <NavigationLink
            iconComponent={<ProfileIcon type='primary'/>}
            linkName='Личный кабинет'
            href='/profile'
          />
        </nav>
    )
}

export default NavBlock;
