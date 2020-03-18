import React, { Component, Fragment } from 'react';
import Map from '../component/Map';
import SearchTop from '../component/SearchTop';
import ListSide from '../component/ListSide';
import List from '../component/List';
import queryString from 'query-string';

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
    list_view : 0
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

  render(){
     return (
          <div style={{display:"flex", flexDirection:"column", height:"calc(100vh - 60px)"}} className={this.props.classes}>
            <SearchTop event_list_on={this.handle_list_on} event_list_off={this.handle_list_off} list_view={this.state.list_view} category1_selected={this.category1_selected} category2_selected={this.category2_selected} city={this.city} gu={this.gu}></SearchTop>
            <Map></Map>
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

export default PageConnectMap;
