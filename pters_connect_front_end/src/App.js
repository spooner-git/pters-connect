import React from 'react';
import { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RootTop from './layout/RootTop/RootTop';
import RootContent from './layout/RootContent/RootContent';
import PageConnectMap from './page/ConnectMap';
import PageConnectList from './page/ConnectList';
import PAGEConnectSetting from './page/ConnectSetting';
import PAGEConnectHome from './page/ConnectHome';
import PAGEConnectMenu from './page/ConnectMenu';
import PAGEConnectPlace from './page/ConnectPlace';
import PAGEConnectLogin from './page/ConnectLogin';
import PAGEConnectAboutUs from './page/ConnectAboutUs';
import PAGEConnectCenterManage from './page/ConnectCenterManage';
import EDITCenterBasicInfo from './editpage/EditCenterBasicInfo';
import PAGEConnectSignUp from './page/ConnectSignUp';
import AuthRoute from './page/AuthRoute';
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';
import PAGEConnectCenterCreate from './page/ConnectCenterCreate';

@inject("storeOfLogin")
@observer
class App extends Component{
  @observable user;
  @observable menu_open = 0;
  
  @action
  handle_open_menu = ()=>{
    this.menu_open = 1;
  }

  @action
  handle_close_menu = ()=>{
    this.menu_open = 0;
  }

  @action
  _setToken = (AToken) => {
    this.user = AToken;
  }

  componentDidMount(){
    const { storeOfLogin } = this.props;
    this._setToken(storeOfLogin.getCurrentUser());
  }

  render(){

    return (
      <div id="root">
        <Router>
          <RootTop open={this.menu_open} event_open={this.handle_open_menu} event_close={this.handle_close_menu}></RootTop>
          <RootContent>
              {/* <Route exact path="/menu" render={() => <PAGEConnectMenu classes={this.state.menu_open === 0 ? "hide_page" : ""} event_menu_close={this.handle_close_menu} />}></Route> */}
              <PAGEConnectMenu classes={this.menu_open === 0 ? "hide_page" : ""} event_menu_close={this.handle_close_menu} />
              <Route path="/map" render={(location) => <PageConnectMap classes={this.menu_open === 1 ? "hide_page" : ""} location={location} />}></Route>
              <Route exact path="/setting" render={() => <PAGEConnectSetting classes={this.menu_open === 1 ? "hide_page" : ""} />}></Route>
              <Route exact path="/" render={() => <PAGEConnectHome classes={this.menu_open === 1 ? "hide_page" : ""} />}></Route>
              <Route path="/list" render={(location) => <PageConnectList classes={this.menu_open === 1 ? "hide_page" : ""} location={location} />}></Route>
              <Route path="/place" render={() => <PAGEConnectPlace classes={this.menu_open === 1 ? "hide_page" : ""} />}></Route>
              <Route path="/login" render={() => <PAGEConnectLogin classes={this.menu_open === 1 ? "hide_page" : ""} />}></Route>
              <Route path="/signup" render={() => <PAGEConnectSignUp classes={this.menu_open === 1 ? "hide_page" : ""} />}></Route>
              <Route path="/aboutus" render={() => <PAGEConnectAboutUs classes={this.menu_open === 1 ? "hide_page" : ""} />}></Route>
              
              <AuthRoute authenticated={this.user} exact path="/center_manage" render={ (props) => <PAGEConnectCenterManage classes={this.menu_open === 1 ? "hide_page" : ""} {...props} /> }></AuthRoute>
              <AuthRoute authenticated={this.user} exact path="/center_create" render={ (props) => <PAGEConnectCenterCreate classes={this.menu_open === 1 ? "hide_page" : ""} {...props} /> }></AuthRoute>

              <Route path="/center_basic_info_edit" render={(location) =><EDITCenterBasicInfo class={this.menu_open === 1 ? "hide_page" : ""} location={location}></EDITCenterBasicInfo>}></Route>
              
          </RootContent>
        </Router>
      </div>
      
    );
  }
  // <AuthRoute render={() => <Route exact path="/center_manage" render={() => <PAGEConnectCenterManage classes={this.state.menu_open === 1 ? "hide_page" : ""} />}></Route> }></AuthRoute>

}

export default App;
