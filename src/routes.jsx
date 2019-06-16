import React, { PureComponent } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import RecipeIndex from './modules/RecipeIndex';

export default class AppRouter extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={RecipeIndex} />

        </Switch>
      </BrowserRouter>
    );
  }
}
