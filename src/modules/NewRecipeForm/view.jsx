import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import RecipeForm from '../RecipeForm';
import { ING_FIELD_BLANK, ING_GROUP_BLANK } from '../common/initial';

const recipeInfo = {
  name: '',
  size: '',
  ingredients: [[{ ...ING_FIELD_BLANK }]],
  groups: [{ ...ING_GROUP_BLANK }],
  notes: '',
  invalid: { name: false, ingCount: false },
  images: [],
};

class NewRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      submitError: false,
      submitStatus: '',
    };
  }

  submitForm = (ingredients, groups, name, notes, size, images) => {
    // `ingredients` is a nested array, with individual elements
    // grouped by ingredient groups. get all nested elements in `ingCollect`.
    // then remove groups & ingredients that are empty
    const ingCollect = [].concat(...ingredients).filter((ing) => {
      return !(ing.name === '' && ing.amount === '' && ing.notes === '');
    });
    const groupCollect = (ingCollect.length === 0) ? [] : groups;

    fetch('http://localhost:3005/api/createnewrecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        notes,
        size,
        ingredients: ingCollect,
        groups: groupCollect,
        images,
      }),
    })
      .then((res, err) => {
        if (res.ok) {
          this.setState({ ...recipeInfo, submitStatus: 'success' });
          window.scrollTo(0, 0);
          const { fetchRecipes, sortMethod } = this.props;
          fetchRecipes(sortMethod);
        } else {
          throw new Error(err);
        }
      })
      .catch((err) => {
        this.setState({ submitStatus: 'fail' });
        window.scrollTo(0, 0);
        console.error(err);
      });
  }

  render() {
    const { submitError, submitStatus } = this.state;
    return (
      <Fragment>
        <RecipeForm
          initialFormState={recipeInfo}
          initialIngredients={recipeInfo.ingredients}
          title="Add A New Recipe"
          initialGroups={recipeInfo.groups}
          notes=""
          name=""
          size=""
          submitForm={this.submitForm}
          submitStatus={submitStatus}
          submitError={submitError}
        />
      </Fragment>
    );
  }
}

NewRecipeForm.propTypes = {
  fetchRecipes: PropTypes.func,
  sortMethod: PropTypes.string,
};

NewRecipeForm.defaultProps = {
  fetchRecipes: () => {},
  sortMethod: 'update_date',
};

export default NewRecipeForm;
