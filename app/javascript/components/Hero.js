import React from 'react'
import bgImage from '../images/candy_hero.jpg'

const Hero = () => {
    return (
        <>
            <div
                className="hero"
                style={{backgroundImage: `url(${bgImage})` }}
            ></div>
            <div className="hero--content">Candies Report</div>
            <a href='#grid' className="btn-go-down">{'>'}</a>
        </>
    )
}

export default Hero