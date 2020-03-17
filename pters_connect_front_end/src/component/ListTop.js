import React from 'react';
import './ListTop.css';
import SearchTopCategory from './SearchTopCategory';

const ListTop = ({category1_selected, category2_selected}) => {
    return (
        <div className="root_content_top">
            <div className="search_tool">
                <div className="search_input_wrap">
                    <input className="search_input" placeholder="지역 검색"></input>
                </div>
            </div>
            <SearchTopCategory category1={category1_selected} category2={category2_selected}></SearchTopCategory>
        </div>
    );
};

export default ListTop;