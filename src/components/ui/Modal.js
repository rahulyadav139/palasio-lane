import './Modal.css';
import ReactDom from 'react-dom';
import { Fragment } from 'react';

const ModalBackdrop = props => {
  return <div className="modal-backdrop"></div>;
};

const overlay = document.getElementById('modal-overlay');

const Modal = props => {
  return (
    <Fragment>
      {ReactDom.createPortal(<ModalBackdrop />, overlay)}
      {ReactDom.createPortal(<div className='modal-wrapper'>{props.children}</div>, overlay)}
    </Fragment>
  );
};

export default Modal;
