import React, { Component, Fragment } from 'react';
import List from '../component/List';
import ListTop from '../component/ListTop';
import queryString from 'query-string';

class PageConnectList extends Component {
    constructor(props){
        super(props)
        let query = queryString.parse(this.props.location.location.search);
        this.category1_selected = query.main_category !== undefined ? query.main_category : null;
        this.category2_selected = query.sub_category !== undefined ? query.sub_category : null;
        this.city = query.city !== undefined ? query.city : null;
        this.gu = query.gu !== undefined ? query.gu : null;
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
                    <ListTop category1_selected={this.category1_selected} category2_selected={this.category2_selected} city={this.city} gu={this.gu}></ListTop>
                    <List category1_selected={this.category1_selected} category2_selected={this.category2_selected} city={this.city} gu={this.gu}></List>
                </div>
            </Fragment>
        );
    }
    
};

export default PageConnectList;