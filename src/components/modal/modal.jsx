import { useEffect } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import modalStyles from './modal.module.css';

const modalRoot = document.getElementById('react-modals');

function Modal({ title, closeModal, children }) {
    useEffect(() => {
        const handleEsc = (e) => {
            e.key === 'Escape' && closeModal();
        };

        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
        }
    }, [closeModal]);
    

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

Modal.propTypes = {
    title: PropTypes.string,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default Modal;