import React, { Component, Fragment } from 'react';
import List from '../component/List';
import ListTop from '../component/ListTop';

class PageConnectList extends Component {
    constructor(props){
        super(props)
        let href = document.location.href.split("/?");
        this.category1_selected = null;
        this.category2_selected = null;
        if(href.length === 3 ){
            this.category1_selected = href[href.length - 2];
            this.category2_selected = href[href.length - 1];
        }
    }

    state = {
        list_view : 1
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
            <Fragment>
                <div className={this.props.classes}>
                    <ListTop category1_selected={this.category1_selected} category2_selected={this.category2_selected}></ListTop>
                    <List category1_selected={this.category1_selected} category2_selected={this.category2_selected}></List>
                </div>
            </Fragment>
        );
    }
    
};

export default PageConnectList;