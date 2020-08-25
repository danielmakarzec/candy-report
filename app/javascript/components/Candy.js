import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const Candy = ({data}) => {
    return (
        <div className='card'>
            <h2 className='card--name'>{data.name}</h2>
            <img src='https://i.pinimg.com/originals/f8/67/ed/f867ed50da075666748b655445b48022.jpg' alt=""/>
            <div className="card--score">
                RATING: {data.avg_score}
            </div>
            <div className="card--link">
                <Link to={`candies/${data.slug}`}>go to candy view</Link>
            </div>
        </div>
    )
}

export default Candy