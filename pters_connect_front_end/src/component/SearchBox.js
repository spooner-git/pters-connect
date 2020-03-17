import React, { Component } from 'react';
// import './ConnectMap.css';

class SearchBox extends Component{
  state = {
    search:""
  }
  
  render(){
    let opacity = this.props.opacity;
    const wrapper_style = {
      position:"absolute",
      top:"0",
      left:"0",
      zIndex:1500,
      width:"100vw",
      height:"80px",
      textAlign:"center",
      padding:"10px 0",
      opacity: opacity,
      transition:"opacity ease-in-out 0.3s"
    }
    const input_style = {
      WebkitAppearance:"none",
      width:"90%",
      maxWidth:"600px",
      height:"45px",
      border:"1px solid #e8e8e8",
      boxShadow:"0px 0px 16px 0 #cccccc",
      borderRadius:"10px",
      margin:"5px 0",
      padding:"0 15px",
      fontSize:"16px"
    };
    const button_style = {
      WebkitAppearance:"none",
      width:"150px",
      height:"45px",
      border:"1px solid #e8e8e8",
      boxShadow:"0px 0px 16px 0 #cccccc",
      borderRadius:"10px",
      margin:"5px 10px",
      backgroundColor:"#fffffff2",
      fontSize:"14px"
    }
    return (
      <div style={wrapper_style}>
        <input 
              placeholder={"안녕"} 
              style={input_style}
              onChange={
                (e)=>{
                  this.setState({
                    search: e.target.value
                  })
                }
              }
        
        ></input>
        <button 
          style={button_style}
          onClick={
            ()=>{this.props.search(this.state.search)}
          }
        >여기서 재탐색</button>
      </div>
    );
  }
}

export default SearchBox;
