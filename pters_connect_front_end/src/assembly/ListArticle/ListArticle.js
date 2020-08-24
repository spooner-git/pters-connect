import React from 'react';
import './ListArticle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const ListArticle = ({category, name, address, id, review_star, review_number}) => {
    let href_to = `/place/${id}`;
    return (
        <div className="list_article_wrapper">
            <Link to={href_to} target="_blank">
                <div className="list_article_wrapper_child">
                    <div className="photo_box">
                    </div>
                    <div className="info_box">
                        <div>
                            <div style={{fontSize:"12px", fontWeight:"bold", color:"#999999"}}>{category}</div>
                            <div style={{fontSize:"16px", fontWeight:"500", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{name}</div>
                            <div style={{fontSize:"14px"}}>{address}</div>
                            <div style={{fontSize:"14px", marginTop:"5px"}}><span style={{verticalAlign:"middle"}}>{review_star}</span> <span style={{fontSize:"12px", verticalAlign:"middle", color:"orange"}}><FontAwesomeIcon icon={faStar} /></span> <span style={{color:"#999999", verticalAlign:"middle"}}>{review_number}</span></div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ListArticle;