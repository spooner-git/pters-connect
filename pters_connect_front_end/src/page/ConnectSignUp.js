import React, { Component } from 'react';
import './ConnectSignUp.css';
import Title from '../component/Title/Title';
import Input from '../component/Inputs/Input';
import Button from '../component/Buttons/Button';
import FlatButton from '../component/Buttons/FlatButton';
import Footer from '../assembly/Footer/Footer';
import { NavLink } from 'react-router-dom';
import Divider from '../component/Divider/Divider';

class PAGEConnectSignUp extends Component {
    render(){
        return (
            <div className={`signup_wrap ${this.props.classes}`}>

                <section className="signup_box">
                        <div className="signup_article" style={{marginBottom:"30px"}}>
                            <Title style={{fontSize:"20px", fontWeight:"500", textAlign:"center"}}>피터스 커넥트 가입</Title>
                        </div>
                        <Divider></Divider>
                        <div className="signup_article sns_signup_wrapper" style={{textAlign:"center", marginTop:"20px"}}>
                            <Button className="sns_signup_button" style={{backgroundColor:"#0dd25a", color:"#ffffff"}}>
                                <img src="/images/icons/icon_naver_logo.png" style={{width:"24px", height:"24px", verticalAlign:"middle", marginBottom:"4px", marginRight:"3px"}} alt="네이버 로그인"></img>
                                네이버 가입
                            </Button>
                            <div style={{flexBasis:"10px"}}></div>
                            <Button className="sns_signup_button" style={{backgroundColor:"#ffeb00", color:"#3a1c1d"}}>
                                <img src="/images/icons/icon_kakao_logo.png"  style={{width:"24px", height:"24px", verticalAlign:"middle", marginBottom:"4px", marginRight:"3px"}} alt="카카오 로그인"></img>
                                카카오 가입
                            </Button>
                        </div>
                        <Divider>
                            <span style={{position:"absolute", left:"50%", transform:"translateX(-50%)", top:"-12px", padding:"0 5px", backgroundColor:"#f5f2f3"}}>or</span>
                        </Divider>
                        <div className="signup_article">
                            <Title style={{fontSize:"16px", color:"#7f7f7f"}}>아이디</Title>
                            <Input type="text" name="user_id" className="signup_inputs" placeholder="영어,숫자, -_@ 제외 불가"></Input>
                        </div>
                        <div className="signup_article">
                            <Title style={{fontSize:"16px", color:"#7f7f7f"}}>비밀번호</Title>
                            <Input type="password" name="user_password" className="signup_inputs" placeholder="영문/숫자 혼합"></Input>
                        </div>
                        <div className="signup_article">
                            <Title style={{fontSize:"16px", color:"#7f7f7f"}}>비밀번호 재입력</Title>
                            <Input type="password" name="user_password_re" className="signup_inputs" placeholder="재입력"></Input>
                        </div>
                        <div className="signup_article">
                            <Title style={{fontSize:"16px", color:"#7f7f7f"}}>본인 인증</Title>
                            <div style={{display:"flex"}}>
                                <div style={{flex:"1 1 0"}}>
                                    <Input type="tel" name="user_password_re" className="signup_inputs" placeholder="휴대폰 번호"></Input>
                                </div>
                                <div style={{flexBasis:"80px", textAlign:"right", paddingLeft:"5px"}}>
                                    <Button className="phoneAuthButon">인증</Button>
                                </div>
                            </div>
                            <div style={{display:"flex"}}>
                                <div style={{flex:"1 1 0"}}>
                                    <Input type="tel" name="user_password_re" className="signup_inputs" placeholder="인증번호 입력"></Input>
                                </div>
                                <div style={{flexBasis:"80px", textAlign:"right", paddingLeft:"5px"}}>
                                    <Button className="phoneAuthButon">확인</Button>
                                </div>
                            </div>
                        </div>
                        <div className="signup_article" style={{marginTop:"20px"}}>
                            <Button className="signup_button" onClick={()=>{alert('가입')}}>가입 완료</Button>
                        </div>
                        
                    </section>                
                    <section className="signup_box" style={{backgroundColor:"#fff", height:"200px", maxWidth:"unset"}}>
                    <Title style={{fontSize:"22px", fontWeight:"900", textAlign:"center", color:"#282828"}}>이미 회원이신가요?</Title>
                    <div style={{margin:"20px 0", textAlign:"center"}}>
                        <NavLink to="/login">
                            <FlatButton className="sign_in_button">로그인</FlatButton>
                        </NavLink>
                    </div>
                </section>
                <Footer></Footer>
            </div>
        );  
    }
};

export default PAGEConnectSignUp;