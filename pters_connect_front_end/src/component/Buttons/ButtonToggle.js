import React from 'react';
import "./ButtonToggle.css";

const ButtonToggle = ({children, bottomTitle, bottomText, parent_style, style, highlight, onClick}) => {
    let classes = `button_toggle ${highlight === true ? "button_toggle_highlighted" : ""}`;
    return (
        <div className="button_toggle_wrap" style={parent_style}>
            <div className={classes} onClick={onClick} style={style}>
                <div className="button_toggle_child">{children}</div>
            </div>
            {
                bottomTitle != undefined 
                ?<div className="button_toggle_bottomtitle">{bottomTitle}</div>
                :""
            }
            {
                bottomText != undefined 
                ?<div className="button_toggle_bottomtext">{bottomText}</div>
                :""
            }
        </div>
    );
};

export default ButtonToggle;