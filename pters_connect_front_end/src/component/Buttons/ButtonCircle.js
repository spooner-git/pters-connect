import React from 'react';
import "./ButtonCircle.css";

const ButtonCircle = ({children, bottomTitle, bottomText, parent_style, style, highlight, onClick}) => {
    let classes = `button_circle ${highlight == true ? "button_circle_highlighted" : ""}`;
    return (
        <div className="button_circle_wrap" style={parent_style}>
            <div className={classes} onClick={onClick} style={style}>
                <div className="button_circle_child">{children}</div>
                <div style={{paddingTop:"100%"}}></div>
            </div>
            {
                bottomTitle != undefined 
                ?<div className="button_circle_bottomtitle">{bottomTitle}</div>
                :""
            }
            {
                bottomText != undefined 
                ?<div className="button_circle_bottomtext">{bottomText}</div>
                :""
            }
        </div>
    );
};

export default ButtonCircle;