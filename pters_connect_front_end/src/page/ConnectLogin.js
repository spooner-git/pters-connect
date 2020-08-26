import React, { Component } from 'react';
import './ConnectLogin.css';
import Title from '../component/Title/Title';
import Input from '../component/Inputs/Input';
import Button from '../component/Buttons/Button';
import FlatButton from '../component/Buttons/FlatButton';
import Footer from '../assembly/Footer/Footer';
import { NavLink } from 'react-router-dom';
import Divider from '../component/Divider/Divider';
import CFunc from '../func/CFunc';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

@inject('storeOfLogin')
@observer
class PAGEConnectLogin extends Component {
    @observable userID;
    @observable userPW;

    _getToken = () => {
        const { storeOfLogin } = this.props;
        var token = storeOfLogin.getToken().AToken;
    }

    _setToken = (AToken, RToken, ExpireIn) => {
        const { storeOfLogin } = this.props;
        storeOfLogin.setToken(AToken, RToken, ExpireIn);
    }

    _signIn = () => {
        let dataForAjaxPost = {
            data:{
                client_id:'F2uZBimau8peRE2uYCHYeHJnFQ86gWCa8REndPsk',
                client_secret:'PNyNkrY4MrfmRNN6Bg5radEUe9MfMEeEoo9VIVpXc6Z0XmGldzOdoOqUrPQx5wyfSBFedT9WQJv7oxQWpYXG7F4DUvrELUaH7IiVPPQwGZRNaRMICp4AvwculIjXzNeH',
                grant_type:'password',
                username:this.userID,
                password:this.userPW
            },
            url:'https://api.pters.co.kr/oauth2/token/',
        }


        CFunc.ajaxPost(dataForAjaxPost.url, null, dataForAjaxPost.data).then((data)=>{
            console.log(JSON.stringify(data))
            this._setToken(data.data.access_token, data.data.refresh_token, data.data.expires_in);
            location.href = "/";
        }).catch((errorMsg)=>{
            console.log("에러콜백"+errorMsg);
        })
    }

    @action
    setState_userID = (e) => {
        this.userID = e.target.value;
    }

    @action
    setState_userPW = (e) => {
        this.userPW = e.target.value;
    }

    render(){
        return (
            <div className={`login_wrap ${this.props.classes}`}>

                <section className="login_box">
                        <div className="login_article" style={{marginBottom:"30px"}}>
                            <Title style={{fontSize:"20px", fontWeight:"500", textAlign:"center"}}>피터스 커넥트 로그인</Title>
                        </div>
                        <Divider></Divider>
                        <div className="login_article">
                            <Title style={{fontSize:"16px", color:"#7f7f7f"}}>아이디</Title>
                            <Input type="text" name="user_id" className="login_inputs" onChange={this.setState_userID}></Input>
                        </div>
                        <div className="login_article">
                            <Title style={{fontSize:"16px", color:"#7f7f7f"}}>비밀번호</Title>
                            <Input type="password" name="user_password" className="login_inputs" onChange={this.setState_userPW}></Input>
                        </div>
                        <div className="login_article" style={{marginTop:"20px"}}>
                            <Button className="login_button" onClick={this._signIn}>로그인</Button>
                        </div>
                        <div className="login_article" style={{textAlign:"center", marginTop:"20px"}}>
                            <FlatButton style={{color:"#fe4e65"}}>비밀번호를 잊으셨나요?</FlatButton>
                        </div>
                        <Divider>
                            <span style={{position:"absolute", left:"50%", transform:"translateX(-50%)", top:"-12px", padding:"0 5px", backgroundColor:"#f5f2f3"}}>or</span>
                        </Divider>
                        <div className="login_article sns_login_wrapper" style={{textAlign:"center", marginTop:"20px"}}>
                            <Button className="sns_login_button" style={{backgroundColor:"#0dd25a", color:"#ffffff"}}>
                                <img src="/images/icons/icon_naver_logo.png" style={{width:"24px", height:"24px", verticalAlign:"middle", marginBottom:"4px", marginRight:"3px"}} alt="네이버 로그인"></img>
                                네이버 로그인
                            </Button>
                            <div style={{flexBasis:"10px"}}></div>
                            <Button className="sns_login_button" style={{backgroundColor:"#ffeb00", color:"#3a1c1d"}}>
                                <img src="/images/icons/icon_kakao_logo.png"  style={{width:"24px", height:"24px", verticalAlign:"middle", marginBottom:"4px", marginRight:"3px"}} alt="카카오 로그인"></img>
                                카카오 로그인
                            </Button>
                        </div>
                    </section>
                <section className="login_box" style={{backgroundColor:"#fff", height:"200px", maxWidth:"unset"}}>
                    <Title style={{fontSize:"22px", fontWeight:"900", textAlign:"center", color:"#282828"}}>아직 회원이 아니신가요?</Title>
                    <Title style={{fontSize:"14px", color:"#282828", textAlign:"center", wordBreak:"keep-all"}}>지금 가입해서, 쉽고 편하게 레슨 강사님과 연결되어 보세요!</Title>
                    <div style={{margin:"20px 0", textAlign:"center"}}>
                        <NavLink to="/signup">
                            <Button className="sign_up_button">가입하기</Button>
                        </NavLink>
                    </div>
                </section>
                <Footer></Footer>
            </div>
        );  
    }
};

export default PAGEConnectLogin;