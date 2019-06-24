import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Plus, AlertCircle } from 'react-feather';
import Field from './components/Field';
import IngGroup from './components/IngGroup';
import IngFieldsHeader from './components/IngFieldsHeader';
import ImageUpload from './components/ImageUpload';
import FormSubHeader from './components/FormSubHeader';
import StatusInfo from './components/StatusInfo';
import { ING_FIELD_BLANK, ING_GROUP_BLANK } from '../common/initial';
import './styles.css';

class RecipeForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);

    this.state = {
      ...this.state,
      notes: props.notes,
      name: props.name,
      size: props.size,
      groups: props.initialGroups,
      ingredients: props.initialIngredients,
      images: [],
      submitError: props.submitError,
      submitStatus: props.submitStatus,
      invalid: { name: false, ingCount: false },
    };
  }

  onFieldChange = (param, val) => {
    this.setState({ [param]: val });
    this.validate();
  };

  onAddGroup = () => {
    this.setState(prevState => ({
      groups: [
        ...prevState.groups,
        { ...ING_GROUP_BLANK, groupId: prevState.groups.length + 1 },
      ],
      ingredients: [
        ...prevState.ingredients,
        [{ ...ING_FIELD_BLANK, groupId: prevState.groups.length + 1 }],
      ],
    }));
  };

  onIngGroupUpdate = (ingredients, groupId, groupInfo) => {
    const newIng = ingredients.filter(ing => (
      !(ing.name === '' && ing.amount === '' && ing.notes === '')
    ));
    this.setState(prevState => ({
      ingredients: Object.assign(
        [], prevState.ingredients,
        { [groupId - 1]: newIng },
      ),
      groups: Object.assign(
        [], prevState.groups,
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

    const { submitForm } = this.props;

    // directly using the 'invalid' state parameter after calling
    // validate() can be buggy because the function is asynchronous.
    // Thus we directly take the return value of the function instead
    if (this.validate()) {
      this.setState({ submitError: true });
      return;
    }

    submitForm(ingredients, groups, name, notes, size, images);
  };

  render() {
    const {
      name,
      size,
      notes,
      groups,
      ingredients,
      invalid,
    } = this.state;

    const {
      title,
      submitError,
      submitStatus,
    } = this.props;

    const groupFields = [];
    for (let i = 0; i < groups.length; i++) {
      groupFields.push(
        <div key={i}>
          <IngGroup
            groupId={i + 1}
            onIngGroupUpdate={this.onIngGroupUpdate}
            ingredients={ingredients[i]}
            group={groups[i]}
          />
        </div>,
      );
    }

    return (
      <Fragment>
        <StatusInfo
          status={submitStatus}
          failMessage={`Oops! There was an error adding your recipe. 
            Please try again!`}
          successMessage="The recipe was added successfully!"
        />
        <h1 className="title">{title}</h1>
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

RecipeForm.propTypes = {
  submitForm: PropTypes.func,
  initialIngredients: PropTypes.arrayOf(PropTypes.array),
  initialGroups: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  notes: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  submitError: PropTypes.bool,
  submitStatus: PropTypes.string,
};

RecipeForm.defaultProps = {
  submitForm: () => {},
  initialIngredients: [[{ ...ING_FIELD_BLANK }]],
  initialGroups: [{ ...ING_GROUP_BLANK }],
  notes: '',
  name: '',
  size: '',
  submitError: false,
  submitStatus: '',
};

export default RecipeForm;
