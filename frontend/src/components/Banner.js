import React, { useState } from 'react'
import '../styles/Banner.css';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
// import Search from './Search';
import { useHistory } from "react-router-dom";

function Banner() {
    const history = useHistory();
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className='banner'>
            {/* <div className='banner__search'>
                {showSearch && <Search />}

                <Button onClick={() => setShowSearch(!showSearch)} className='banner__searchButton' variant='outlined'>
                    {showSearch ? "Hide" : "Search Dates"}
                </Button>
            </div> */}
            <div className='banner__info'>
                {/* <Typography
                align='left'
                paragraph='true'
                variant='h1'
                style={{
                    color: "white"
                }}
                >
                    Welcome to CodeRash Hotels!!
                </Typography> */}
                <h1>Welcome to CodeRash Hotels!!</h1> 
                <h5>
                    Stay with us while you explore hidden gems of California.
                </h5>
                <Button onClick={() => history.push('/home')} variant='outlined'>Explore</Button>
            </div>
        </div>
    )
}

export default Banner
