import React, { useState} from 'react'
import CandyCard from './CandyCard'
import Loader from './loader'

const Hero = ({loaded}) => {
    const [windowWidth, set] = useState(window.innerWidth);

    return (
        <>
            <div className="hero"></div>
            {
                loaded ? <a href='#grid' className="btn-scroll-down">{'︾'}</a> : <Loader />
            }
            <div className="hero--row">
                <div className="hero--col hero--content">
                    <div className="hero--content-main">Candy Report</div>
                    <div className="hero--content-secondary">discover rate comment</div>
                </div>
                <div className="hero--col hero--card">
                    <div className="hero--candy-example">
                    {
                        loaded && windowWidth > 1024 ?
                            <CandyCard candy={
                                {id: 0,
                                attributes: {
                                    slug: '#grid',
                                    name: 'Candy!',
                                    avg_score: 5
                                }}
                            }
                            />
                        : ''
                    }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero
