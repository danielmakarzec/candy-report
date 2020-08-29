import React from 'react'

const Rating = ({score}) => {
    const stars = score / 5 * 100;

    return (
        <div className="rating--stars" >
            <div className="rating--back">☆☆☆☆☆</div>
            <div className="rating--front" style={{widht: stars + '%'}}>☆</div>
        </div>
    )
}

export default Rating


