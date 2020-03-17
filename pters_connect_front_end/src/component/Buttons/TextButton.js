import React from 'react';
import "./TextButton.css";

const TextButton = ({children, onClick, style, className, highlight}) => {
    let classes = `text_button_general ${highlight === true ? `text_button_highlighted ${className}` : className}`;
    return (
        <span className={classes} onClick={onClick} style={style}>
            {children}
        </span>
    );
};

export default TextButton;