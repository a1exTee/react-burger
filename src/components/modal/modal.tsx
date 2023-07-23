import { useEffect } from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';
import { TModal } from '../../utils/prop-types';

const modalRoot: HTMLElement | null = document.getElementById("react-modals");

function Modal({ title, closeModal, children }: TModal) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            e.key === 'Escape' && closeModal();
        };

        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
        }
    }, [closeModal]);

    if(!modalRoot) {
        return null;
    }
    

    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClick={closeModal} />
            <div className={`${modalStyles.modal} p-10`}>
                <div className={`${modalStyles.modalContent}`}>
                    <div className={modalStyles.wrapCloseIcon}><CloseIcon type='primary' onClick={closeModal} /></div>
                    <div className={modalStyles.modalHeader}>
                        <h2 className='text text_type_main-large'>{title}</h2>
                    </div>
                    <div className={modalStyles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </>
        , modalRoot
    )
}

export default Modal;