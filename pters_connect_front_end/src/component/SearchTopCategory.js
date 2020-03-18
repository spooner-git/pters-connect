import React, { Component } from 'react';
import './SearchTopCategory.css';
import Button from '../component/Buttons/Button'
import Modal from '../modal/Modal';
import { OPEN, CLOSE, PROGRAM_CATEGORY } from '../const';
import MainCategory from './MainCategory/MainCategory';
import SubCategory from './SubCategory/SubCategory';


class SearchTopCategory extends Component {

    state = {
        category1:CLOSE,
        category2:CLOSE,
        category1_selected:this.props.category1 === undefined ? null : this.props.category1,
        category2_selected:this.props.category2 === undefined ? null : this.props.category2
    }

    handle_open_category1 = ()=>{
        this.setState({
            category1: OPEN,
            category2:CLOSE,
        });
    }

    handle_close_category1 = ()=>{
        this.setState({
            category1: CLOSE
        });
    }

    handle_open_category2 = ()=>{
        this.setState({
            category2: OPEN,
            category1:CLOSE
        });
    }

    handle_close_category2 = ()=>{
        this.setState({
            category2: CLOSE
        });
    }

    event_category1_select = (item)=>{
        this.setState({
            category1_selected:item,
            category2_selected:null
        });
        this.handle_close_category1();
    }

    event_category2_select = (item)=>{
        // this.setState({
        //     category2_selected:item
        // });
        document.location.href = `/${this.props.current_page}?main_category=${this.state.category1_selected}&sub_category=${item}&city=${this.props.city === null ? "SEOUL" : this.props.city}&gu=${this.props.gu === null ? "동작구" : this.props.gu}`;
        // this.handle_close_category2();
    }

    render(){
        let category1_name = this.state.category1_selected == null ? "주 분류" : PROGRAM_CATEGORY[this.state.category1_selected].name;
        let category2_name = this.state.category2_selected == null ? "상세 분류" : PROGRAM_CATEGORY[this.state.category1_selected].sub_category[this.state.category2_selected].name;
        return (
            <div className="category_tool">
                <Button 
                    style={{minWidth:"100px"}} 
                    onClick={()=>{this.state.category1 === CLOSE ? this.handle_open_category1() : this.handle_close_category1() }}
                    highlight={this.state.category1_selected != null ? true : false}
                >
                        {category1_name}
                </Button>
                <Button 
                    style={{minWidth:"100px"}} 
                    onClick={()=>{this.state.category2 === CLOSE ? this.handle_open_category2() : this.handle_close_category2() }}
                    highlight={this.state.category2_selected != null ? true : false}
                >
                    {category2_name}
                </Button>
                
                {
                    this.state.category1 === OPEN
                    ?<Modal style={{maxWidth:"600px", maxHeight:"60vh"}} event_close={this.handle_close_category1}>
                        <MainCategory event={this.event_category1_select} selected={this.state.category1_selected}></MainCategory>
                    </Modal>
                    :"" 
                }
                {
                    this.state.category2 === OPEN && this.state.category1_selected != null
                    ?<Modal style={{maxWidth:"600px", maxHeight:"60vh"}} event_close={this.handle_close_category2}>
                        <SubCategory category={this.state.category1_selected} event={this.event_category2_select} selected={this.state.category2_selected}></SubCategory>
                    </Modal>
                    :"" 
                }
            </div>
        );
    }
    
};

export default SearchTopCategory;