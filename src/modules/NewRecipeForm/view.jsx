import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import RecipeForm from '../RecipeForm';
import { ING_FIELD_BLANK, ING_GROUP_BLANK } from '../common/initial';

class NewRecipeForm extends Component {
  componentDidMount() {
    const { setSelectedRecipe } = this.props;
    /* This function is required for the form request to go through properly.
     * Invariant: maintain selected recipe ID always. When none applicable,
     * use -1.
     */
    setSelectedRecipe(-1);
  }

  render() {
    const { t } = this.props;
    const recipeInfo = {
      name: '',
      size: '',
      ingredients: [[{ ...ING_FIELD_BLANK }]],
      groups: [{ ...ING_GROUP_BLANK }],
      notes: '',
      invalid: { name: false, ingCount: false },
      images: [],
    };

    const messages = {
      buttonAction: t('common:newrecipe.submit'),
      failMessage: t('common:newrecipe.fail'),
      successMessage: t('common:newrecipe.success'),
    };

    return (
      <Fragment>
        <RecipeForm
          initialFormState={recipeInfo}
          initialIngredients={recipeInfo.ingredients}
          title={t('common:newrecipe.title')}
          initialGroups={recipeInfo.groups}
          notes=""
          name=""
          size=""
          fetchUrl="/createnewrecipe"
          messages={messages}
        />
      </Fragment>
    );
  }
}

NewRecipeForm.propTypes = {
  setSelectedRecipe: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(NewRecipeForm);
