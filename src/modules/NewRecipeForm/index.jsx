import React, { Component, Fragment } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import { Plus, AlertCircle } from 'react-feather';
import Field from './components/Field';
import IngGroup from './components/IngGroup';
import IngFieldsHeader from './components/IngFieldsHeader';
import ImageUpload from './components/ImageUpload';
import FormSubHeader from './components/FormSubHeader';

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
    this.onSubmit = this.onSubmit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);

    this.state = {
      name: '',
      size: '',
      ingredients: [{ ...ING_FIELD_BLANK }],
      groups: [{ ...ING_GROUP_BLANK }],
      notes: '',
      invalid: { name: false, ingCount: false },
      submitError: false,
      images: [],
    };
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

  validate = () => {
    const { name } = this.state;
    if (name === '') {
      this.setState(prevProps => ({
        invalid: { ...prevProps.invalid, name: true },
      }));
    } else {
      this.setState(prevProps => ({
        invalid: { ...prevProps.invalid, name: false },
      }));
    }
  };

  onSubmit = (e) => {
    const {
      invalid,
      ingredients,
      groups,
      name,
      notes,
      size,
    } = this.state;
    e.preventDefault();

    this.validate();
    if (invalid.name) {
      this.setState({ submitError: true });
      return;
    }

    // `ingredients` is a nested array, with individual elements
    // grouped by ingredient groups. get all nested elements in `ingCollect`
    const ingCollect = [].concat(...ingredients);

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
        groups,
      }),
    })
      .then((res) => {
        this.setState({ submitError: false });
        console.log(res);
      })
      .catch(err => console.error(err));
  };

  updateImageState = (images) => {
    this.setState({ images });
  }

  render() {
    const {
      name,
      size,
      notes,
      groups,
      invalid,
      submitError,
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

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NewRecipeForm);
