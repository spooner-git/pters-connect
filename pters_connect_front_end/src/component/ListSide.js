import React, { Component } from 'react';
import ListArticle from '../component/ListArticle';
import CFunc from '../func/CFunc';
import {kakao_ak} from '../const';
import './ListSide.css';
import { demo_list } from '../demo_db';
import Title from './Title';

class ListSide extends Component {
    constructor(){
        super();
        this.state = {
            list:[]
        }
    }

    componentDidMount = ()=>{
        if(this.props.category2_selected === null){
            return false;
        }
        this.setState({
            list:demo_list[this.props.category2_selected]
        })
    }


    // kakao_get_places = (place_name, x, y, radius, user_callback)=>{
    //     let get_data = [];
    
    //     let PLACE = place_name == null ? "지하철" : place_name;
    //     let X = x == null ? 127.033098880841 : x;
    //     let Y = y == null ? 37.5098188126986 : y;
    //     let RADIUS = radius == null ? 1000 : radius;
    //     let DATA_PER_PAGE = 15;
    //     CFunc.ajax(
    //         {
    //             url:"https://dapi.kakao.com/v2/local/search/keyword.json",
    //             data:{"y":Y, "x":X, "radius":RADIUS, "query":PLACE, "page":1, "size":DATA_PER_PAGE},
    //             type:"get",
    //             header:{"Authorization": kakao_ak}
    //         },
    //         {
    //             callback:(data)=>{
    //                 data.documents.forEach((el)=>{
    //                     get_data.push(el);
    //                 });
    //                 let total_count = Number(data.meta.total_count);
    //                 let total_page_number = Math.ceil(total_count/DATA_PER_PAGE);
    
    //                 if(data.meta.is_end){
    //                     console.log("PAGE 1 끝", get_data);
    //                     if(user_callback != undefined){
    //                         user_callback(get_data);
    //                     }
    //                     return get_data;
    //                 }
    
    //                 for(let i=2; i<=total_page_number; i++){
    //                     if(i>10){ //너무 많이 긁어오는 것 방지
    //                       break;
    //                     }
    //                     CFunc.ajax(
    //                         {
    //                             url:"https://dapi.kakao.com/v2/local/search/keyword.json",
    //                             data:{"y":Y, "x":X, "radius":RADIUS, "query":PLACE, "page":i, "size":DATA_PER_PAGE},
    //                             type:"GET",
    //                             header:{"Authorization": kakao_ak}
    //                         },
    //                         {
    //                             callback:(data)=>{
    //                                 data.documents.forEach((el)=>{
    //                                     get_data.push(el);
    //                                     if(get_data.length == total_count){
    //                                         console.log(`PAGE ${i} 끝`,get_data);
    //                                         if(user_callback != undefined){
    //                                             user_callback(get_data);
    //                                         }
    //                                         return get_data;
    //                                     }
    //                                 });
    //                             }
    //                         }
    //                     )
    //                 }
    //             }
    //         }
    //     );
    // }

    render() {
        return (
            <div className="list_side_wrapper" style={this.props.style}>
                {
                    this.state.list.length > 0
                    ?
                    this.state.list.map((el)=>{
                        return <ListArticle category={el.category} name={el.name} address={el.address} id={el.id} review_star={el.review.star} review_number={el.review.reviewer} key={el.id}></ListArticle>
                    })
                    :
                    <Title style={{fontSize:"16px", padding:"20px", textAlign:"center"}}>검색결과가 없습니다.</Title>
                }
            </div>
        );
    }
}


export default ListSide;