import React from 'react';
import './ListTop.css';
import SearchTopCategory from './SearchTopCategory';
import SearchTopRegion from './SearchTopRegion';
import { CLOSE } from '../const';

const ListTop = ({category1_selected, category2_selected, city, gu}) => {
    return (
        <div className="root_content_top">
            <SearchTopRegion current_page="list" toggle_button={CLOSE} category1={category1_selected} category2={category2_selected} city={city} gu={gu}></SearchTopRegion>
            <SearchTopCategory current_page="list" category1={category1_selected} category2={category2_selected} city={city} gu={gu}></SearchTopCategory>
        </div>
    );
};

export default ListTop;