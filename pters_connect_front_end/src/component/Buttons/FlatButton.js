import React from 'react';
import "./FlatButton.css";

const FlatButton = ({children, onClick, style, className, highlight}) => {
    let classes = `flat_button_general ${highlight === true ? `flat_button_highlighted ${className}` : className}`;
    return (
        <span className={classes} onClick={onClick} style={style}>
            {children}
        </span>
    );
};

export default FlatButton;