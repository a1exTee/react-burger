import PropTypes from 'prop-types';

import OverlayStyles from './modal-overlay.module.css';

function ModalOverlay({ onClick }) {
    return (
        <div className={OverlayStyles.overlay} onClick={onClick}></div>
    )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default ModalOverlay;