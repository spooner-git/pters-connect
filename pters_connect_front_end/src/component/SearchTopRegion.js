import React, { Component } from 'react';
import './SearchTopRegion.css';
import Button from '../component/Buttons/Button'
import Modal from '../modal/Modal';
import { OPEN, CLOSE } from '../const';
import RegionSelector from './RegionSelector/RegionSelector';


class SearchTopRegion extends Component {

    state = {
        region_selector:CLOSE,
        selected_city:this.props.city === null ? null : this.props.city,
        selected_gu:this.props.gu === null ? null : this.props.gu
    }

    handle_open_region_selector = ()=>{
        this.setState({
            region_selector: OPEN
        });
    }

    handle_close_region_selector = ()=>{
        this.setState({
            region_selector: CLOSE
        });
    }

    set_selected_data = (city, gu)=>{
        document.location.href = `/${this.props.current_page}?main_category=${this.props.category1 === null ? "TR": this.props.category1}&sub_category=${this.props.category2 === null ? "WT" : this.props.category2}&city=${city}&gu=${gu}`;
        // this.handle_close_region_selector();
    }


    render(){
        return (
            <div className="search_tool">
                <div className="search_input_wrap">
                    {/* <input className="search_input" placeholder="지역 검색" onClick={()=>{this.handle_open_region_selector()}}></input> */}
                    <Button className="search_top_region_region_input" onClick={()=>{this.handle_open_region_selector()}}>
                        {this.state.selected_city === null ? "지역 검색" : this.state.selected_city + ' ' + this.state.selected_gu}
                    </Button>
                </div>
                <div className="seach_type_button_wrap" style={{display:this.props.toggle_button === CLOSE ? "none" : ""}}>
                    {
                        this.props.list_view === 0
                        ?<Button onClick={this.props.event_list_on} style={{color:"#fe4e65", height:"40px", lineHeight:"40px", width:"70px"}}>리스트</Button>
                        :<Button onClick={this.props.event_list_off} style={{color:"#fe4e65", height:"40px", lineHeight:"40px", width:"70px"}}>지도</Button>
                    }
                </div>
                {
                    this.state.region_selector === OPEN
                    ?<Modal className="region_selector_modal" style={{maxWidth:"600px", overflowY:"hidden"}} event_close={this.handle_close_region_selector}>
                       <RegionSelector setData={(city, gu)=>{this.set_selected_data(city, gu)}}></RegionSelector>
                    </Modal>
                    :"" 
                }
            </div>
        );
    }
    
};

export default SearchTopRegion;