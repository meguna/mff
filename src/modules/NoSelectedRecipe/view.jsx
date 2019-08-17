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
