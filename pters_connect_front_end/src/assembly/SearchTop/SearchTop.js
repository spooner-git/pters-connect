import React from 'react';
import './SearchTop.css';
import Button from '../../component/Buttons/Button'
import SearchTopCategory from '../SearchTopCategory/SearchTopCategory';
import SearchTopRegion from '../SearchTopRegion/SearchTopRegion';

const SearchTop = ({event_list_on, event_list_off, list_view, category1_selected, category2_selected, city, gu}) => {
    return (
        <div className="root_content_top">
            <SearchTopRegion current_page="map" event_list_on={event_list_on} event_list_off={event_list_off} list_view={list_view} category1={category1_selected} category2={category2_selected} city={city} gu={gu}></SearchTopRegion>
            <SearchTopCategory current_page="map" category1={category1_selected} category2={category2_selected} city={city} gu={gu}></SearchTopCategory>
        </div>
    );
};

export default SearchTop;