import React, { Component } from 'react';
import { PROGRAM_CATEGORY } from '../../const';
import SubCategoryRow from './SubCategoryRow';

class SubCategory extends Component {

    list = ()=>{
        let main_category = this.props.category;
        let codes = [];
        let names = [];
        for(let el in PROGRAM_CATEGORY[main_category].sub_category){
            let name = PROGRAM_CATEGORY[main_category].sub_category[el].name;
            let code = el;
            codes.push(code);
            names.push(name);
        }

        return {name:names, code:codes};
    }


    render(){
        const name_list = this.list().name;
        const code_list = this.list().code;

        return (
            <div style={{margin:"10px 0"}}>
                {name_list.map((el, index)=>{
                    let checked = false;
                    if(code_list[index] === this.props.selected){
                        checked = true;
                    }
                    return <SubCategoryRow name={el} code={code_list[index]} key={code_list[index]} checked={checked} onClick={this.props.event}></SubCategoryRow>
                })}
            </div>
        );
    }
    
};

export default SubCategory;