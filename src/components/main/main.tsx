import React, { FC } from 'react';
import mainStyles from './main.module.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type TMainProps = {
  name: string;  
}

const Main: FC<TMainProps> = ({ name, children }) => {
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

export default Main;

