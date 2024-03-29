import React from 'react';
import './SearchResult.css';
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import StarIcon from "@material-ui/icons/Star";
import { Button } from '@material-ui/core';

function SearchResult({
    img,
    location,
    title,
    description,
    star,
    price,
    total,
}) {
    return (
        <div className='searchResult'>
            <img src={img} alt="" />
            {/* <FavoriteBorderIcon className="searchResult__heart" /> */}

            <div className='searchResult__info'>
                <div className="searchResult__infoTop">
                    <p>{location}</p>
                    <h3>{title}</h3>
                    {/* <p>____</p> */}
                    <p>{description}</p>
                </div>

                <div className="searchResult__infoBottom" style={{ display: "flex" }}>
                    {/* <div className="searchResult__stars">
                        <StarIcon className="searchResult__star" />
                        <p>
                            <strong>{star}</strong>
                        </p>
                    </div> */}
                    <div className='searchResults__price'>
                        <h2>{price}</h2>
                        <h2>{total}</h2>
                    </div>
                    <Button className="button" style={{ marginLeft: "800px" }}>BOOK NOW</Button>
                </div>
                
            </div>
            
        </div>
        
    )
}

export default SearchResult
