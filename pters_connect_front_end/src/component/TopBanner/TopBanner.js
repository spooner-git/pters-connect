import React from 'react';
import './TopBanner.css';

const TopBanner = ({children, image_url, style}) => {
    if(image_url === undefined){
        image_url = `/images/top_banner/top_banner3.png`;
    }
    let style2 = {backgroundImage:`url("${image_url}")`}
    return (
        <div style={{...style, ...style2}} className="top_banner">
            {children}
        </div>
    );
};

export default TopBanner;