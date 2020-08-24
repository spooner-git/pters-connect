import React, { Children } from 'react';
import "./Divider.css";

const Divider = ({children, style}) => {
    return (
        <div className="divider" style={style}>
            {children}
        </div>
    );
};

export default Divider;