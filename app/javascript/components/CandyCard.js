import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react';
import Rating from './Rating'

const CandyCard = ({candy}) => {
    const {id, attributes } = candy
    const {name, slug, avg_score} = attributes

    return (
        <div className="row">
            <div className='card grid-item'>
                <h2 className='card--name'>{name}</h2>  
                <Image className='card--img' cloudName="djdfxltaw" publicId={`candies/${id}.png`} />
                <div className="card--score">
                    <Rating score={avg_score} />
                </div>
                <Link className="card--link" to={`candies/${slug}`}>more</Link>
            </div>
        </div>
    )
}

export default CandyCard