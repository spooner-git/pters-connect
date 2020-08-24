import React, { Component, Fragment } from 'react';
import Map from '../component/Map/Map';
import SearchTop from '../assembly/SearchTop/SearchTop';
import ListSide from '../assembly/ListSide/ListSide';
import queryString from 'query-string';
import CFunc from '../func/CFunc';
import { kakao_ak } from '../const';

import { observable, action } from 'mobx';
import { observer } from 'mobx-react';


var kakao = window.kakao;
@observer
class PageConnectMap extends Component {
  constructor(props){
      super(props)
      let query = queryString.parse(this.props.location.location.search);
      this.category1_selected = query.main_category !== undefined ? query.main_category : null;
      this.category2_selected = query.sub_category !== undefined ? query.sub_category : null;
      this.city = query.city !== undefined ? query.city : null;
      this.gu = query.gu !== undefined ? query.gu : null;
  }

  @observable list_view = 0;
  @observable locX = null;
  @observable locY = null;

  componentDidMount = ()=>{
    let geocoder = new kakao.maps.services.Geocoder();
    let region = this.gu === null ? "동작구" : `${this.city} ${this.gu}`;
    geocoder.addressSearch(region, (result, status)=>{
      this.update_region(result[0].x, result[0].y)
    });
  }

  @action
  handle_list_on = ()=>{
    this.list_view = 1;
  }

  @action
  handle_list_off = ()=>{
    this.list_view = 0;
  }

  @action
  update_region = (x, y)=>{
    this.locX = x,
    this.locY = y
  }

  render(){
    return (
        <Fragment>
            <div className={this.props.classes} style={{display:"flex", flexDirection:"column", height:"calc(100vh - 60px)"}}>
            <SearchTop event_list_on={this.handle_list_on} event_list_off={this.handle_list_off} list_view={this.list_view} category1_selected={this.category1_selected} category2_selected={this.category2_selected} city={this.city} gu={this.gu}></SearchTop>
                <Map locX={this.locX} locY={this.locY}></Map>
                {
                  this.list_view === 1 
                  ? 
                  <ListSide category1_selected={this.category1_selected} category2_selected={this.category2_selected} city={this.city} gu={this.gu}></ListSide>
                  : ""
                }
            </div>
        </Fragment>
    );
}


}

class Kakao_func {
  static get_places = (place_name, x, y, radius, user_callback)=>{
      let get_data = [];
      let PLACE = place_name == null ? "지하철" : place_name;
      let X = x == null ? 127.033098880841 : x;
      let Y = y == null ? 37.5098188126986 : y;
      let RADIUS = radius == null ? 1000 : radius;
      let DATA_PER_PAGE = 15;
      CFunc.ajax(
          {
              url:"https://dapi.kakao.com/v2/local/search/keyword.json",
              data:{"y":Y, "x":X, "radius":RADIUS, "query":PLACE, "page":1, "size":DATA_PER_PAGE},
              type:"get",
              header:{"Authorization": kakao_ak}
          },
          {
              callback:(data)=>{
                  data.documents.forEach((el)=>{
                      get_data.push(el);
                  });
                  let total_count = Number(data.meta.total_count);
                  let total_page_number = Math.ceil(total_count/DATA_PER_PAGE);
  
                  if(data.meta.is_end){
                      console.log("PAGE 1 끝", get_data);
                      if(user_callback !== undefined){
                          user_callback(get_data);
                      }
                      return get_data;
                  }
  
                  for(let i=2; i<=total_page_number; i++){
                      if(i>50){ //너무 많이 긁어오는 것 방지
                        console.log("too many")
                        break;
                      }
                      CFunc.ajax(
                          {
                              url:"https://dapi.kakao.com/v2/local/search/keyword.json",
                              data:{"y":Y, "x":X, "radius":RADIUS, "query":PLACE, "page":i, "size":DATA_PER_PAGE},
                              type:"GET",
                              header:{"Authorization": kakao_ak}
                          },
                          {
                              callback:(data)=>{
                                  data.documents.forEach((el)=>{
                                      get_data.push(el);
                                      if(get_data.length === total_count){
                                          console.log(`PAGE ${i} 끝`,get_data);
                                          if(user_callback !== undefined){
                                              user_callback(get_data);
                                          }
                                          return get_data;
                                      }
                                  });
                              }
                          }
                      )
                  }
              }
          }
      );
  }
}

export default PageConnectMap;
