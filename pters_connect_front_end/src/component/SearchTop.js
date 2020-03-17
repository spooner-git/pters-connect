import React from 'react';
import './SearchTop.css';
import Button from '../component/Buttons/Button'
import SearchTopCategory from './SearchTopCategory';

const SearchTop = ({event_list_on, event_list_off, list_view, category1_selected, category2_selected}) => {
    return (
        <div className="root_content_top">
            <div className="search_tool">
                <div className="search_input_wrap">
                    <input className="search_input" placeholder="지역 검색"></input>
                </div>
                <div className="seach_type_button_wrap">
                    {
                        list_view == 0
                        ?<Button onClick={event_list_on} style={{color:"#fe4e65", height:"40px", lineHeight:"40px", width:"70px"}}>리스트</Button>
                        :<Button onClick={event_list_off} style={{color:"#fe4e65", height:"40px", lineHeight:"40px", width:"70px"}}>지도</Button>
                    }
                </div>
            </div>
            <SearchTopCategory category1={category1_selected} category2={category2_selected}></SearchTopCategory>
        </div>
    );
};

export default SearchTop;