import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import IngField from './IngField';
import Field from './Field';
import { ING_FIELD_BLANK, ING_GROUP_BLANK } from '../../common/initial';

class IngGroup extends Component {
  constructor(props) {
    super(props);
    this.onIngFieldChange = this.onIngFieldChange.bind(this);
    this.addIngField = this.addIngField.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    const { ingredients, group } = props;
    this.state = {
      ingredients,
      groupInfo: { ...group },
    };
  }

  onIngFieldChange = (param, id, val) => {
    const { ingredients, groupInfo } = this.state;
    const { onIngGroupUpdate, groupId } = this.props;
    ingredients[id][param] = val;
    this.setState({ ingredients });
    const ing = JSON.parse(JSON.stringify(ingredients));
    if (onIngGroupUpdate) {
      onIngGroupUpdate(ing, groupId, groupInfo);
    }
  };

  onFieldChange = (param, val) => {
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
    const { ingredients } = this.state;
    const { groupId } = this.props;
    if (id === ingredients.length - 1) {
      this.setState(prevState => ({
        ingredients: [
          ...prevState.ingredients,
          { name: '', amount: '', notes: '', groupId },
        ],
      }));
    }
  };

  removeEmptyIngField = (id) => {
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
    const { onRemoveGroup, onIngGroupUpdate, groupId } = this.props;
    this.setState((prevState) => {
      const newIng = [...prevState.ingredients];
      newIng.splice(id, 1);
      return {
        ingredients: newIng,
      };
    }, () => {
      const { ingredients, groupInfo } = this.state;
      if (ingredients.length === 0) {
        onRemoveGroup(groupId);
      } else {
        onIngGroupUpdate(ingredients, groupId, groupInfo);
      }
    });
  };

  render() {
    const {
      ingredients,
      groupInfo,
    } = this.state;
    const { groupId, t } = this.props;

    if (ingredients.length === 0) {
      return null;
    }

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
            {t('common:recipeform.ingGroupDesc')}
          </p>
          <div className="ing-group-fields">
            <Field
              labelname={t('common:recipeform.grpNotes')}
              name="name"
              className="ing-group-info"
              outerClassName="no-pad"
              onChange={this.onFieldChange}
              value={groupInfo.name}
            />
            <Field
              labelname={t('common:recipeform.grpNotes')}
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
  onIngGroupUpdate: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.object),
  group: PropTypes.object,
  onRemoveGroup: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

IngGroup.defaultProps = {
  groupId: 1,
  ingredients: [ING_FIELD_BLANK],
  group: { ...ING_GROUP_BLANK },
};

export default withTranslation()(IngGroup);
