import React from 'react';
import "./Card.css";

const Card = ({children, onClick, style, subClassList}) => {
    let classList = [`card_component`];
    if(subClassList != undefined || subClassList != null){
        classList = [
            ...classList,
            ...subClassList
        ]
    }
    
    let classes = classList.join(' ');
    return (
        <div className={classes} onClick={onClick} style={style}>
            {children}
        </div>
    );
};

export default Card;