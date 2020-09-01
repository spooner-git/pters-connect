import React, { Component } from 'react';
import CFunc from '../../func/CFunc';
import './List.css';
import { demo_list } from '../../demo_db';
import ListArticle from '../ListArticle/ListArticle';
import { kakao_ak } from '../../const';
import { observer, inject } from 'mobx-react';
import { observable, action } from 'mobx';

@inject('storeOfLogin')
@observer
class List extends Component {
    @observable list = [];

    componentDidMount = () => {
        if(this.props.category2_selected === null){
            return false;
        }
        const { city, gu, category1_selected, category2_selected } = this.props;
        this._getCenters(city, gu, category1_selected, category2_selected);
    }

    @action
    setState_Centers = (data) => {
        this.list = data;
    }

    _getCenters = (city, gu, category1, category2) => {
        const { storeOfLogin } = this.props;
        CFunc.ajaxGet(
            "https://api.pters.co.kr/facility/",
            {
                // Authorization:`Bearer ${storeOfLogin.getCurrentUser()}`
            },
            {
                "search":""
            }
        ).then((data)=>{
            console.log(`성공: `);
            console.log(data.data.results);
            this.setState_Centers(data.data.results);
        })
    }

    DOMWarningNoList = () => {
        return <div style={{padding:"20px"}}>
                    검색된 결과가 없습니다.
                </div>
    }

    render() {
        return (
            <div className="list_wrapper" style={this.props.style}>
                {
                    this.list.length == 0
                    ? this.DOMWarningNoList()
                    :this.list.map((el)=>{
                        return <ListArticle 
                                    category={el.main_type_cd} 
                                    name={el.name} 
                                    address={el.address} 
                                    id={el.facility_id} 
                                    review_star={5} 
                                    review_number={10} 
                                    key={el.facility_id}
                                    >
                                </ListArticle>
                    })
                }
            </div>
        );
    }
}


export default List;