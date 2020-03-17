import React from 'react';
import "./Button.css";

const Button = ({children, onClick, icon, style, highlight}) => {
    let classes = `button_general ${highlight === true ? "button_highlighted" : ""}`;
    return (
        <div className={classes} onClick={onClick} style={style}>
            <span>{children}</span>
            <span>{icon !== undefined ? icon : ""}</span>
        </div>
    );
};

export default Button;