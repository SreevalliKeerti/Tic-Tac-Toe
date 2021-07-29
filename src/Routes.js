import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import App from './App';
import TwoPlayer from './Components/TwoPlayer';
import MiniMax from './Components/MiniMax';


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/twoplayer" exact component={TwoPlayer} />
                <Route path="/computer" exact component={MiniMax} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;