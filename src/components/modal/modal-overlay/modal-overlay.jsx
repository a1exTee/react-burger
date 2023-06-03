import React, { useEffect, useMemo } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
//import Modal from '../modal';

const modalRoot = document.getElementById("react-overlay");
console.log(modalRoot);

//modalRoot.addEventListener('Click', )

const ModalOverlay = () => {
    return (
        <div className='overlay'>
        </div>
    );
}

export default ModalOverlay;