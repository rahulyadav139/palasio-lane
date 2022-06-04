import './Modal.css';
import ReactDom from 'react-dom';
import { Fragment } from 'react';

const ModalBackdrop = props => {
  return <div onClick={props.onReset} className="modal-backdrop"></div>;
};

const overlay = document.getElementById('modal-overlay');

const Modal = props => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <ModalBackdrop onReset={props.onReset} />,
        overlay
      )}
      {ReactDom.createPortal(
        <div className={props.className}>{props.children}</div>,
        overlay
      )}
    </Fragment>
  );
};

export { Modal };
