import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import ReviewForm from './ReviewForm'
import Review from './Review'

const Show = props => {
    const [candy, setCandy] = useState({});
    const [reviews, setReviews] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const total = reviews[0] ? reviews.length : 0;
    const bgImage = loaded && require(`images/candies/${candy.attributes.image_url}`);
    console.log(candy)

    useEffect(() => {
        const slug = props.match.params.slug;
        const url = `/api/v1/candies/${slug}.json`;

        axios.get(url)
            .then(res => {
                let thisCandy = res.data.data;
                setCandy(thisCandy);

                let thisReviews = res.data.included;
                setReviews(thisReviews);

                setLoaded(true);
            })
            .catch(res => console.log(res));

    }, [])

    const setRating = (score, e) => {
        e.preventDefault()
        // setReview({ ...review, score })
    }

    return (
        <div className='show--body'>
            <div style={{height: '5vh', background: 'aquamarine'}}></div> {/* temporary */}
            <div className="show--hero">
                <div className="container flex-row">
                    {
                        loaded &&
                        <>
                            <div className="show--img-container" style={{ backgroundImage: `url(${bgImage})` }}></div>
                            <div className="show--info flex-column">
                                <div className="show--name"><h1>{candy.attributes.name}</h1></div>
                                <div className="show--stars">{"★★★★★"}</div>
                                <div className="show--info-rating flex-row">
                                    <div className="show--score">rating: <strong>{candy.attributes.avg_score}/5</strong></div>
                                    <div className="show--num-of-reviews">reviews: <strong>{total}</strong></div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="container flex-row">
            {
                loaded &&
                <>
                    <div className="show--about">
                        <div className="show--about-header">About</div>
                        <div className="show--about-content">...some content.. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam tenetur quidem deleniti in maxime libero porro provident. Officia explicabo amet asperiores ad voluptate quibusdam, nostrum provident iste eveniet deserunt nulla.</div>
                        <Link className="btn btn-back" to='/'>{'◄'} back</Link>
                    </div>
                    <div className='show--reviews'>
                        <ReviewForm
                            name={candy.attributes.name}
                            reviews={reviews}
                            candy_id={candy.id}
                            setReviews={setReviews}
                            // setRating={setRating}
                            // error={error} 
                        />
                        <div className="show--reviews-list">
                            {
                                reviews.map(rev => {
                                    // console.log(rev)
                                    return (
                                        <Review
                                            key={rev.id}
                                            id={rev.id}
                                            title={rev.attributes.title}
                                            description={rev.attributes.description}
                                            reviews={reviews}
                                            setReviews={setReviews}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            }
            </div>
        </div>
    )
}

export default Show
