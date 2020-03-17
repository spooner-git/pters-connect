import React, { Fragment } from 'react';
import "./Modal.css";
import { OFF } from "../const";

const Modal = ({children, style, event_close, shade}) => {
    return (
        <Fragment>
            <div style={{...style, zIndex:"50"}} className="modal">
                {children}
            </div>
            {
                shade === OFF 
                ? ""
                : <div style={{position:"fixed", width:"100%", height:"100%", backgroundColor:"#282828", opacity:"0.7", top:"0", left:"0", zIndex:"49"}} id="modal_shade" onClick={event_close}></div>
            }
        </Fragment>
    );
};

export default Modal;