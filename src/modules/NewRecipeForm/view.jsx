import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { Plus, AlertCircle } from 'react-feather';
import Field from './components/Field';
import IngGroup from './components/IngGroup';
import IngFieldsHeader from './components/IngFieldsHeader';
import ImageUpload from './components/ImageUpload';
import FormSubHeader from './components/FormSubHeader';
import SubmitStatus from './components/SubmitStatus';

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

const INITIAL_FORM_STATE = {
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

class NewRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);

    this.state = INITIAL_FORM_STATE;
  }

  onFieldChange = (param, val) => {
    this.setState({ [param]: val });
    this.validate();
  };

  onAddGroup = () => {
    this.setState(prevProps => ({
      groups: [
        ...prevProps.groups,
        { ...ING_GROUP_BLANK, groupId: prevProps.groups.length + 1 },
      ],
    }));
  };

  onIngGroupUpdate = (ingredients, groupId, groupInfo) => {
    const newIng = ingredients.filter(ing => (
      !(ing.name === '' && ing.amount === '' && ing.notes === '')
    ));
    this.setState(prevProps => ({
      ingredients: Object.assign(
        [], prevProps.ingredients,
        { [groupId - 1]: newIng },
      ),
      groups: Object.assign(
        [], prevProps.groups,
        { [groupId - 1]: { groupId, ...groupInfo } },
      ),
    }));
  };

  updateImageState = (images) => {
    this.setState({ images });
  }

  validate = () => {
    const { name } = this.state;
    if (name === '') {
      this.setState(prevProps => ({
        invalid: { ...prevProps.invalid, name: true },
      }));
      return true;
    }
    this.setState(prevProps => ({
      invalid: { ...prevProps.invalid, name: false },
    }));
    return false;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      ingredients,
      groups,
      name,
      notes,
      size,
      images,
    } = this.state;

    const { fetchRecipes, sortMethod } = this.props;

    // directly using the 'invalid' state parameter after calling
    // validate() can be buggy because the function is asynchronous.
    // Thus we directly take the return value of the function instead
    if (this.validate()) {
      this.setState({ submitError: true });
      return;
    }

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
      .then((res) => {
        this.setState({ ...INITIAL_FORM_STATE, submitStatus: 'success' });
        window.scrollTo(0, 0);
        console.log(res);
        fetchRecipes(sortMethod);
      })
      .catch((err) => {
        this.setState({ submitStatus: 'fail' });
        window.scrollTo(0, 0);
        console.error(err);
      });
  };

  render() {
    const {
      name,
      size,
      notes,
      groups,
      invalid,
      submitError,
      submitStatus,
    } = this.state;

    const groupFields = [];
    for (let i = 1; i <= groups.length; i++) {
      groupFields.push(
        <div key={i}>
          <IngGroup groupId={i} onIngGroupUpdate={this.onIngGroupUpdate} />
        </div>,
      );
    }

    return (
      <Fragment>
        <SubmitStatus status={submitStatus} />
        <h1 className="title">Add a New Recipe</h1>
        <FormSubHeader subtitle="info" />
        <form id="nr-form" onSubmit={this.onSubmit} autoComplete="off">
          <Field
            onChange={this.onFieldChange}
            value={name}
            name="name"
            id="nr-name-input"
            invalid={invalid.name}
            validString="a name is required!"
            onBlur={this.validate}
            required
          />
          <Field
            onChange={this.onFieldChange}
            value={size}
            name="size"
            id="nr-size-input"
            info={`
              Use this field creatively - for anything from serving count to 
              baking tray dimensions`}
          />
          <Field
            onChange={this.onFieldChange}
            value={notes}
            name="notes"
            id="nr-recipenotes-input"
            textarea
          />
          <fieldset className="ingredients-fieldset">
            <legend>
              <FormSubHeader subtitle="ingredients" />
            </legend>
            <IngFieldsHeader />
            {groupFields}
            <button
              className="add-ing-group-button"
              type="button"
              onClick={this.onAddGroup}
            >
              <Plus />
              add another ingredient group
            </button>
          </fieldset>

          <FormSubHeader subtitle="Images" />
          <ImageUpload onDone={this.updateImageState} />

          <FormSubHeader />
          <input type="submit" value="Add this recipe!" />
          {submitError && (
            <p className="error-msg">
              <AlertCircle />
              Please complete the required fields.
            </p>
          )}
        </form>
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
