import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory } from 'react-router-dom';

const MODAL_CONTAINER = document.querySelector('#modals');

type TModalType = {
  header?: string | null;
  onCloseClick(): void;
}

const Modal: FC<TModalType> = ({header=null, onCloseClick, children}) => {
  const history = useHistory();

  React.useEffect(() => {
    document.addEventListener('keydown', handlerPressEsc)

    return () => document.removeEventListener('keydown', handlerPressEsc)
  }, [])

  const handlerPressEsc = (evt: globalThis.KeyboardEvent) => {
    if (evt.key === 'Escape') {
      (window.location.pathname.includes('ingredients')
        || window.location.pathname.includes('feed')
        || window.location.pathname.includes('orders'))
        && history.goBack();
      onCloseClick()
    }
  }

  const handlerCloseClick = (evt: globalThis.KeyboardEvent | React.MouseEvent) => {
    evt.stopPropagation();
    (window.location.pathname.includes('ingredients')
        || window.location.pathname.includes('feed')
        || window.location.pathname.includes('orders'))
        && history.goBack();
    onCloseClick()
  }

  const content = (
    <>
      <div className={modalStyles.modal}>
        {header &&
          <h2 className={`${modalStyles.header} text text_type_main-large mt-10 mr-10 ml-10`}>
            {header}
          </h2>
        }
        <button type='button' className={modalStyles['close-button']} onClick={handlerCloseClick}>
          <CloseIcon type='primary' />
        </button>
        {children}
      </div>
      <ModalOverlay onCloseClick={handlerCloseClick}/>
    </>
  )

  return MODAL_CONTAINER ? ReactDOM.createPortal(content, MODAL_CONTAINER) : null
}

export default Modal;