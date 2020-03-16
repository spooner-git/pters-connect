import React, { Component, Fragment } from 'react';
import Map from '../component/Map';
import SearchTop from '../component/SearchTop';
import ListSide from '../component/ListSide';

class PageConnectMap extends Component {
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
          <div style={{display:"flex", flexDirection:"column", height:"100%"}} className={this.props.classes}>
            <SearchTop event_list_on={this.handle_list_on} event_list_off={this.handle_list_off} list_view={this.state.list_view}></SearchTop>
            <Map></Map>
            {
              this.state.list_view === 1 
              ? <ListSide></ListSide>
              : ""
            }
          </div>
      );
  }
 
}

export default PageConnectMap;
