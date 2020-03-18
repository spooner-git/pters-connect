import React from 'react';
import './ImageButton.css';

const ImageButton = ({children, className, style, image_url, onClick}) => {
    let style2 = {backgroundImage:`url("${image_url}")`};
    let classes = `image_button ${className}`
    return (
        <div className={classes} style={{...style, ...style2}} onClick={onClick}>
            {children}
        </div>
    );
};

export default ImageButton;