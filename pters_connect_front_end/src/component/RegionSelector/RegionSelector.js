import React, { Component } from 'react';
import { REGION_KR } from '../../const';


class RegionSelector extends Component {
    state = {
        city:"SEOUL",
        gu:REGION_KR["SEOUL"][19]
    }
    
    componentDidMount = ()=>{
        
    }

    update_city = (new_city) => {
        this.setState({
            city:new_city
        })
    }

    update_gu = (new_gu) => {
        this.setState({
            gu: new_gu
        });
        
        this.props.setData(REGION_KR[this.state.city].name, new_gu);
    }

    render(){
        return (
            <div style={{height:"100%"}}>
                <div style={{display:"flex", height:"100%"}}>
                    <div style={{width:"33.333%", height:"100%", overflowY:"auto", border:"1px solid #f5f2f3"}}>
                        <ul style={{listStyle:"none", padding:"10px 16px"}}>
                        {
                            Object.keys(REGION_KR).map((city) => {
                                let highlight = city === this.state.city ? true : false;
                                return <li style={{color:highlight === true ? "#fe4e65" : "" , cursor:"pointer", "padding":"10px 0px", fontSize:"14px", fontWeight:"500"}} key={city} onClick={()=>{this.update_city(city)}}>{REGION_KR[city].name}</li>
                            })
                        }
                        </ul>
                    </div>
                    <div style={{width:"66.666%", height:"100%", overflowY:"auto"}}>
                        <ul style={{listStyle:"none", padding:"10px 16px"}}>
                        {
                            REGION_KR[this.state.city].gu.map((gu, index) => {
                                return <li style={{display:"inline-block", width:"80px", "padding":"10px 10px", fontSize:"14px", cursor:"pointer"}} key={index} onClick={()=>{this.update_gu(gu)}}>{gu}</li>
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
};

export default RegionSelector;