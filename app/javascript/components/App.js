import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Show from './Show';
import Candies from './Candies';

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={Candies} />
            <Route exact path='/candies/:slug' component={Show} />
        </Switch>
    )
}

export default App