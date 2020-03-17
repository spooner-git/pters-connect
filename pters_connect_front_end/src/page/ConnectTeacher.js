import React, { Component } from 'react';
import './ConnectTeacher.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faShower, faTshirt, faClone, faLock, faParking, faAddressBook, faMap } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import Button from '../component/Buttons/Button';
import { demo_info } from '../demo_db';

class PAGEConnectTeacher extends Component {
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
        }
    }

    componentDidMount = ()=>{
        this.setState({
            data:demo_info
        });
    }

    get_info_from_server(){

    }

    render(){
        return (
            <div className={`connect_teacher_page ${this.props.classes}`}>
                <div className="connect_teacher_wrap">
                    <div className="connect_teacher_wrap_left">
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
                                <Button style={{float:"right", borderRadius:"4px", height:"40px", lineHeight:"40px", padding:"0 15px", color:"#fe4e65", fontWeight:"bold", borderColor:"#fe4e65"}}>상담 보내기</Button>
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
                                <div style={{fontSize:"20px", color:"#7f7f7f"}}><FontAwesomeIcon icon={faShower}></FontAwesomeIcon>
                                </div><div>샤워실</div>
                            </div>
                            <div className="amenity_element">
                                <div style={{fontSize:"20px", color:"#7f7f7f"}}><FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                </div><div>라커</div>
                            </div>
                            <div className="amenity_element">
                                <div style={{fontSize:"20px", color:"#7f7f7f"}}><FontAwesomeIcon icon={faClone}></FontAwesomeIcon>
                                </div><div>타월</div>
                            </div>
                            <div className="amenity_element">
                                <div style={{fontSize:"20px", color:"#7f7f7f"}}><FontAwesomeIcon icon={faTshirt}></FontAwesomeIcon>
                                </div><div>운동복</div>
                            </div>
                            <div className="amenity_element">
                                <div style={{fontSize:"20px", color:"#7f7f7f"}}><FontAwesomeIcon icon={faParking}></FontAwesomeIcon>
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
            </div>
        );
    }
    
};

export default PAGEConnectTeacher;