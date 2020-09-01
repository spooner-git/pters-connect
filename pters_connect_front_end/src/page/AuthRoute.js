import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject } from 'mobx-react';
import { observable, action } from 'mobx';


@inject('storeOfLogin')
class AuthRoute extends Component{
    @observable user;

    constructor(props){
        super(props);
        this.setState_user();
    }

    @action
    setState_user = () => {
        const { storeOfLogin } = this.props;
        this.user = storeOfLogin.getCurrentUser();
    }

    componentDidMount(){
        this.setState_user();
    }

    render(){
        const { authenticated, render, path } = this.props;
        // var user = authenticated == null || authenticated == undefined ? false : true;
        var user = this.user == null || this.user == undefined ? false : true;

        return(
            <Route
              path={path}
              render = {
                (props)=>
                    user 
                    ? (render(props))
                    : (<Redirect to={{pathname:"/login", state:{from:this.props.location}}} />)
                
              }  
            />
        )
    }
}


export default AuthRoute;