import React, { Component, Fragment } from 'react';
import Map from '../component/Map';
import SearchTop from '../component/SearchTop';
import ListSide from '../component/ListSide';
import List from '../component/List';
import queryString from 'query-string';
import CFunc from '../func/CFunc';
import { kakao_ak } from '../const';

var kakao = window.kakao;
class PageConnectMap extends Component {
  constructor(props){
      super(props)
      let query = queryString.parse(this.props.location.location.search);
      this.category1_selected = query.main_category !== undefined ? query.main_category : null;
      this.category2_selected = query.sub_category !== undefined ? query.sub_category : null;
      this.city = query.city !== undefined ? query.city : null;
      this.gu = query.gu !== undefined ? query.gu : null;
  }

  state = {
    list_view : 0,
    locX:null,
    locY:null
  }

  componentDidMount = ()=>{
    let geocoder = new kakao.maps.services.Geocoder();
    let region = this.gu === null ? "동작구" : `${this.city} ${this.gu}`;
    console.log(region)
    geocoder.addressSearch(region, (result, status)=>{
      console.log(result[0]);
      // Kakao_func.get_places("퍼스널 트레이닝", result[0].x, result[0].y, 5000, (data)=>{
      //   console.log( JSON.stringify({"data":data}))
      // })
      this.update_region(result[0].x, result[0].y)
    });
  }

  handle_list_on = ()=>{
    this.setState({
      list_view : 1
    })
  }

  handle_list_off = ()=>{
    this.setState({
      list_view : 0
    })
  }

  update_region = (x, y)=>{
    this.setState({
      locX:x,
      locY:y
    });
    console.log("??", x, y)
  }

  render(){
     return (
          <div style={{display:"flex", flexDirection:"column", height:"calc(100vh - 60px)"}} className={this.props.classes}>
            <SearchTop event_list_on={this.handle_list_on} event_list_off={this.handle_list_off} list_view={this.state.list_view} category1_selected={this.category1_selected} category2_selected={this.category2_selected} city={this.city} gu={this.gu}></SearchTop>
            <Map locX={this.state.locX} locY={this.state.locY}></Map>
            {
              this.state.list_view === 1 
              ? 
              <ListSide category1_selected={this.category1_selected} category2_selected={this.category2_selected} city={this.city} gu={this.gu}></ListSide>
              // <List category1_selected={this.category1_selected} category2_selected={this.category2_selected}></List>
              : ""
            }
          </div>
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
