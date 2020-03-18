import React from 'react';
import './Footer.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer_content">
                <section id="footer_company" className="footer_category_wrap">
                    <div className="footer_category">회사 소개</div>
                    <div className="footer_category_item"><NavLink to="/aboutus">About Us</NavLink></div>
                    <div className="footer_category_item">피터스 커넥트?</div>
                </section>

                <section id="footer_manual" className="footer_category_wrap">
                    <div className="footer_category">서비스</div>
                    <div className="footer_category_item">이용 안내</div>
                    <div className="footer_category_item">강사님이신가요?</div>
                    <div className="footer_category_item">레슨 찾고 계신가요?</div>
                </section>

                <section id="footer_sitemap" className="footer_category_wrap">
                    <div className="footer_category">사이트맵</div>
                    <div className="footer_category_item"><NavLink to="/">메인 홈</NavLink></div>
                    <div className="footer_category_item"><NavLink to="/list">리스트로 검색</NavLink></div>
                    <div className="footer_category_item"><NavLink to="/map">지도에서 검색</NavLink></div>
                    <div className="footer_category_item"><NavLink to="/login">회원가입/로그인</NavLink></div>
                </section>

                <section id="footer_family" className="footer_category_wrap">
                    <div className="footer_category">패밀리사이트</div>
                    <a href="https://www.pters.co.kr" target="_blank"><div className="footer_category_item">레슨관리앱 PTERS</div></a>
                </section>

                <section id="footer_inquiry">
                <div>
                    <span style={{fontWeight:"500"}}>고객센터 / </span><span style={{fontSize:"12px"}}>운영시간 10:00 - 18:00 (점심시간: 13:00 - 14:00)</span>
                    <div style={{textDecoration:"underline"}}>070-8816-1010</div>
                </div>
                <div>
                    <div style={{textDecoration:"underline"}}>support@pters.co.kr</div>
                </div>
                <div style={{marginTop:"30px"}}>
                    ⓒ <span style={{fontWeight:"900"}}>SPOONER</span>
                </div>
            </section>
            </div>
        </div>
    );
};

export default Footer;