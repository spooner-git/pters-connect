import React from 'react';
import "./ChipButton.css";

const ChipButton = ({children, onClick, icon, style, className, highlight}) => {
    let classes = `chipbutton_general ${highlight === true ? `chipbutton_highlighted ${className}` : className}`;
    return (
        <div className={classes} onClick={onClick} style={style}>
            <span>{children}</span>
            <span>{icon !== undefined ? icon : ""}</span>
        </div>
    );
};

export default ChipButton;