import React, {} from 'react';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                {/* <h3>Contact:</h3> */}
                <div className="footer--row">
                    <i>email:</i>
                    <a href="mailto:contact@danielmakarzec.com">contact@danielmakarzec.com</a>
                </div>
                <div className="footer--row">
                    <i>github:</i>
                    <a href="http://github.com/danielmakarzec/candy-report">github.com/danielmakarzec</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;