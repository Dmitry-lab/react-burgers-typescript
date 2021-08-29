import React from 'react';
import PropTypes from 'prop-types';
import linkStyle from './nav-link.module.css';
import { NavLink } from 'react-router-dom';


function NavigationLink({ iconComponent, linkName, href }) {

  const linkClassName = 'text text_type_main-default ml-2 mr-5';

  return (
    <NavLink
      className={`${linkStyle['link-box']} pl-5 mr-2`}
      activeClassName={linkStyle.active}
      exact={true}
      to={href}
    >
      {iconComponent}
      <span className={linkClassName}>
        {linkName}
      </span>
    </NavLink>
  )
}

NavigationLink.propTypes = {
  iconComponent: PropTypes.node.isRequired,
  linkName: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
}

export default NavigationLink;
