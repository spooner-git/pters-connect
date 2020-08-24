import React from 'react';
import './Input.css';

const Input = ({className, type, name, style, placeholder, onChange}) => {
    var style2 = {};
    var classes = `input_general ${className}`
    return (
        <input type={type} name={name} onChange={onChange} style={{...style2, ...style}} className={classes} placeholder={placeholder}>

        </input>
    );
};

export default Input;