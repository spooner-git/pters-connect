import React, { Fragment } from 'react';
import "./Modal.css";
import { OFF } from "../const";

const Modal = ({children, style, event_close, shade, className}) => {
    var classes = `modal ${className == undefined ? "" : className}`;
    return (
        <Fragment>
            <div style={{...style, zIndex:"50"}} className={classes}>
                {children}
            </div>
            {
                shade === OFF 
                ? ""
                : <div id="modal_shade" className="modal_shade" onClick={event_close}></div>
            }
        </Fragment>
    );
};

export default Modal;