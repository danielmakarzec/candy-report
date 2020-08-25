import React, { useState, useEffect } from 'react'
import axios from 'axios';

import ReviewForm from './ReviewForm'

const Show = props => {
    const [candy, setCandy] = useState({});
    const [reviews, setReviews] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const total = reviews[0] ? reviews.length : 0;

    useEffect(() => {
        const slug = props.match.params.slug;
        const url = `/api/v1/candies/${slug}.json`;

        axios.get(url)
            .then(res => {
                let thisCandy = res.data.data.attributes;
                setCandy(thisCandy);

                let thisReviews = res.data.included;
                setReviews(thisReviews);

                setLoaded(true);
            })
            .catch(res => console.log(res));

    }, [])

    // Modify text in review form
    const handleChange = (e) => {
        e.preventDefault()

        setReview(Object.assign({}, review, { [e.target.name]: e.target.value }))
    }

    // Create a review
    const handleSubmit = (e) => {
        e.preventDefault()

        AxiosHelper()

        const airlineId = parseInt(airline.id)
        // This uses the v2 api (graphql) as of 05/09/2020.
        // For the v1 api endpoint use: axios.post('/api/v1/reviews')
        axios.post('/api/v2/graphql', { query: createReviewQuery({ ...review, airlineId }) })
            .then((resp) => {
                const payload = resp.data.data.createReview
                if (payload.error || payload.message == 'failure') {
                    setError(payload.error)
                } else {
                    const reviews = [...airline.reviews, payload]
                    setAirline({ ...airline, reviews })
                    setReview({ title: '', description: '', score: 0 })
                    setError('')
                }
            })
            .catch(resp => {
                let error
                switch (resp.message) {
                    case "Request failed with status code 401":
                        error = 'Please log in to leave a review.'
                        break
                    default:
                        error = 'Something went wrong.'
                }
                setError(error)
            })
    }

    // Destroy a review
    const handleDestroy = (id, e) => {
        e.preventDefault()
        axios.post('/api/v2/graphql', { query: deleteReviewQuery(id) })
            .then((data) => {
                let reviews = [...airline.reviews]
                const index = reviews.findIndex((data) => data.id == id)
                reviews.splice(index, 1)

                setAirline({ ...airline, reviews })
            })
            .catch(data => console.log('Error', data))
    }

    // set score
    const setRating = (score, e) => {
        e.preventDefault()
        setReview({ ...review, score })
    }

    return (
        <div className="wrapper">
            <div className="column">
                {
                    loaded &&
                    <>
                        <div className="show--header"><h1>{candy.name}</h1></div>
                        <img className='show--img' src={require(`images/candies/${candy.image_url}`)} alt='' />
                        <div className="show--num-of-reviews">total reviews: {total}</div>
                        <div className="show--score">rating: {candy.avg_score}/5</div>
                        <ReviewForm
                            name={name}
                            review={review}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            setRating={setRating}
                            error={error} 
                        />
                        <div className="show--reviews">
                            {
                                reviews.map(review => <div className='show--review'>{review.attributes.description}</div>)
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Show
