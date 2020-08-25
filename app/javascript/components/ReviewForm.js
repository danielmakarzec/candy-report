import React, { Fragment } from "react";

const ReviewForm = props => {

    const ratingOptions = [5,4,3,2,1].map((score, index) => {
        return (
          <Fragment key={index}>
            <input type="radio" value={score} checked={props.review.score == score} onChange={()=>console.log('onChange')} name="rating" id={`rating-${score}`}/>
            <label onClick={props.setRating.bind(this, score)}></label>
          </Fragment>
        )
      })

    return (
        <div className='form--wrapper'>
        <form onSubmit={props.handleSubmit}>
          <h2>Have An Experience with {props.name}? Add Your Review!</h2>
          <div className='form--field'>
            <input onChange={props.handleChange} type="text" name="title" placeholder="Review Title" value={props.review.title}/>
          </div>
          <div className='form--field'>
            <input onChange={props.handleChange} type="text" name="description" placeholder="Review Description" value={props.review.description}/>
          </div>
          <div className='form--field'>
            <div className='form--rating'>
              <h3>Rate This Airline</h3>
              <div className='form--rating-box'>
                {ratingOptions}
              </div>
            </div>
          </div>
          <SubmitBtn type="Submit">Create Review</SubmitBtn>
          { 
            props.error && 
            <Error>{props.error}</Error>
          }
        </form>
      </div>
    )
}

export default ReviewForm;