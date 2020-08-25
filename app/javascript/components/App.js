import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Candy from './Candy';
import Candies from './Candies';

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={Candies} />
            <Route path='/candies/:slug' component={Candy} />
        </Switch>
    )
}

export default App