import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';


class AuthRoute extends Component{
    render(){
        const { authenticated, render, path } = this.props;
        var user = authenticated == null || authenticated == undefined ? false : true;

        return(
            <Route
              path={path}
              render = {
                (props)=>
                    user 
                    ? (render(props))
                    : (<Redirect to={{pathname:"/login", state:{from:this.props.location}}} />)//(<Redirect to={{pathname:"/login", state:{from:this.props.location}}} />)
                
              }  
            />
        )
    }
}


export default AuthRoute;