import React from 'react';
import axios from 'axios';

const Review = props => {
    const { id, title, description, setReviews, reviews } = props

    const handleDestroy = () => {

        axios.delete(`/api/v1/reviews/${id}`)
            .then(resp => {
                console.log('response', resp)
                let updatedReviews = reviews.filter(review => review.id !== id)
                setReviews(updatedReviews);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className='review'>
            <span className="review--name">{title}</span>
            <button className="btn btn-delete float-right" onClick={handleDestroy}>X</button>
            <div className="review--description flex-row">
                <p>{description}</p>
            </div>
        </div>
    )
}

export default Review;
