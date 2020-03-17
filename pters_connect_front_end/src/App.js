import React from 'react';
import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RootTop from './component/RootTop';
import PageConnectMap from './page/ConnectMap';
import PageConnectList from './page/ConnectList';
import PAGEConnectSetting from './page/ConnectSetting';
import PAGEConnectHome from './page/ConnectHome';
import PAGEConnectMenu from './page/ConnectMenu';
import PAGEConnectTeacher from './page/ConnectTeacher';
import RootContent from './component/RootContent';

class App extends Component{
  constructor(){
    super();
    this.state = {
      menu_open:0
    }
  }

  handle_open_menu = ()=>{
    this.setState({
      menu_open : 1
    })
  }

  handle_close_menu = ()=>{
    this.setState({
      menu_open : 0
    })
  }

  render(){
    return (
      <div id="root">
        <Router>
          <RootTop open={this.state.menu_open} event_open={this.handle_open_menu} event_close={this.handle_close_menu}></RootTop>
          <RootContent>
              <Route exact path="/map" render={() => <PageConnectMap classes={this.state.menu_open === 1 ? "hide_page" : ""} />}></Route>
              <Route exact path="/setting" render={() => <PAGEConnectSetting classes={this.state.menu_open === 1 ? "hide_page" : ""} />}></Route>
              <Route exact path="/" render={() => <PAGEConnectHome classes={this.state.menu_open === 1 ? "hide_page" : ""} />}></Route>
              {/* <Route exact path="/menu" render={() => <PAGEConnectMenu classes={this.state.menu_open === 0 ? "hide_page" : ""} event_menu_close={this.handle_close_menu} />}></Route> */}
              <PAGEConnectMenu classes={this.state.menu_open === 0 ? "hide_page" : ""} event_menu_close={this.handle_close_menu} />
              <Route path="/list" render={() => <PageConnectList classes={this.state.menu_open === 1 ? "hide_page" : ""} />}></Route>
              <Route path="/teacher" render={() => <PAGEConnectTeacher classes={this.state.menu_open === 1 ? "hide_page" : ""} />}></Route>
          </RootContent>
        </Router>
      </div>
      
    );
  }
  
}

export default App;
