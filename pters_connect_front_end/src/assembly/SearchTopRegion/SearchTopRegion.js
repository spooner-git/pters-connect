import React, { Component } from 'react';
import './SearchTopRegion.css';
import Button from '../../component/Buttons/Button'
import Modal from '../../modal/Modal';
import { OPEN, CLOSE } from '../../const';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import RegionSelector from '../../component/RegionSelector/RegionSelector';

@observer
class SearchTopRegion extends Component {
    @observable region_selector = CLOSE;
    @observable selected_city = this.props.city === null ? null : this.props.city;
    @observable selected_gu = this.props.gu === null ? null : this.props.gu;

    // state = {
    //     region_selector:CLOSE,
    //     selected_city:this.props.city === null ? null : this.props.city,
    //     selected_gu:this.props.gu === null ? null : this.props.gu
    // }

    @action
    handle_open_region_selector = ()=>{
        this.region_selector = OPEN;
    }

    @action
    handle_close_region_selector = ()=>{
        this.region_selector = CLOSE;
    }

    @action
    set_selected_data = (city, gu)=>{
        document.location.href = `/${this.props.current_page}?main_category=${this.props.category1 === null ? "GOLF": this.props.category1}&sub_category=${this.props.category2 === null ? "OUTDOOR" : this.props.category2}&city=${city}&gu=${gu}`;
    }


    render(){
        return (
            <div className="search_tool">
                <div className="search_input_wrap">
                    <Button className="search_top_region_region_input" onClick={this.handle_open_region_selector}>
                        {this.selected_city === null ? "지역 검색" : this.selected_city + ' ' + this.selected_gu}
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
                    this.region_selector === OPEN
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