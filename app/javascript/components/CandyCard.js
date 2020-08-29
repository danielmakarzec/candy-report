import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const CandyCard = ({data}) => {
    return (
        <div className="row">
            <div className='card grid-item'>
                <h2 className='card--name'>{data.name}</h2>
                {
                    // data.image_url
                    // ? <img className='card--img' src={require(`/images/candies/${data.image_url}`)} alt=''/>
                    // : 'No picture'
                }
                <div className="card--score">
                    <Rating score={data.avg_score} />
                </div>
                <Link className="card--link" to={`candies/${data.slug}`}>more</Link>
            </div>
        </div>
    )
}

export default CandyCard