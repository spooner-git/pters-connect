import React from 'react';
import './TextArea.css';

const TextArea = ({className, placeHolder, type, name, style, onChange}) => {
    var style2 = {};
    var classes = `textarea_general ${className}`
    return (
        <div placeHolder={placeHolder} type={type} name={name} onChange={onChange} style={{...style2, ...style}} className={classes} contentEditable="true">

        </div>
    );
};

export default TextArea;