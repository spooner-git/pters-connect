import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

const MainCategoryRow = ({code, name, checked, onClick}) => {
    let style = {display:"flex", height:"55px", lineHeight:"55px", fontSize:"16px", padding:"0 20px", cursor:"pointer"};
    return (
        <div style={style} onClick={()=>{onClick(code);}}>
            <div style={{flex:"1 1 0"}}>{name}</div>
            {
            checked === true
            ?
            <div style={{flexBasis:"50px", fontSize:"22px", color:"#fe4e65", textAlign:"right"}}>
                <FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon>
            </div>
            :
            <div style={{flexBasis:"50px", fontSize:"22px", color:"#999999", textAlign:"right"}}>
                <FontAwesomeIcon icon={faSquare}></FontAwesomeIcon>
            </div>
            }
            
        </div>
    );
};

export default MainCategoryRow;