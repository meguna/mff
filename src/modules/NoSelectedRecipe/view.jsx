import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import AddRecipeButton from '../RecipeInfo/components/AddRecipeButton';
import './styles.css';

class NoSelectedRecipe extends Component {
  componentDidMount() {
    const { setSelectedRecipe } = this.props;
    setSelectedRecipe(-1);
  }

  render() {
    const { t } = this.props;
    return (
      <Fragment>
        <AddRecipeButton />
        <p className="nsr-description">
          {t('common:message.noselected')}
        </p>
      </Fragment>
    );
  }
}

NoSelectedRecipe.propTypes = {
  setSelectedRecipe: PropTypes.func.isRequired,
};

export default withTranslation()(NoSelectedRecipe);
