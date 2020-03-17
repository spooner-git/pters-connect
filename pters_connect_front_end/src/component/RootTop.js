import React, { Component } from 'react';
import './RootTop.css';
import { NavLink, withRouter } from 'react-router-dom';
// import { OPEN, CLOSE } from '../const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from '../modal/Modal';
import PAGEConnectMenu from '../page/ConnectMenu';
import { OFF } from "../const";

class RootTop extends Component {

    render(){
        return (
                <header className="root_top">
                    <NavLink to="/" className="item" onClick={this.props.event_close}>
                        <div id="root_top_logo"></div>
                    </NavLink>
                    <div id="root_top_spacer">

                    </div>
                    {
                       this.props.open === 0
                       ?
                        <div id="root_top_menu" style={{fontSize:"20px"}} onClick={this.props.event_open}>
                            <FontAwesomeIcon icon={faBars} color="#3d3b3b"/>
                        </div>
                       :
                        <div id="root_top_menu" style={{fontSize:"20px"}} onClick={this.props.event_close }>
                            <FontAwesomeIcon icon={faTimes} color="#3d3b3b"/>
                            {/* <Modal style={{width:"100%", height:"100%", borderRadius:"0", boxShadow:"unset", left:"0", transform:"unset"}} shade={OFF}>
                                <PAGEConnectMenu></PAGEConnectMenu>
                            </Modal> */}
                        </div>
                    }
                </header>
            );
    }
    
};

export default RootTop;