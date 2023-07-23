import { TOverlay } from '../../../utils/prop-types';

import OverlayStyles from './modal-overlay.module.css';

function ModalOverlay({ onClick }: TOverlay) {
    return (
        <div className={OverlayStyles.overlay} onClick={onClick}></div>
    )
}

export default ModalOverlay;