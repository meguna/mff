import React, { Component, Fragment } from 'react';
import RecipeForm from '../RecipeForm';

const ING_FIELD_BLANK = {
  name: '',
  amount: '',
  notes: '',
  groupId: 1,
};

const ING_GROUP_BLANK = {
  name: '',
  notes: '',
  groupId: 1,
};


class NewRecipeForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      size: '',
      ingredients: [{ ...ING_FIELD_BLANK }],
      groups: [{ ...ING_GROUP_BLANK }],
      notes: '',
      invalid: { name: false, ingCount: false },
      submitError: false,
      submitStatus: '',
      images: [],
    };
  }

  render() {
    const recipeInfo = this.state;

    return (
      <Fragment>
        <RecipeForm
          initialFormState={recipeInfo}
          initialGroup={ING_GROUP_BLANK}
          title="Add A New Recipe"
        />
      </Fragment>
    );
  }
}

export default NewRecipeForm;
