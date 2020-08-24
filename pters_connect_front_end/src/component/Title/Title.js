import React from 'react';

const Title = ({children, style, className}) => {
    return (
        <div style={style} className={className}>
            {children}
        </div>
    );
};

export default Title;