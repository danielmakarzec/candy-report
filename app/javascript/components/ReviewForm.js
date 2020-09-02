import React, { useState, Fragment } from "react";
import axios from 'axios';

const ReviewForm = props => {
    const { reviews, setReviews, candy, setCandy, updateAvgScore } = props
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [score, setScore] = useState('');
    
    const setRating = newScore => {
        setScore(newScore)
    }

    const handleSubmit = e => {
        e.preventDefault()

        const crsfToken = document.querySelector('[name=csrf-token]').content
        axios.defaults.headers.common['X-CSRF-TOKEN'] = crsfToken

        axios.post('/api/v1/reviews', { candy_id: candy.id, title, description, score })
            .then(resp => {
                let newReviewId = resp.data.data.id
                setReviews([
                    {
                        id: newReviewId,
                        type: 'review',
                        attributes: { candy_id: candy.id, title, description, score }
                    },
                    ...reviews
                ])
                setCandy(updateAvgScore(score));
            })
            .catch((error) => {
                console.log(error);
            });

        // reset form
        setTitle('')
        setDescription('')
        setScore(0)
    }

    const ratingOptions = [5, 4, 3, 2, 1].map((newScore, index) => {
        return (
            <Fragment key={index}>
                <input type="radio" value={score} checked={score == newScore} onChange={() => console.log('score:', newScore)} name="rating" id={`rating-${newScore}`} />
                <label onClick={setRating.bind(this, newScore)}></label>
            </Fragment>
        )
    })

    return (
        <form onSubmit={handleSubmit}>
            <div className='form--header'>Write Your Review</div>
            <div className='form--field'>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    placeholder="Review Title"
                />
            </div>
            <div className='form--field'>
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                    rows="10"
                    name="description"
                    placeholder="Review Description"
                />
            </div>
            <div className='form--field'>
                <div className='form--rating'>
                    <div className='form--rating-box'>
                        {ratingOptions}
                    </div>
                </div>
            </div>
            <button className='btn btn-submit' type="Submit">Create Review</button>
        </form>
    )
}

export default ReviewForm;
