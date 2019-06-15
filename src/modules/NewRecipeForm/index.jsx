import React, { Component } from 'react';
import './styles.css';
import { connect } from 'react-redux';
import Field from './components/Field';
import IngGroup from './components/IngGroup';
import Plus from '../../assets/icons/plus.svg';


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
    };
  }

  onFieldChange = (param, val) => {
    this.setState({ [param]: val });
  };

  onAddGroup = () => {
    this.setState(prevProps => ({
      groups: [...prevProps.groups, { ...ING_GROUP_BLANK, groupId: prevProps.groups.length + 1 }],
    }));
  };

  onIngGroupUpdate = (ingredients, groupId) => {
    const newIng = ingredients.filter(ing => (
      !(ing.name === '' && ing.amount === '' && ing.notes === '')
    ));
    this.setState(prevProps => ({
      ingredients: Object.assign([], prevProps.ingredients, { [groupId - 1]: newIng }),
    }));

    console.log(this.state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    // const picked = (({ name, size, notes }) => ({ name, size, notes }))(this.state);
    // fetch('http://localhost:3005/api/createnewrecipe', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(picked),
    // })
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err));
  };

  render() {
    console.log(this.state);
    const {
      name,
      size,
      notes,
      groups,
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
      <div>
        <h1>Add a New Recipe!</h1>
        <form id="nr-form" onSubmit={this.onSubmit} autoComplete="off">
          <Field
            onChange={this.onFieldChange}
            value={name}
            name="name"
            id="nr-name-input"
            labelClassName="required-field"
          />
          <Field
            onChange={this.onFieldChange}
            value={size}
            name="size"
            id="nr-size-input"
          />
          <fieldset className="ingredients-fieldset">
            <legend>Ingredients</legend>
            <div className="new-ing-fields form-group">
              <label className="new-ing-field-left" htmlFor="nr-ing-name-input">
                Ingredient Name
              </label>
              <label className="new-ing-field-ctr" htmlFor="nr-ing-amount-input">
                Amount
              </label>
              <label className="new-ing-field-right" htmlFor="nr-ing-notes-input">
                Notes
              </label>
            </div>
            {groupFields}
            <button
              className="add-ing-group-button new-ing-fields"
              type="button"
              onClick={this.onAddGroup}
            >
              <img className="add-icon" src={Plus} alt="close-button" />
              add another ingredient group
            </button>
          </fieldset>
          <Field
            onChange={this.onFieldChange}
            value={notes}
            name="notes"
            id="nr-recipenotes-input"
            textarea
          />
          <input type="submit" value="Add this recipe!"/>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(NewRecipeForm);
