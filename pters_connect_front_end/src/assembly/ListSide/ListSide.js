import React, { Component } from 'react';
import ListArticle from '../ListArticle/ListArticle';
import CFunc from '../../func/CFunc';
import {kakao_ak} from '../../const';
import './ListSide.css';
import Title from '../../component/Title/Title';
import { action, observable } from 'mobx';
import { observer, inject } from 'mobx-react';

@inject('storeOfLogin')
@observer
class ListSide extends Component {
    @observable list = [];

    componentDidMount = ()=>{
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
            <div className="list_side_wrapper" style={this.props.style}>
                {
                    this.list.length > 0
                    ?
                    this.list.map((el)=>{
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
                    :
                    <Title style={{fontSize:"16px", padding:"20px", textAlign:"center"}}>검색결과가 없습니다.</Title>
                }
            </div>
        );
    }
}


export default ListSide;