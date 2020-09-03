import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './Navbar';
import Hero from './Hero';
import CandyCard from './CandyCard';
import Loader from './loader';
import Footer from './Footer';

const Candies = () => {
    const [candies, setCandies] = useState([])
    const [loaded, setLoaded] = useState(false);

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
            <Navbar />
            <Hero loaded={loaded} />
            <div id='grid' className="grid"  >
            {   
                !loaded ? <Loader /> : candies.map( candy => <CandyCard key={candy.attributes.slug} candy={candy} /> )
            }
            </div>
            <Footer />
        </>
    )
}

export default Candies