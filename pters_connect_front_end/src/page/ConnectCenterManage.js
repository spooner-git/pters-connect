import React, { Component } from 'react';
import './ConnectCenterManage.css';
import ListTile from '../component/ListTile/ListTile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faEnvelope, faShower, faTshirt, faClone, faLock, faParking } from '@fortawesome/free-solid-svg-icons';
import Button from '../component/Buttons/Button';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import CFunc from '../func/CFunc';
import LoadingImg from '../component/LoadingImg/LoadingImg';
import { NavLink } from 'react-router-dom';
import FlatButton from '../component/Buttons/FlatButton';

@observer
class PAGEConnectCenterManage extends Component{

    @observable demoAcademy;
    @observable demoCenterInfo;

    componentDidMount(){
        this.academyDataSet();
        this.centerDataSet();
        // CFunc.ajax(
        //     {
        //         url:"https://httpbin.org/get",
        //         type:"GET",
        //         data:{"pters":this.props.centerID}
        //     },
        //     {
        //         callback: (data)=>{
        //             this.academyDataSet();
        //             console.log("정상통신"+data);
        //         },
        //         error_callback:(data)=>{
        //             console.log("에러데이터");
        //         }
        //     }
        // )
        // CFunc.ajax(
        //     {
        //         url:"https://httpbin.org/get",
        //         type:"GET",
        //         data:{"pters":this.props.centerID}
        //     },
        //     {
        //         callback: (data)=>{
        //             this.centerDataSet();
        //             console.log("정상통신"+data);
        //         },
        //         error_callback:(data)=>{
        //             console.log(data);
        //             console.log("에러데이터");
        //         }
        //     }
        // )
    }

    @action
    academyDataSet = () => {
        setTimeout(()=>{
            this.demoAcademy = [
                {title:"골프 1:1 레슨", subtitle:"티칭프로", tutors:[{tutorName:"김하하", tutorID:"123"}, {tutorName:"박나나", tutorID:"234"}, {tutorName:"배리리", tutorID:"345"}, {tutorName:"하나로", tutorID:"456"}, {tutorName:"우편서", tutorID:"567"}, {tutorName:"해커스", tutorID:"678"}]}, 
                {title:"골프 피팅", subtitle:"프로", tutors:[{tutorName:"해커스", tutorID:"678"}, {tutorName:"김프로", tutorID:"789"}]}
            ]
        }, 1000);
    }

    @action
    centerDataSet = () => {
        setTimeout(()=>{
            this.demoCenterInfo = {
                centerName:"건강한 사람들 송파본점",
                centerAddress:"서울시 송파구 가락로 134",
                centerPhone:"010-3443-5752",
                facility:[
                    "SHOWER", "LOCKER", "TOWEL", "CLOTH", "PARKING"
                ]
            }
        }, 600);
    }

    DOMCenterInfo = () => {
        let link = `/center_basic_info_edit?centerID=${this.props.centerID}`;
        return <ListTile 
                    title={this.demoCenterInfo.centerName} 
                    subtitle={<div>
                                <div>{this.demoCenterInfo.centerAddress}</div>
                                <div>{this.demoCenterInfo.centerPhone}</div>
                            </div>} 
                    trailing={<Button style={{border:"0", fontSize:"25px", color:"#464646"}} onClick={()=>{console.log("123123")}}>
                                <NavLink to={link}><FontAwesomeIcon icon={faCog}></FontAwesomeIcon></NavLink>
                            </Button> }
                >
                </ListTile>
    }

    DOMAcademyInfoItem = (academyInfo) => {
        return <div style={{border:"1px solid #e8e8e8", borderRadius:"4px", margin:"3px 10px"}} key={academyInfo.title}>
        <ListTile
            key={academyInfo.title}
            style={{background:"linear-gradient(45deg, rgb(254 78 101 / 10%), rgb(215 0 255 / 1%))"}}
            title={<span style={{fontSize:"0.65em", fontWeight:"500", display:"table-cell"}}>{academyInfo.title}</span>}
            subtitle={<span style={{fontSize:"0.85em"}}>{academyInfo.subtitle}</span>}
            trailing={<div style={{padding:"3px", border:"1px solid #cccccc", borderRadius:"20px", textAlign:"center", fontSize:"0.8em", backgroundColor:"#ffffff"}}>골프</div>}
        >
        </ListTile>
        <div style={{height:"1px", border:"1px solid #f5f2f3"}}></div>
        <div className="grid_wrap_5" style={{padding:"10px"}}>
            {
                academyInfo.tutors.map((tutorInfo)=>(<div className="grid_item_5" key={tutorInfo.tutorID}><TutorPhoto name={tutorInfo.tutorName}></TutorPhoto></div>))
            }
        </div>
    </div>
    }

    render(){
        return(
            <div>
                <div className={`connect_center_manage_wrap`} style={{boxShadow:"unset"}}>
                    <ListTile 
                        title={<span>내 센터</span>}
                        trailing={<FlatButton><NavLink to="/center_create">추가</NavLink></FlatButton>}
                    ></ListTile>
                </div>
                <div className={`connect_center_manage_page ${this.props.classes}`}>
                    <div className="connect_center_manage_wrap">
                        <section className="center_manage_section center_basic_info_wrap">
                            <div>
                                {
                                    this.demoCenterInfo == null
                                    ?<div style={{textAlign:"center"}}><LoadingImg size="25px"></LoadingImg><p style={{margin:"0"}}>Ajax Waiting DEMO 600ms</p></div>
                                    :this.DOMCenterInfo()
                                }
                            </div>
                        </section>

                        <section className="center_manage_section center_inquiry_info_wrap">
                            <div>
                                <ListTile 
                                    style={{cursor:"pointer"}}
                                    title={<span style={{fontSize:"0.7em", fontWeight:"500"}}>상담요청 <span style={{fontWeight:"bold"}}>1</span></span>}
                                    subtitle={<div style={{color:"#fe4e65", fontSize:"14px", padding:"0 5px"}}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> <span>처리하지 않은 상담이 있습니다.</span></div>}
                                    trailing={<Button style={{border:"0", fontSize:"14px", color:"#fe4e65"}}>
                                                <span>보기</span>
                                            </Button>}
                                    onClick={()=>{console.log("상담상담")}}
                                >
                                </ListTile>
                            </div>                        
                        </section>

                        <section className="center_manage_section center_academy_info_wrap">
                            <div>
                                <ListTile 
                                    title={<span style={{fontSize:"0.7em", fontWeight:"500"}}>아카데미 <span style={{fontWeight:"bold"}}>4</span></span>}
                                    trailing={
                                        <Button style={{border:"0", fontSize:"14px", color:"#fe4e65"}} onClick={()=>{console.log("아카데미 추가")}}>
                                            <span>추가</span>
                                        </Button>
                                    }
                                >
                                </ListTile>
                            </div>
                            <div>
                                {   
                                    this.demoAcademy == null
                                    ?<div style={{textAlign:"center"}}><LoadingImg size="25px"></LoadingImg><p style={{margin:"0"}}>Ajax Waiting DEMO 1,000ms</p></div>
                                    :this.demoAcademy.map((academyInfo)=>(this.DOMAcademyInfoItem(academyInfo)))
                                }
                            </div>
                        </section>

                        <section className="center_manage_section center_facility_info_wrap">
                            <div>
                                <ListTile 
                                    title={<span style={{fontSize:"0.7em", fontWeight:"500"}}>시설 <span style={{fontWeight:"bold"}}>4</span></span>}
                                    trailing={
                                        <Button style={{border:"0", fontSize:"14px", color:"#fe4e65"}} onClick={()=>{console.log("시설 변경")}}>
                                            <span>변경</span>
                                        </Button>
                                    }
                                >
                                </ListTile>
                            </div>
                            <div className="grid_wrap_5">
                                <div className="grid_item_5">
                                    <div style={{fontSize:"20px", color: "#fe4e65"}}><FontAwesomeIcon icon={faShower}></FontAwesomeIcon>
                                    </div><div>샤워실</div>
                                </div>
                                <div className="grid_item_5">
                                    <div style={{fontSize:"20px", color:"#fe4e65"}}><FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                                    </div><div>라커</div>
                                </div>
                                <div className="grid_item_5">
                                    <div style={{fontSize:"20px", color:"#fe4e65"}}><FontAwesomeIcon icon={faClone}></FontAwesomeIcon>
                                    </div><div>타월</div>
                                </div>
                                <div className="grid_item_5">
                                    <div style={{fontSize:"20px", color:"#fe4e65"}}><FontAwesomeIcon icon={faTshirt}></FontAwesomeIcon>
                                    </div><div>운동복</div>
                                </div>
                                <div className="grid_item_5">
                                    <div style={{fontSize:"20px", color:"#fe4e65"}}><FontAwesomeIcon icon={faParking}></FontAwesomeIcon>
                                    </div><div>주차</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}


class TutorPhoto extends Component{
    render(){
        return(
            <div style={{cursor:"pointer"}} onClick={()=>{console.log("가즈아")}}>
                <div style={{maxWidth:"80px", margin:"0 auto"}}>
                    <div style={{backgroundColor:"#cccccc", borderRadius:"50%", width:"100%", paddingTop:"100%"}}></div>
                </div>
                <div>{this.props.name}</div>
            </div>
        )
    }
}

export default PAGEConnectCenterManage;