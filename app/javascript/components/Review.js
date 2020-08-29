import React from 'react';
import axios from 'axios';
import Rating from './Rating'

const Review = props => {
    const { id, title, description, setReviews, reviews, setCandy, updateAvgScore } = props
    const score = reviews.find(r => r.id === id).attributes.score
    
    const handleDestroy = () => {
        axios.delete(`/api/v1/reviews/${id}`)
            .then(resp => {
                let updatedReviews = reviews.filter(review => review.id !== id)
                setReviews(updatedReviews);       //  update reviews by deleting this one.
                setCandy(updateAvgScore(-score))  //  update average score for this candy.
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className='review'>
            <div className='flex-row'>
                <span className="review--name">{title}</span>
                <Rating score={score} />
                <button className="btn btn-delete float-right" onClick={handleDestroy}>X</button>
            </div>
            <div className="review--description flex-row">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Review;
