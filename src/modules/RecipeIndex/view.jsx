import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeInfo from '../RecipeInfo';
import RecipeList from '../RecipeList';
import NewRecipeForm from '../NewRecipeForm';
import EditRecipeForm from '../EditRecipeForm';
import DeleteRecipe from '../DeleteRecipe';
import NoSelectedRecipe from '../NoSelectedRecipe';
import StatusInfo from '../common/StatusInfo';
import RecipeInfoErrorBoundary from '../errorBoundaries/RecipeInfoErrorBoundary';
import RecipeListErrorBoundary from '../errorBoundaries/RecipeListErrorBoundary';
import './styles.css';

class RecipeIndex extends Component {
  componentDidUpdate(prevProps) {
    const {
      fetchRecipes,
      sortMethod,
      loadingAuth,
    } = this.props;

    if (prevProps.loadingAuth !== loadingAuth) {
      if (!loadingAuth) {
        fetchRecipes(sortMethod);
      }
    }
  }

  renderMobile() {
    const { notification } = this.props;
    return (
      <div className="recipe-everything-wrapper-mobile">
        <StatusInfo status={notification.status} message={notification.message} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <RecipeListErrorBoundary>
                <RecipeList {...props} />
              </RecipeListErrorBoundary>
            )}
          />
          <Route exact path="/addRecipe" component={NewRecipeForm} />
          <Route exact path="/editRecipe/:id" component={EditRecipeForm} />
          <Route
            path="/recipe/:id"
            render={props => (
              <RecipeInfoErrorBoundary>
                <RecipeInfo {...props} />
              </RecipeInfoErrorBoundary>
            )}
          />
          <Route path="/deleteRecipe/:id" component={DeleteRecipe} />
        </Switch>
      </div>
    );
  }

  render() {
    const { notification, screen } = this.props;

    if (screen === 'mobile') {
      return this.renderMobile();
    }

    return (
      <div className="recipe-everything-wrapper">
        <div id="recipe-list">
          <RecipeListErrorBoundary>
            <RecipeList />
          </RecipeListErrorBoundary>
        </div>
        <div id="recipe-info">
          <StatusInfo status={notification.status} message={notification.message} />
          <Switch>
            <Route exact path="/addRecipe" component={NewRecipeForm} />
            <Route exact path="/editRecipe/:id" component={EditRecipeForm} />
            <Route
              path="/recipe/:id"
              render={props => (
                <RecipeInfoErrorBoundary>
                  <RecipeInfo {...props} />
                </RecipeInfoErrorBoundary>
              )}
            />
            <Route path="/deleteRecipe/:id" component={DeleteRecipe} />
            <Route exact path="/" component={NoSelectedRecipe} />
          </Switch>
        </div>
      </div>
    );
  }
}

RecipeIndex.propTypes = {
  fetchRecipes: PropTypes.func,
  sortMethod: PropTypes.string,
  screen: PropTypes.string.isRequired,
  notification: PropTypes.shape({
    status: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
  loadingAuth: PropTypes.bool.isRequired,
};

RecipeIndex.defaultProps = {
  fetchRecipes: null,
  sortMethod: 'update_date',
};

export default RecipeIndex;
