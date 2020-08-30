import React, { Component } from 'react';
import './ConnectPlace.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShower, faTshirt, faClone, faLock, faParking, faMap, faTimes, faExclamationTriangle, faArrowLeft, faLongArrowAltLeft, faArrowAltCircleLeft, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Button from '../component/Buttons/Button';
import { demo_info } from '../demo_db';
import Modal from '../modal/Modal';
import Title from '../component/Title/Title';
import TextArea from '../component/Inputs/TextArea';
import { observer } from 'mobx-react';

@observer
class PAGEConnectPlace extends Component {
    constructor(props){
        super(props);
        this.href = document.location.href.split("/teacher/");
        this.id = this.href[1];
    }
    
    state = {
        data:{
            id:null,
            name:null,
            profile_url:null,
            background_url:null,
            simple_introduce:null,
            content: null,
            address:null,
            x:"",
            y:"",
            amenities:[
                
            ],
            review:{
                star:null,
                reviewer:null,
            }
        },
        inquiry_modal_open:0
    }

    componentDidMount = ()=>{
        this.setState({
            data:demo_info
        });
    }

    get_info_from_server(){

    }

    open_inquiry_modal = ()=>{
        this.setState({
            inquiry_modal_open:1
        });
    }

    close_inquiry_modal = ()=>{
        this.setState({
            inquiry_modal_open:0
        })
    }

    _winClose = () =>{
        window.open('','_self').close();     
    }

    render(){
        return (
            <div className={`connect_teacher_page ${this.props.classes}`}>
                <div className="connect_teacher_wrap">
                    <div className="connect_teacher_wrap_left">
                        <section style={{position:"fixed", bottom:"20px"}}>
                            <div style={{height:"40px", lineHeight:"40px", backgroundColor:"white", verticalAlign:"middle", borderRadius:"5px", boxShadow:"0 0 5px 0 grey"}}>
                                <Button onClick={this._winClose} style={{border:"0", fontSize:"20px", color:"#fe4e65"}}>
                                    <FontAwesomeIcon icon={faArrowAltCircleLeft}></FontAwesomeIcon>
                                    <span style={{fontSize:"16px", fontWeight:"bolder", color:"#333333"}}> 뒤로</span>
                                </Button>
                            </div>
                        </section>
                        <section className="teacher_main_photo_wrap teacher_section" style={{paddingTop:0}}>
                            <div id="image_wrapper" style={{backgroundImage:`url("${this.state.data.background_url}")`}}>
                                <div style={{paddingTop:"60%"}}></div>
                            </div>
                        </section>

                        <section className="teacher_info_wrap teacher_section">
                            <div style={{display:"table", width:"100%"}}>
                                <div style={{display:"table-cell", width:"auto", verticalAlign:"middle"}}>
                                    <h1 id="teacher_title">{this.state.data.name}</h1>
                                    <div id="teacher_review_star">{this.state.data.review.star} <FontAwesomeIcon icon={faStar} color="#fe4e65"></FontAwesomeIcon> <span style={{color:"#7f7f7f"}}>{this.state.data.review.reviewer}</span></div>
                                </div>
                                <div style={{display:"table-cell", width:"100px", verticalAlign:"middle"}}>
                                    <div style={{width:"100px", height:"100px", borderRadius:"50%", backgroundColor:"#cccccc", backgroundImage:`url("${this.state.data.profile_url}")`, backgroundSize:"cover", backgroundPosition:"center", backgroundRepeat:"no-repeat"}}>
                                        
                                    </div>
                                </div>
                            </div>
                            
                            <p id="teacher_simple_introduce">
                                {this.state.data.simple_introduce}
                            </p>

                            <div style={{height:"40px"}}>
                                <Button style={{float:"right", borderRadius:"4px", height:"40px", lineHeight:"40px", padding:"0 15px", color:"#fe4e65", fontWeight:"bold", borderColor:"#fe4e65"}} onClick={()=>{this.open_inquiry_modal();}}>상담 보내기</Button>
                                {
                                    this.state.inquiry_modal_open === 1
                                    ?<Modal style={{height:"", maxWidth:"600px", left:"50%", transform:"translateX(-50%)", boxShadow:"0 0 2px 0"}} className="inquiry_modal" event_close={()=>{this.close_inquiry_modal()}}>
                                        <InquiryWriter name={this.state.data.name} id={this.state.data.id} event_close={()=>{this.close_inquiry_modal()}}></InquiryWriter>
                                    </Modal>
                                    :""
                                }
                            </div>
                        </section>

                        <section className="teacher_content_wrap teacher_section">
                            <h3>소개</h3>
                            <div>
                                {this.state.data.content}
                            </div>
                        </section>

                        <section className="teacher_location_wrap teacher_section">
                            <div id="map_wrap" style={{border:"1px solid #7f7f7f", height:"270px", marginBottom:"15px"}}>

                            </div>
                            <div id="social_contact_wrap">
                                <div><FontAwesomeIcon icon={faMap} style={{fontSize:"16px", color:"#7f7f7f"}}></FontAwesomeIcon> {this.state.data.address}</div>
                            </div>
                        </section>
                        {/* 무료로 이용하는 강사는 [상담보내기] 버튼만 보여서 PTERS로만 받을 수 있고,
                            유료로 이용하는 강사는 주소, 전화번호, Insta, facebook등 원하는 정보를 모두 노출할 수 있다.
                        */}

                        <section className="teacher_amenities_wrap teacher_section">
                                <div className="amenity_element">
                                    <div style={{fontSize:"20px", color: this.state.data.amenities.indexOf("shower") !== -1 ? "#fe4e65" : "#cccccc"}}><FontAwesomeIcon icon={faShower}></FontAwesomeIcon>
                                    </div><div>샤워실</div>
                                </div>
                                <div className="amenity_element">
                                    <div style={{fontSize:"20px", color:this.state.data.amenities.indexOf("locker") !== -1 ? "#fe4e65" : "#cccccc"}}><FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                    </div><div>라커</div>
                                </div>
                                <div className="amenity_element">
                                    <div style={{fontSize:"20px", color:this.state.data.amenities.indexOf("towel") !== -1 ? "#fe4e65" : "#cccccc"}}><FontAwesomeIcon icon={faClone}></FontAwesomeIcon>
                                    </div><div>타월</div>
                                </div>
                                <div className="amenity_element">
                                    <div style={{fontSize:"20px", color:this.state.data.amenities.indexOf("cloth") !== -1 ? "#fe4e65" : "#cccccc"}}><FontAwesomeIcon icon={faTshirt}></FontAwesomeIcon>
                                    </div><div>운동복</div>
                                </div>
                                <div className="amenity_element">
                                    <div style={{fontSize:"20px", color:this.state.data.amenities.indexOf("parking") !== -1 ? "#fe4e65" : "#cccccc"}}><FontAwesomeIcon icon={faParking}></FontAwesomeIcon>
                                    </div><div>주차</div>
                                </div>
                        </section>

                        <section className="teacher_review_from_users_wrap teacher_section">
                        teacher_review_from_users_wrap
                        </section>
                    </div>
                    <div className="connect_teacher_wrap_right">
                        
                    </div>
                </div>
                {/* <Footer></Footer> */}
            </div>
        );
    }
};


class InquiryWriter extends Component {
    render(){
        return (
            <div>
                <div style={{maxWidth:"600px", margin:"0 auto", backgroundColor:"#f5f2f3", padding:"0 20px 20px"}}>
                    <div style={{height:"60px", display:"flex", padding:"10px 0"}}>
                        <div style={{flex:"1 1 0"}}>
                            <Title><span style={{fontSize:"20px", fontWeight:"900"}}>상담 요청</span> ({this.props.name})</Title>
                        </div>
                    </div>
                    <div style={{padding:"10px 0"}}>
                        <Title>레슨 목표</Title>
                        <TextArea placeHolder="100자 이내" maxLength="100" style={{width:"100%", minHeight:"65px", maxHeight:"65px", overflowY:"auto"}}></TextArea>
                    </div>
                    <div style={{padding:"10px 0"}}>
                        <Title>궁금한 점</Title>
                        <TextArea placeHolder="300자 이내" maxLength="300" style={{width:"100%", minHeight:"65px", maxHeight:"90px", overflowY:"auto"}}></TextArea>
                    </div>
                    <div>
                        <p style={{fontSize:"14px", color:"#fe4e65", wordBreak:"keep-all"}}> <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon> 요청 발송 후 5일간 같은 강사님께 요청을 반복해서 보낼 수 없으니, 신중히 작성해주세요.</p>
                    </div>
                    <div style={{display:"flex", flexDirection:"row"}}>
                        <div style={{flex:"4 1 0"}}>
                            <Button highlight={true} style={{borderRadius:"3px", width:"100%", height:"45px", lineHeight:"45px", border:"0"}} onClick={()=>{alert("컨펌 팝업")}}>보내기</Button>
                        </div>
                        <div style={{flexBasis:"10px"}}></div>
                        <div style={{flex:"1 1 0"}}>
                            <Button highlight={true} style={{borderRadius:"3px", width:"100%", height:"45px", lineHeight:"45px", border:"0", background:"grey"}} onClick={()=>{this.props.event_close()}}>취소</Button>
                        </div>    
                    </div>
                </div>
            </div>
        );
    }
};


export default PAGEConnectPlace;