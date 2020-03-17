import React from 'react';
import './RootContent.css';

const RootContent = ({children}) => {
    return (
        <div id="root_content">
            {children}
        </div>
    );
};

export default RootContent;