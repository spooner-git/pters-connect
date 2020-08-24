import React, { Component } from 'react';
import './RootTop.css';
import { NavLink, withRouter } from 'react-router-dom';
// import { OPEN, CLOSE } from '../const';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from '../../modal/Modal';
import { OFF } from "../../const";
import PAGEConnectMenu from '../../page/ConnectMenu';
import Button from '../../component/Buttons/Button';
import FlatButton from '../../component/Buttons/FlatButton';

class RootTop extends Component {
    render(){
        return (
                <header className="root_top">
                    <NavLink to="/" className="item" onClick={this.props.event_close}>
                        <div id="root_top_logo"></div>
                    </NavLink>
                    <div id="root_top_spacer">

                    </div>
                    <div className="root_top_mobile">
                        {
                        this.props.open === 0
                        ?
                            <div id="root_top_menu" style={{fontSize:"20px"}} onClick={this.props.event_open}>
                                <FontAwesomeIcon icon={faBars} color="#3d3b3b"/>
                            </div>
                        :
                            <div id="root_top_menu" style={{fontSize:"20px"}} onClick={this.props.event_close }>
                                <FontAwesomeIcon icon={faTimes} color="#3d3b3b"/>
                            </div>
                        }
                    </div>
                    <div className="root_top_pc">
                        <ul className="root_top_pc_menu">
                            <li className="root_top_pc_menu_item"><NavLink to="/"><FlatButton>커넥트 소개</FlatButton></NavLink></li>
                            <li className="root_top_pc_menu_item"><NavLink to="/map"><FlatButton>지도 탐색</FlatButton></NavLink></li>
                            <li className="root_top_pc_menu_item"><NavLink to="/list"><FlatButton>리스트 검색</FlatButton></NavLink></li>
                            <li className="root_top_pc_menu_item"><NavLink to="/"><FlatButton>이용 방법</FlatButton></NavLink></li>
                            <li className="root_top_pc_menu_item"><NavLink to="/login"><Button highlight={true} style={{borderRadius:"3px", border:0, padding:"0 15px"}}>로그인/가입</Button></NavLink></li>
                        </ul>
                        
                    </div>
                </header>
            );
    }
    
};

export default RootTop;