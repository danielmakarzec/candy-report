import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Header from './Header'
import Candy from './Candy'
import Loader from './loader'

const Candies = () => {
    const [candies, setCandies] = useState([])
    const [gridSize, setGridSize] = useState(window.innerWidth * 0.6 )
    const [numOfColumns, setCol] = useState(gridSize / 350);
    const [loaded, setLoaded] = useState(false);
    
    // controll the number of columns in the grid
    useEffect(() => {
        function handleResize() {
            let newGridSize = document.getElementById('grid') ? document.getElementById('grid').offsetWidth : 1;
            let newNumOfCol = parseInt(newGridSize / 350);
            setCol(newNumOfCol)
        }
    
        window.addEventListener("resize", handleResize);
    
        handleResize();
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(()=>{
        // get candies from actionrecord
        axios.get('/api/v1/candies.json')
        .then(resp => {
            setCandies(resp.data.data)
            setLoaded(true)
        })
        .catch( resp => console.log(resp))

        // update

    }, [candies.length])

    return (
        <>
            <Header />
            <div id='grid' className="grid" style={{columnCount: `${numOfColumns}`}}>
            {   
                !loaded ? <Loader /> : candies.map( candy => <Candy key={candy.attributes.slug} data={candy.attributes} />)
            }
            </div>
        </>
    )
}

export default Candies