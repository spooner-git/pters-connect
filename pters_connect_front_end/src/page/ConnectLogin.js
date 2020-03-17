import React, { Component } from 'react';
import './ConnectLogin.css';
import Title from '../component/Title';
import Input from '../component/Inputs/Input';
import Button from '../component/Buttons/Button';
import TextButton from '../component/Buttons/TextButton';
import Footer from '../component/Footer';

class PAGEConnectLogin extends Component {
    render(){
        return (
            <div className={`login_wrap ${this.props.classes}`}>

                <section className="login_box">
                        <div className="login_article" style={{marginBottom:"30px"}}>
                            <Title style={{fontSize:"20px", fontWeight:"500", textAlign:"center"}}>피터스 커넥트 로그인</Title>
                        </div>
                        <div className="section_divider"></div>
                        <div className="login_article">
                            <Title style={{fontSize:"16px", color:"#7f7f7f"}}>아이디</Title>
                            <Input type="text" name="user_id" className="login_inputs"></Input>
                        </div>
                        <div className="login_article">
                            <Title style={{fontSize:"16px", color:"#7f7f7f"}}>비밀번호</Title>
                            <Input type="password" name="user_password" className="login_inputs"></Input>
                        </div>
                        <div className="login_article" style={{marginTop:"20px"}}>
                            <Button className="login_button" onClick={()=>{alert('로그인')}}>로그인</Button>
                        </div>
                        <div className="login_article" style={{textAlign:"center", marginTop:"20px"}}>
                            <TextButton style={{color:"#fe4e65"}}>비밀번호를 잊으셨나요?</TextButton>
                        </div>
                        <div className="section_divider">
                            <span style={{position:"absolute", left:"50%", transform:"translateX(-50%)", top:"-12px", padding:"0 5px", backgroundColor:"#f5f2f3"}}>or</span>
                        </div>
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
                    <div style={{margin:"20px 0", textAlign:"center"}}><Button className="sign_in_button">가입하기</Button></div>
                </section>
                <Footer></Footer>
            </div>
        );  
    }
};

export default PAGEConnectLogin;