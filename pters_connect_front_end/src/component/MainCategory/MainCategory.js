import React, { Component } from 'react';
import { PROGRAM_CATEGORY } from '../../const';
import MainCategoryRow from './MainCategoryRow';

class MainCategory extends Component {

    list = ()=>{
        let codes = [];
        let names = [];
        for(let el in PROGRAM_CATEGORY){
            let name = PROGRAM_CATEGORY[el].name;
            let code = el;
            codes.push(code);
            names.push(name);
        }

        return {name:names, code:codes};
    }

    render(){
        const code_list = this.list().code;
        const name_list = this.list().name;

        return (
            <div style={{margin:"10px 0"}}>
                {name_list.map((el, index)=>{
                    let checked = false;
                    if(code_list[index] === this.props.selected){
                        checked = true;
                    }
                    return <MainCategoryRow name={el} code={code_list[index]} key={code_list[index]} checked={checked} onClick={this.props.event}></MainCategoryRow>
                })}
            </div>
        );
    }
    
};

export default MainCategory;