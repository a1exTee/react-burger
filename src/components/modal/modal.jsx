import React, { useEffect, useMemo } from 'react';
import ReactDOM, { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Interface } from 'readline';

const modalRoot = document.getElementById("react-modals");
console.log(modalRoot);



const Modal = ({active, setActive , children}) => {
    return (
        <div className={active ? 'modal active' : 'modal'}>
            {children}
            <div className='modalClose' onClick={()=>setActive(false)}>x</div>
        </div>
    );
}

/*class Modal extends React.Component {
    constructor(props) {
      super(props);
      this.el = document.createElement("div");
    }
  
    componentDidMount() {
        modalRoot.appendChild(this.el);
    }
  
    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }
  
    render() {
        return ReactDOM.createPortal(this.props.children, this.el);
    }
}*/

/*Modal.propTypes = {
    price: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string
}; */

/*const Modal = (props: any) => {
    const {open, onclose} = props;
    const element = useMemo(() =>  document.createElement('div'), []);

    const handleEscapePress = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose?.();
        }
    };

    //const onClose(() => {});

    useEffect(() => {
        if(open && modalRoot){
            modalRoot.appendChild(element);
            return () => {
                modalRoot.removeChild(element);
            }
        }

        document.addEventListener('keydown', keydownHandler);
        return () => document.removeEventListener('keydown', keydownHandler);
    });

    if(open){
        return createPortal(
            <div>{props.children}</div>
            , element
        );
    }
    return null;
    
}*/

/*class Modal extends React.Component {
  render() {
   const { children, header, onClose } = this.props;
        // Возвращаем ReactDOM.createPortal, 
        // который поместит дочерние элементы в modalRoot
    return ReactDOM.createPortal(
            (
                <>
                    <div className="Modal">
                    <ModalHeader onClose={onClose}>{header}</ModalHeader>
                        {children}
                    </div>
                    <ModalBackDrop onClose={onClose} />
                </>
            ), 
            modalRoot
    );
  }
}*/

export default Modal;