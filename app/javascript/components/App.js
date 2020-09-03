import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ScrollToTop from './hooks/ScrollToTop';
import Show from './Show';
import Candies from './Candies';

const App = () => {
    return (
        <ScrollToTop>
            <Switch>
                <Route exact path='/' component={Candies} />
                <Route exact path='/candies/:slug' component={Show} />
            </Switch>
        </ScrollToTop>
    )
}

export default App