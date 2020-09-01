import React, { Component } from 'react';
import './ConnectCenterCreate.css';
import ListTile from '../component/ListTile/ListTile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from '../component/Buttons/Button';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';
import CFunc from '../func/CFunc';
import LoadingImg from '../component/LoadingImg/LoadingImg';
import { NavLink } from 'react-router-dom';
import FlatButton from '../component/Buttons/FlatButton';
import Title from '../component/Title/Title';
import Input from '../component/Inputs/Input';

@inject('storeOfLogin')
@observer
class PAGEConnectCenterCreate extends Component{
    @observable name = null; //String
    @observable address = null; //String
    @observable title = null; //String
    @observable contents = null; //String
    @observable main_type_cd = "GOLF"; //String
    @observable sub_type_cd = "INDOOR_FIELD"; //String
    @observable support_tag = null; //String
    @observable main_img_url = "https://i.ytimg.com/vi/e7gTqhT_IQ4/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDhsHKusWkil4Jkmn0lRazoA9CfWg"; //String
    @observable sub_img_url = "https://i.ytimg.com/vi/e7gTqhT_IQ4/hqdefault.jpg?sqp=-oaymwEZCPYBEIoBSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLDhsHKusWkil4Jkmn0lRazoA9CfWg"; //String
    @observable start_date = null; //String
    @observable member_id = null; //String

    @action 
    setState_name = (e) => {
        this.name = e.target.value;
    }

    @action
    setState_address = (e) => {
        this.address = e.target.value;
    }

    @action
    setState_title = (e) => {
        this.title = e.target.value;
    }

    @action
    setState_contents = (e) => {
        this.contents = e.target.value;
    }

    @action
    setState_mainTypeCode = (e) => {
        this.main_type_cd = e.target.value;
    }

    @action
    setState_subTypeCode = (e) => {
        this.sub_type_cd = e.target.value;
    }

    @action
    setState_supportTag = (e) => {
        this.support_tag = e.target.value;
    }

    @action
    setState_mainImgUrl = (e) => {
        this.main_img_url = e.target.value;
    }

    @action
    setState_subImgUrl = (e) => {
        this.sub_img_url = e.target.value;
    }

    @action
    setState_startDate = (e) => {
        this.start_date = e.target.value;
    }

    @action
    setState_memberId = (e) => {
        this.member_id = e.target.value;
    }

    _upload = () => {
        const { storeOfLogin } = this.props;
        CFunc.ajaxPost(
            "https://api.pters.co.kr/facility/",
            {
                Authorization:`Bearer ${storeOfLogin.getCurrentUser()}`
            },
            {
                "name":this.name,
                "address":this.address,
                "title":this.title,
                "contents":this.contents,
                "main_type_cd":this.main_type_cd,
                "sub_type_cd":this.sub_type_cd,
                "support_tag":this.support_tag,
                "main_img_url":this.main_img_url,
                "sub_img_url":this.sub_img_url,
                "start_date":this.start_date
            }
        ).then((data)=>{
            if(data.status == 403){
                storeOfLogin.getToken().then(()=>{
                    this._upload();
                })
            }
            console.log(`ajaxPost: `);
            console.log(data);
        })
    }

    _readAllFacilities = () => {
        const { storeOfLogin } = this.props;
        CFunc.ajaxGet(
            "https://api.pters.co.kr/facility/",
            {
                "access_token":storeOfLogin.getCurrentUser()
            }
        ).then((data)=>{
            console.log(`성공: `);
            console.log(data);
        })
    }


    _goBack = () => {
        this.props.history.goBack();   
    }

    render(){
        return(
            <div className="connect_create_center_page">
                <div className="connect_create_center_top_tool">
                    <div>
                        <FlatButton>
                            <div style={{fontSize:"18px"}} onClick={this._goBack}>
                                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                                <span> 뒤로</span>
                            </div>
                        </FlatButton>
                    </div>
                    <div style={{textAlign:"right"}}>
                        <FlatButton>
                            <div style={{fontSize:"18px"}} onClick={this._upload}>
                                <FontAwesomeIcon icon={faCheck} color={"green"}></FontAwesomeIcon>
                                <span> 추가</span>
                            </div>
                        </FlatButton>
                    </div>
                </div>
                <div className="connect_create_center_input_wrap">
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>센터명</Title>
                        <Input onChange={this.setState_name} className="connect_create_center_inputs" placeholder=""></Input>
                    </div>
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>주소</Title>
                        <Input onChange={this.setState_address} className="connect_create_center_inputs" placeholder=""></Input>
                    </div>
                    {/* <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>연락처</Title>
                        <Input onChange={this.setState_Phone} className="connect_create_center_inputs" placeholder=""></Input>
                    </div> */}
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>한줄 설명</Title>
                        <Input onChange={this.setState_title} className="connect_create_center_inputs" placeholder=""></Input>
                    </div>
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>내용</Title>
                        <Input onChange={this.setState_contents} className="connect_create_center_inputs" placeholder=""></Input>
                    </div>
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>대분류</Title>
                        <Input onChange={this.setState_mainTypeCode} className="connect_create_center_inputs" placeholder=""></Input>
                    </div>
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>상세분류</Title>
                        <Input onChange={this.setState_subTypeCode} className="connect_create_center_inputs" placeholder=""></Input>
                    </div>
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>서포트 Tag</Title>
                        <Input onChange={this.setState_supportTag} className="connect_create_center_inputs" placeholder=""></Input>
                    </div>
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>메인 이미지 URL</Title>
                        <Input onChange={this.setState_mainImgUrl} className="connect_create_center_inputs" placeholder=""></Input>
                    </div>
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>서브 이미지 URL</Title>
                        <Input onChange={this.setState_subImgUrl} className="connect_create_center_inputs" placeholder=""></Input>
                    </div>
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>시작일자</Title>
                        <Input onChange={this.setState_startDate} className="connect_create_center_inputs" placeholder=""></Input>
                    </div>
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>Member ID</Title>
                        <Input onChange={this.setState_memberId} className="connect_create_center_inputs" placeholder=""></Input>
                    </div>
                    <div style={{textAlign:"right", marginTop:"15px"}}>
                        <FlatButton style={{width:"75px"}} onClick={this._goBack}>취소</FlatButton>
                        <Button style={{width:"75px"}} highlight={true}>저장</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PAGEConnectCenterCreate;