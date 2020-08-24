import React, { Component } from 'react';
import './ConnectAboutUs.css';
import TopBanner from '../component/TopBanner/TopBanner';
import Footer from '../assembly/Footer/Footer';

class PAGEConnectAboutUs extends Component {
    render(){
        var top_banner_style = {
            backgroundImage:"url('/images/top_banner/top_banner3.png')",
            backgroundSize:"cover",
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat"
        };
       return (
            <div className={this.props.classes}>
                <TopBanner style={top_banner_style}>
                    <h1 className="topbanner_description_at_aboutus">배우는 즐거움, 가르치는 열정</h1>
                    <h3 className="topbanner_subdescription_at_aboutus">레슨이 쉽게 연결되는 새로운 세상을 꿈꾸다</h3>
                </TopBanner>
                <section className="section_at_aboutus" style={{marginTop:"50px", marginBottom:"100px"}}>
                    <h3 className="section_title_at_aboutus">피터스 STORY</h3>
                    <p className="section_content_at_aboutus">
                        피터스는 2018년 5월 세상에 처음 한걸음 내딛었습니다. <br></br>
                        대형 스튜디오나 헬스장에서 사용하는 회원 예약과 관리 시스템을 소규모 자영업자와 프리랜서 강사들도 부담없이 누릴 수 있도록 하자는 목표로 만들었습니다.<br></br><br></br>
                        2018 베타테스트, 2019 11월 2.0버전으로 리뉴얼한 PTERS 관리 시스템은 3천명이상의 레슨 강사님들께서 사용중인 서비스로 발전하였습니다.<br></br>
                        <span style={{fontWeight:"500"}}>피터스 커넥트</span>는 업무 관리뿐 아니라 고객 모집에도 공헌하자는 뜻이 모아져 태어나게 되었습니다.<br></br><br></br>
                        <span style={{fontWeight:"500"}}>가르치는 열정과 배우는 즐거움을 누구나 쉽게 느낄 수 있는 세상<br></br> 피터스가 꿈꾸는 세상입니다.</span>
                    </p>
                </section>
                <Footer></Footer>
            </div>
        ); 
    }
    
};

export default PAGEConnectAboutUs;