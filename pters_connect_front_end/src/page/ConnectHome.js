import React, { Component } from 'react';
import "./ConnectHome.css";
import ButtonToggle from '../component/Buttons/ButtonToggle';
import { PROGRAM_CATEGORY } from '../const';
import { NavLink } from 'react-router-dom';
import TopBanner from '../component/TopBanner/TopBanner';
import ImageButton from '../component/Buttons/ImageButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRunning, faMusic } from '@fortawesome/free-solid-svg-icons';
import Footer from '../component/Footer';
import Title from '../component/Title';
import Button from '../component/Buttons/Button';

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
                <section className="section_at_home">
                    <TopBanner>
                        {/* <h1 style={{textAlign:"center", fontSize:"20px", color:"#ffffff", fontWeight:"bold"}}>PTERS 커넥트</h1> */}
                        {/* <p className="topbanner_description_at_home">레슨, 쉽게 찾자</p> */}
                        <h1 className="topbanner_description_at_home">레슨a, 쉽게 찾자</h1>
                    </TopBanner>
                </section>

                <section style={{display:"none"}}>
                    <h2 style={{textAlign:"center", fontSize:"16px", fontWeight:"normal", maxWidth:"540px", margin:"auto", padding:"20px", wordBreak:"keep-all"}}>
                        배우고 싶은게 있는데,<br></br> 어떻게 시작해야할 지 고민인가요?<br></br><br></br>
                        피터스 커넥트에서<br></br> 내 주변 레슨 강사님을 검색하고 상담을 요청해보세요!<br></br>
                        더 쉽고 간편하게 레슨이 연결되는 새로운 세상!
                    </h2>
                </section>

                <section className="section_at_home" style={{padding:"20px 0", paddingBottom:"0"}}>
                    <h2 style={{textAlign:"left", fontSize:"30px", fontWeight:"900", margin:0, padding:"0 20px", wordBreak:"keep-all"}}>
                        원하는 레슨을 선택하세요
                    </h2>
                    <h3 style={{textAlign:"left", fontWeight:"normal", marginTop:0, padding:"0 20px"}}>간편하게 검색하고, 상담요청을 보내세요</h3>
                    <div className="home_category1_wrap" hidden>
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
                                return <ButtonToggle onClick={()=>{this.handle_category1_set(code)}} highlight={selected} key={code} style={{borderRadius:"2px", height:"55px", border:0, fontSize:"16px"}} parent_style={{padding:0}}>
                                            {icon}
                                            {name}
                                        </ButtonToggle>
                            })
                        }
                    </div>
                </section>
                <section className="section_at_home" style={{padding:"20px 0", paddingTop:"0"}}>
                    <div className="home_category2_wrap">
                        {
                            Object.keys(PROGRAM_CATEGORY[this.state.category1].sub_category).map((el)=>{
                                let name = PROGRAM_CATEGORY[this.state.category1].sub_category[el].name;
                                let code = el;
                                return  <ImageButton key={code} 
                                                    onClick={()=>{this.handle_category2_set(code);this.go_url(`/list/?${this.state.category1}/?${code}`)}} 
                                                    image_url={`/images/category/category_image_${code}.jpg`} 
                                                    style={{display:"inline-block", height:"80px", border:"1px solid black", padding:"10px 20px", verticalAlign:"top", backgroundColor:"#282828"}}
                                                    className="lesson_brick_image_button"
                                                    >
                                        <h3 style={{fontSize:"18px", fontWeight:"bold", color:"#ffffff", margin:"0", wordBreak:"keep-all"}}>{name}</h3>
                                    </ImageButton>
                            })
                        }
                    </div>
                </section>
                
                <section className="section_at_home section_introduce" style={{backgroundColor:"#f5f2f3"}}>
                    <div className="home_flex_parent flex_reverse">
                        <div>
                            <img src="/images/front_page/pters_connect3.png" style={{width:"100%"}} className="front_image"></img>
                            <div style={{paddingTop:"80%"}}></div>
                        </div>
                        <div style={{textAlign:"left"}}>
                            <div style={{position:"absolute", top:"50%", transform:"translateY(-50%)"}}>
                                <Title style={{fontSize:"28px", fontWeight:"900", padding:"10px 0", wordBreak:"keep-all"}}>레슨을 만나는 가장 쉬운 방법</Title>
                                <Title style={{fontSize:"16px", fontWeight:"400", padding:"0", wordBreak:"keep-all"}}>좋은 강사님 어떻게 찾을지 고민 하지마세요.</Title>
                                <Title style={{fontSize:"16px", fontWeight:"400", padding:"0", wordBreak:"keep-all"}}>간편하게 검색하고, 나와 맞는 강사님을 찾아 부담없이 상담할 수 있습니다.</Title>
                                <Title style={{fontSize:"16px", fontWeight:"400", padding:"0", wordBreak:"keep-all"}}>지금 바로 시작해보세요!</Title>
                                {/* <Button highlight={true} style={{border: "0", borderRadius:"3px", marginTop:"15px", padding:"0 15px", fontWeight:"500"}}>회원 가입</Button> */}
                            </div>
                            <div style={{paddingTop:"40%", minHeight:"250px"}}></div>
                        </div>
                    </div>
                </section>
                <section className="section_at_home section_introduce" style={{backgroundColor:"#fff"}}>
                    <div className="home_flex_parent">
                        <div style={{textAlign:"left"}}>
                            <div style={{position:"absolute", top:"50%", transform:"translateY(-50%)"}}>
                                <Title style={{fontSize:"28px", fontWeight:"900", padding:"10px 0", wordBreak:"keep-all"}}>수수료 없이 레슨 고객님과 연결</Title>
                                <Title style={{fontSize:"16px", fontWeight:"400", padding:"0", wordBreak:"keep-all"}}>연결시마다 부담되는 수수료 부담 No!</Title>
                                <Title style={{fontSize:"16px", fontWeight:"400", padding:"0", wordBreak:"keep-all"}}>내 프로필을 작성하고 레슨에만 집중해보세요!</Title>
                                <Title style={{fontSize:"16px", fontWeight:"400", padding:"0", wordBreak:"keep-all"}}>상담이 도착했을 때 연락해 드릴께요.</Title>
                                <Button highlight={true} style={{border: "0", borderRadius:"3px", marginTop:"15px", padding:"0 15px", fontWeight:"500"}}>강사로 가입</Button>
                            </div>
                            
                            <div style={{paddingTop:"40%", minHeight:"250px"}}></div>
                        </div>
                        <div>
                            <img src="/images/front_page/bg_big.png" style={{height:"100%", opacity:"0.8"}} className="front_image"></img>
                            <div style={{paddingTop:"80%"}}></div>
                        </div>
                    </div>
                </section>
                <Footer></Footer>
            </div>
        ); 
    }
    
};

export default PAGEConnectHome;