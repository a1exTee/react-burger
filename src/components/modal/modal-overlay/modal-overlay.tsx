import { TOverlay } from '../../../utils/prop-types';

import OverlayStyles from './modal-overlay.module.css';

function ModalOverlay({ onClick }: TOverlay) {
    return (
        <div className={OverlayStyles.overlay} onClick={onClick} data-test="modal-overlay"></div>
    )
}

export default ModalOverlay;