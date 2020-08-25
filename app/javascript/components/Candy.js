import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const Candy = ({data}) => {
    return (
        <div className="row">
            <div className='card grid-item'>
                <h2 className='card--name'>{data.name}</h2>
                <img className='card--img' src={require(`images/candies/${data.image_url}`)} alt=''/>
                <div className="card--score">
                    RATING: {data.avg_score}
                </div>
                    <Link className="card--link" to={`candies/${data.slug}`}>more</Link>
            </div>
        </div>
    )
}

export default Candy