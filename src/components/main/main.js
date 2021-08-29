import React from 'react';
import mainStyles from './main.module.css';
import PropTypes from 'prop-types';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Main({ name, children }) {
  return (
    <main className={mainStyles.main}>
      <h1 className="text text_type_main-large">{name}</h1>
      <DndProvider backend={HTML5Backend}>
        <div className={mainStyles.content}>
          {children}
        </div>
      </DndProvider>
    </main>
  )
}

Main.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default Main;

