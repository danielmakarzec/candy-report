import React, { useState, Fragment } from "react";
import axios from 'axios';

const ReviewForm = props => {
    const { name, candy_id, reviews, setReviews } = props
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // const ratingOptions = [5,4,3,2,1].map((score, index) => {
    //     return (
    //       <Fragment key={index}>
    //         <input type="radio" value={score} checked={props.review.score == score} onChange={()=>console.log('onChange')} name="rating" id={`rating-${score}`}/>
    //         <label onClick={props.setRating.bind(this, score)}></label>
    //       </Fragment>
    //     )
    //   })

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('/api/v1/reviews', { candy_id, title, description })
            .then(resp => {
                console.log(resp)
                let newReviewId = resp.data.data.id
                // let newReview = {  }
                setReviews([
                    {
                        id: newReviewId,
                        type: 'review',
                        attributes: { candy_id, title, description }
                    },
                    ...reviews
                ])
            })
            .catch((error) => {
                console.log(error);
            });

        // reset form
        setTitle('')
        setDescription('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='form--header'>Write Your Review</div>
            <div className='form--field'>
                <input autoFocus value={title} onChange={e => setTitle(e.target.value)} type="text" name="title" placeholder="Review Title" />
            </div>
            <div className='form--field'>
                <textarea value={description} onChange={e => setDescription(e.target.value)} type="text" rows="10" name="description" placeholder="Review Description" />
            </div>
            <div className='form--field'>
                <div className='form--rating'>
                    <div className='form--rating-box'>
                        {/* {ratingOptions} */}
                    </div>
                </div>
            </div>
            <button className='btn btn-submit' type="Submit">Create Review</button>
            {
                // error &&
                // <div>{error}</div>
            }
        </form>
    )
}

export default ReviewForm;