import React from 'react';
import "./ConnectMenu.css";
import { NavLink } from 'react-router-dom';

const PAGEConnectMenu = ({classes, event_menu_close}) => {
    return (
        <div className={classes}>
            <div className="menu_item_wrap">
                <NavLink to="/" onClick={event_menu_close}>
                    <div className="menu_item">Home</div>
                </NavLink>
                <NavLink to="/aboutus" onClick={event_menu_close}>
                    <div className="menu_item">About</div>
                </NavLink>
                <NavLink to="/map" onClick={event_menu_close}>
                    <div className="menu_item">지도</div>
                </NavLink>
                <NavLink to="/list" onClick={event_menu_close}>
                    <div className="menu_item">리스트</div>
                </NavLink>
                <NavLink to="/login" onClick={event_menu_close}>
                    <div className="menu_item">Login</div>
                </NavLink>
            </div>
        </div>
    );
};

export default PAGEConnectMenu;