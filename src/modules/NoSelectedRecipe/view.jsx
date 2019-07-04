import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AddRecipeButton from '../RecipeInfo/components/AddRecipeButton';
import './styles.css';

class NoSelectedRecipe extends Component {
  componentDidMount() {
    const { setSelectedRecipe } = this.props;
    setSelectedRecipe(-1);
  }

  render() {
    return (
      <Fragment>
        <AddRecipeButton />
        <h1 className="nsr-title">
          In The Mood
          <br />
          For Food
        </h1>
        <h2 className="nsr-subtitle">
          The recipe management app for food enthusiasts.
        </h2>
        <p className="nsr-description">
          Use the button above to add a new recipe, or
          select one to play with from the sidebar.
        </p>
      </Fragment>
    );
  }
}

NoSelectedRecipe.propTypes = {
  setSelectedRecipe: PropTypes.func.isRequired,
};

export default NoSelectedRecipe;
