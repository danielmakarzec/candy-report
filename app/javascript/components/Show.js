import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Cloudinary } from 'cloudinary-core';
const cloudinaryCore = new Cloudinary({cloud_name: 'djdfxltaw'});
import axios from 'axios';

import ReviewForm from './ReviewForm';
import Review from './Review';
import Rating from './Rating';
import Navbar from './Navbar';
import Footer from './Footer';

const Show = props => {
    const [candy, setCandy] = useState({});
    const [reviews, setReviews] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const totalReviews = reviews.length || 0;
    const bgImage = cloudinaryCore.url(`candies/${candy.id}`);

    let history = useHistory();
    console.log(history)
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

    function updateAvgScore(score) {
        let operator = score > 0 ? 1 : -1;
        let currentAvg = candy.attributes.avg_score;
        let updatedAvgScore = ( currentAvg * reviews.length + score ) / ( reviews.length + operator );
        let newAttributes = {...candy.attributes, avg_score: updatedAvgScore }
        return {...candy, attributes: newAttributes}
    }

    return (
        <div className='show--body'>
            <Navbar />
            <div className="show--hero">
                <div className="container flex-row">
                    {
                        loaded &&
                        <>
                            <div className="show--img-container" style={{ backgroundImage: `url(${bgImage})` }}></div>
                            <div className="show--info flex-column">
                                <div className="show--name"><h1>{candy.attributes.name}</h1></div>
                                <div className="show--stars"><Rating score={candy.attributes.avg_score} /></div>
                                <div className="show--info-rating flex-row">
                                    <div className="show--score">rating: <strong>{candy.attributes.avg_score}/5</strong></div>
                                    <div className="show--num-of-reviews">reviews: <strong>{totalReviews}</strong></div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className="container flex-row show--middle-section">
            {
                loaded &&
                <>
                    <div className="show--about">
                        <div className="show--about-header">About</div>
                        <div className="show--about-content">{candy.attributes.about}</div>
                        <Link className="btn btn-back" to='/#root'>{'◄'} back</Link>
                    </div>
                    <div className='show--reviews'>
                        <ReviewForm
                            reviews={reviews}
                            candy_id={candy.id}
                            setReviews={setReviews}
                            candy={candy}
                            setCandy={setCandy}
                            updateAvgScore={updateAvgScore}
                        />
                        <div className="show--reviews-list">
                            {
                                reviews.map(rev => {
                                    return (
                                        <Review
                                            key={rev.id}
                                            id={rev.id}
                                            title={rev.attributes.title}
                                            description={rev.attributes.description}
                                            reviews={reviews}
                                            setReviews={setReviews}
                                            setCandy={setCandy}
                                            updateAvgScore={updateAvgScore}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            }
            </div>
            <Footer />
        </div>
    )
}

export default Show
