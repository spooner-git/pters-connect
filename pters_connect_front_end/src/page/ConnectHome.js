import React, { Component } from 'react';
import "./ConnectHome.css";
import ButtonToggle from '../component/Buttons/ButtonToggle';
import { PROGRAM_CATEGORY } from '../const';
import { NavLink } from 'react-router-dom';
import SectionTitle from '../component/SectionTitle';
import TopBanner from '../component/TopBanner/TopBanner';
import ImageButton from '../component/Buttons/ImageButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faMusic } from '@fortawesome/free-solid-svg-icons';

class PAGEConnectHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            category1:Object.keys(PROGRAM_CATEGORY)[0],
            category2:null
        }
    }

    handle_category1_set = (code)=>{
        this.setState({
            category1:code
        })
    }

    handle_category2_set = (code)=>{
        // this.handle_clear_category();
    }

    handle_clear_category = ()=>{
        this.setState({
            category1:null,
            category2:null
        })
    }

    go_url(url){
        window.location.href = url;
    }


    render(){
       return (
            <div className={this.props.classes}>
                <section className="section_at_home" style={{maxWidth:"unset"}}>
                    <TopBanner>
                        <h1 style={{textAlign:"center", fontSize:"20px", color:"#ffffff", fontWeight:"bold"}}>PTERS 커넥트</h1>
                        <p className="topbanner_description_at_home">내 주변 레슨 바로 검색</p>
                    </TopBanner>
                </section>

                <section>
                    <h2 style={{textAlign:"center", fontSize:"16px", fontWeight:"normal", maxWidth:"540px", margin:"auto", padding:"20px"}}>
                        배우고 싶은게 있는데, 어떻게 시작해야할 지 고민인가요?<br></br>
                        피터스 커넥트에서 내 주변 레슨 강사님을 검색하고 상담을 요청해보세요!<br></br>
                        더 쉽고 간편하게 레슨이 연결되는 새로운 세상!
                    </h2>
                </section>

                <section className="section_at_home" style={{padding:"20px 0"}}>
                    {/* <SectionTitle style={{padding:"0 20px", fontWeight:"500"}}>주 분류</SectionTitle> */}
                    <div className="home_category1_wrap">
                        {        
                            Object.keys(PROGRAM_CATEGORY).map((el)=>{
                                let name = PROGRAM_CATEGORY[el].name;
                                let code = el;
                                let icon;
                                if(code === "TR"){
                                    icon = <FontAwesomeIcon icon={faRunning} style={{fontSize:"20px", marginRight:"5px"}}></FontAwesomeIcon>;
                                }else if(code === "MU"){
                                    icon =<FontAwesomeIcon icon={faMusic} style={{fontSize:"20px", marginRight:"5px"}}></FontAwesomeIcon>
                                }
                                let selected = code === this.state.category1 ? true : false;
                                return <ButtonToggle onClick={()=>{this.handle_category1_set(code)}} highlight={selected} key={code} style={{borderRadius:"4px", height:"55px", border:0, fontSize:"16px"}} parent_style={{padding:0}}>
                                            {icon}
                                            {name}
                                        </ButtonToggle>
                            })
                        }
                    </div>
                </section>
                <section className="section_at_home">
                    <div className="home_category2_wrap">
                        {
                            Object.keys(PROGRAM_CATEGORY[this.state.category1].sub_category).map((el)=>{
                                let name = PROGRAM_CATEGORY[this.state.category1].sub_category[el].name;
                                let code = el;
                                return  <ImageButton key={code} onClick={()=>{this.handle_category2_set(code);this.go_url(`/list/?${this.state.category1}/?${code}`)}} image_url={`/images/category/category_image_${code}.jpg`} style={{display:"inline-block", width:"50%", height:"80px", border:"1px solid black", padding:"10px 20px"}}>
                                        <h3 style={{fontSize:"18px", fontWeight:"bold", color:"#ffffff", margin:"0"}}>{name}</h3>
                                        {/* <span style={{float:"right", fontSize:"12px", fontWeight:"500", color:"#ffffff"}}>강사 123명</span> */}
                                    </ImageButton>
                            })
                        }
                    </div>
                </section>
            </div>
        ); 
    }
    
};

export default PAGEConnectHome;