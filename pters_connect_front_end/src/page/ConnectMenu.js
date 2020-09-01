import React, { Component } from 'react';
import "./ConnectMenu.css";
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { render } from '@testing-library/react';
import StoreOfLogin from '../store/store_login';
import { observable, action } from 'mobx';

@inject("storeOfLogin")
@observer
class PAGEConnectMenu extends Component{
    @observable user;

    @action
    _setUser = () => {
        const { storeOfLogin } = this.props;
        this.user = storeOfLogin.getCurrentUser();
    }

    @action
    _signOut = () => {
        const { storeOfLogin } = this.props;
        storeOfLogin.signOut();
        this.user = storeOfLogin.getCurrentUser();
    }

    componentDidMount(){
        this._setUser()
    }

    render(){
        const { classes, event_menu_close } = this.props;
        
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
                    {
                        this.user == null
                        ?<NavLink to="/login" onClick={event_menu_close}>
                            <div className="menu_item" style={{color:"#fe4e65"}}>로그인</div>
                        </NavLink>
                        :<div className="menu_item" onClick={this._signOut} style={{cursor:"pointer", color:"#fe4e65"}}>로그아웃</div>
                    }
                    
                </div>
            </div>
        );
    }
}


export default PAGEConnectMenu;