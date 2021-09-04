import React, { FC } from 'react';
import overlayStyles from './modal-overlay.module.css'

type TModalOverlayType = {
  onCloseClick(evt: globalThis.KeyboardEvent | React.MouseEvent): void;
}

const ModalOverlay: FC<TModalOverlayType> = ({ onCloseClick }) => {
  return <div className={overlayStyles.overlay} onClick={onCloseClick}></div>
}

export default ModalOverlay;