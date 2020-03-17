import React from 'react';
import './ImageButton.css';

const ImageButton = ({children, style, image_url, onClick}) => {
    let style2 = {backgroundImage:`url("${image_url}")`};
    return (
        <div className="image_button" style={{...style, ...style2}} onClick={onClick}>
            {children}
        </div>
    );
};

export default ImageButton;