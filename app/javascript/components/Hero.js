import React from 'react'
// import bgImage from '../images/candy_hero2.jpg'
import CandyCard from './CandyCard'
import Loader from './loader'

const Hero = ({loaded}) => {
    console.log(loaded);
    return (
        <>
            <div
                className="hero"
                // style={{backgroundImage: `url(${bgImage})` }}
            ></div>
            <div className="hero--content">Candy Report</div>
            {
                loaded ? <a href='#grid' className="btn-go-down">{'︾'}</a> : <Loader />
            }
            <div className="hero--candy-example">
                <CandyCard candy={
                    {id: 0,
                    attributes: {
                        slug: '#grid',
                        name: 'Candy!',
                        avg_score: 4.3
                    }}
                }
                />
            </div>
        </>
    )
}

export default Hero