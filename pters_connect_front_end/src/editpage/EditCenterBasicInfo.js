import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import Input from '../component/Inputs/Input';
import queryString from 'query-string';
import CFunc from '../func/CFunc';
import Title from '../component/Title/Title';
import './EditCenterBasicInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import FlatButton from '../component/Buttons/FlatButton';
import Button from '../component/Buttons/Button';

@observer
class EDITCenterBasicInfo extends Component{

    @observable centerID;
    @observable centerName;
    @observable centerAddress;
    @observable centerPhone;

    constructor(props){
        super(props);
        let query = queryString.parse(this.props.location.location.search);
        this.setCenterID(query.centerID);
    }

    @action
    setCenterID = (centerID) => {
        this.centerID = centerID;
    }

    @action
    setCenterName = (e) => {
        this.centerName = e.target.value;
    }

    @action
    setCenterAddress = (e) => {
        this.centerAddress = e.target.value;
    }

    @action
    setCenterPhone = (e) => {
        this.centerPhone = e.target.value;
    }

    componentDidMount(){
        // CFunc.ajax(
        //     {
        //         url:"https://httpbin.org/get",
        //         type:"GET",
        //         data:{"pters":this.centerID}
        //     },
        //     {
        //         callback: (data)=>{
        //             console.log("정상통신"+JSON.stringify(data));
        //         },
        //         error_callback:(data)=>{
        //             console.log(data);
        //             console.log("에러데이터");
        //         }
        //     }
        // )
    }

    _goBack = () =>{
        this.props.location.history.goBack();   
    }

    render(){
        return(
            <div className="connect_edit_center_basic_info_page">
                <div className="connect_edit_center_basic_info_top_tool">
                    <FlatButton>
                        <div style={{fontSize:"18px"}} onClick={this._goBack}>
                            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                            <span> 뒤로</span>
                        </div>
                    </FlatButton>
                </div>
                <div className="connect_edit_center_basic_info_input_wrap">
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>센터명</Title>
                        <Input onChange={this.setCenterName} className="connect_edit_center_basic_info_inputs" placeholder=""></Input>
                    </div>
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>주소</Title>
                        <Input onChange={this.setCenterAddress} className="connect_edit_center_basic_info_inputs" placeholder=""></Input>
                    </div>
                    <div>
                        <Title style={{fontSize:"16px", color:"#7f7f7f"}}>연락처</Title>
                        <Input onChange={this.setCenterPhone} className="connect_edit_center_basic_info_inputs" placeholder=""></Input>
                    </div>
                    <div style={{textAlign:"right", marginTop:"15px"}}>
                        <FlatButton style={{width:"75px"}} onClick={this._goBack}>취소</FlatButton>
                        <Button style={{width:"75px"}} highlight={true}>저장</Button>
                    </div>
                </div>
            </div>
        );
    }
}


export default EDITCenterBasicInfo;