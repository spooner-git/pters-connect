import React from 'react';
import './TopBanner.css';

const TopBanner = ({children, image_url, style}) => {
    let style2 = {}
    if(image_url !== undefined){
        style2 = {backgroundImage:`url("${image_url}")`}
    }
    return (
        <div style={{...style, ...style2}} className="top_banner">
            {children}
        </div>
    );
};

export default TopBanner;