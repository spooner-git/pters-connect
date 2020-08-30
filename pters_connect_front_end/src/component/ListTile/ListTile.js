import React from 'react';
import "./ListTile.css";

const ListTile = ({leading, title, subtitle, trailing, style, onClick}) => {
    return (
        <div className="listTile" onClick={onClick} style={style}>
            {
                leading === undefined || leading === null
                ? ""
                :<div className="listTile_leading">{leading}</div>
            }
            <div className="listTile_content">
                <div className="listTile_title">{title}</div>
                {
                    subtitle === undefined || subtitle === null
                    ? ""
                    :<div className="listTile_subtitle">{subtitle}</div>
                }
            </div>
            {
                trailing === undefined || trailing === null
                ? ""
                :<div className="listTile_trailing">{trailing}</div>
            }
        </div>
    );
};

export default ListTile;