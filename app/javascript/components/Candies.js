import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Header from './Header'
import Hero from './Hero'
import CandyCard from './CandyCard'
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

    // fetch candies
    useEffect(()=>{
        axios.get('/api/v1/candies.json')
        .then(resp => {
            setCandies(resp.data.data)
            setLoaded(true)
        })
        .catch( resp => console.log(resp))
    }, [candies.length])

    return (
        <>
            {/* <Header /> */}
            <Hero />
            <div id='grid' className="grid" style={{columnCount: `${numOfColumns}`}}>
            {   
                !loaded ? <Loader /> : candies.map( candy => <CandyCard key={candy.attributes.slug} candy={candy} /> )
            }
            </div>
        </>
    )
}

export default Candies