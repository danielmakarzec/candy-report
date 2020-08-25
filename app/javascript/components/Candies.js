import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Header from './Header'
import Candy from './Candy'

const Candies = () => {
    const [candies, setCandies] = useState([])

    useEffect(()=>{
        // get candies from actionrecord
        axios.get('/api/v1/candies.json')
        .then(resp => {
            setCandies(resp.data.data)
        })
        .catch( resp => console.log(resp))

        // update

    }, [candies.length])

    return (
        <>
            <Header />
            {
                candies.map( candy => {
                    return <Candy key={candy.attributes.slug} data={candy.attributes} />
                })
            }
        </>
    )
}

export default Candies