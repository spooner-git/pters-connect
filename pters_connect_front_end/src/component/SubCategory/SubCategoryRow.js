import React from 'react';

const SubCategoryRow = ({name, code, checked, onClick}) => {
    let style = {display:"flex", height:"55px", lineHeight:"55px", fontSize:"16px", padding:"0 20px", cursor:"pointer"};
    return (
        <div style={style} onClick={()=>{onClick(code)}}>
            <div style={{flex:"1 1 0"}}>{name}</div>
        </div>
    );
};

export default SubCategoryRow;