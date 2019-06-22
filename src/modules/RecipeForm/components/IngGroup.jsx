import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IngField from './IngField';
import Field from './Field';

const ING_FIELD_BLANK = {
  name: '',
  amount: '',
  notes: '',
  groupId: 1,
};

class IngGroup extends Component {
  constructor(props) {
    super(props);
    this.onIngFieldChange = this.onIngFieldChange.bind(this);
    this.addIngField = this.addIngField.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);

    const ings = props.ingredients;
    console.log(props.groupId, props.ingredients);
    for (let i = 0; i < ings.length; i++) {
      ings[i].groupId = props.groupId;
    }

    this.state = {
      ingredients: ings,
      groupInfo: { name: props.group.name, notes: props.group.notes },
    };
  }

  onIngFieldChange = (param, id, val) => {
    console.log('IngGroup onIngFieldChange, param:', param, 'id:', id, 'val:', val);
    const { ingredients, groupInfo } = this.state;
    const { onIngGroupUpdate, groupId } = this.props;
    console.log(groupId + JSON.stringify(ingredients));
    ingredients[id][param] = val;
    console.log(groupId + JSON.stringify(ingredients));
    this.setState({ ingredients });
    const ing = JSON.parse(JSON.stringify(ingredients));
    if (onIngGroupUpdate) {
      onIngGroupUpdate(ing, groupId, groupInfo);
    }
  };

  onFieldChange = (param, val) => {
    console.log('IngGroup onFieldChange, param:', param, 'val:', val);
    this.setState(prevState => ({
      groupInfo: { ...prevState.groupInfo, [param]: val },
    }), () => {
      const { onIngGroupUpdate, groupId } = this.props;
      const { ingredients, groupInfo } = this.state;
      if (onIngGroupUpdate) {
        onIngGroupUpdate(ingredients, groupId, groupInfo);
      }
    });
  };

/**
 * functions to add and remove ingredient fields automatically.
 * when a user focuses on the last field of the list, a new set appears
 * when a user blurs off the last field of the list, and there are two
 * rows of empty fields, the last row is removed.
 */

  addIngField = (id) => {
    console.log('IngGroup addIngField, id:', id);
    const { ingredients } = this.state;
    const { groupId } = this.props;
    if (id === ingredients.length - 1) {
      this.setState(prevState => ({
        ingredients: [...prevState.ingredients, { name: '', amount: '', notes: '', groupId }],
      }));
    }
  };

  removeEmptyIngField = (id) => {
    console.log('IngGroup removeEmptyIngField, id:', id);
    const { ingredients } = this.state;
    if (
      ingredients.length > 1
      && ingredients[id].name === ''
      && ingredients[id].amount === ''
      && ingredients[id].notes === ''
    ) {
      this.setState((prevState) => {
        // prevState is only shallow copied by default,
        // so must be done manually to avoid getting empty `ingredients`
        const newIng = [...prevState.ingredients];
        newIng.pop();
        return {
          ingredients: newIng,
        };
      });
    }
  };

  removeSelectedIngField = (id) => {
    console.log('IngGroup removeSelectedIngField, id:', id);
    const { onIngGroupUpdate, groupId } = this.props;
    this.setState((prevState) => {
      const newIng = [...prevState.ingredients];
      newIng.splice(id, 1);
      return {
        ingredients: newIng,
      };
    }, () => {
      if (onIngGroupUpdate) {
        const { ingredients } = this.state;
        onIngGroupUpdate(ingredients, groupId);
      }
    });
  };

  render() {
    const {
      ingredients,
      groupInfo,
    } = this.state;
    const { groupId } = this.props;

    if (ingredients.length === 0) {
      return null;
    }

    console.log('IngGroup render(), ingredients:', ingredients, 'groupInfo:', groupInfo);


    const ingFields = [];
    for (let i = 0; i < ingredients.length; i++) {
      ingFields.push(
        (<IngField
          onChange={this.onIngFieldChange}
          value={ingredients[i]}
          ingId={i}
          groupId={groupId}
          key={i}
          onFocus={this.addIngField}
          onBlur={this.removeEmptyIngField}
          onRemoveSelected={this.removeSelectedIngField}
        />),
      );
    }

    return (
      <div className="ingredient-group">
        {ingFields}
        <div className="form-group-buttons">
          <p className="form-description">
            If you&apos;d like to elaborate more on this group,
            use these fields!
            <br />
            For example, you might have groups called
            &quot;batter mix&quot; or &quot;dry ingredients.&quot;
          </p>
          <div className="ing-group-fields">
            <Field
              name="name"
              className="ing-group-info"
              outerClassName="no-pad"
              onChange={this.onFieldChange}
              value={groupInfo.name}
            />
            <Field
              name="notes"
              className="ing-group-info"
              outerClassName="no-pad"
              onChange={this.onFieldChange}
              value={groupInfo.notes}
            />
          </div>
        </div>
      </div>
    );
  }
}

IngGroup.propTypes = {
  groupId: PropTypes.number,
  onIngGroupUpdate: PropTypes.func,
  ingredients: PropTypes.arrayOf(PropTypes.object),
};

IngGroup.defaultProps = {
  groupId: 1,
  onIngGroupUpdate: () => {},
  ingredients: [ING_FIELD_BLANK],
};

export default IngGroup;
