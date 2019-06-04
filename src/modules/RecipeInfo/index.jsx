// simple enough component, so Redux logic is combined with Component view.
// separate if becomes too complex.

import { connect } from 'react-redux';
import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';

const Ingredient = ({ ingredient }) => (
  <p key={ingredient.id} className="recipe-info-ingredients-item">
    {ingredient.name}
    &mdash;
    {ingredient.amount}
    &nbsp;
    {ingredient.amount_unit}
    <span className="recipe-info-ingredient-note">
      {ingredient.notes}
    </span>
  </p>
);

Ingredient.propTypes = {
  ingredient: PropTypes.object,
};

Ingredient.defaultProps = {
  ingredient: {},
};

const groupLetterLabel = (int, groupCount) => {
  if (groupCount > 1) {
    return (
      <span className="recipe-info-group-letter-label">
        {String.fromCharCode(65 + int)}
      </span>
    );
  }
};

const IngredientGroup = ({ ingredients, groups, groupCount }) => {
  const ingredientGroups = [];
  for (let i = 1; i < groupCount + 1; i++) {
    ingredientGroups.push(ingredients.filter(item => item.group_id === i));
  }
  return (
    <div className="recipe-info-ingredients-list">
      {ingredientGroups.map((group, i) => (
        <div className="recipe-info-ingredients-list-group" key={i}>
          <p className="recipe-info-group-note">{groups[i].notes}</p>
          {groupLetterLabel(i, groupCount)}
          <div className="recipe-info-ingredients-item-parent">
            {group.map(ingredient => (
              <Ingredient ingredient={ingredient} key={ingredient.id} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

IngredientGroup.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
  groups: PropTypes.arrayOf(PropTypes.object),
  groupCount: PropTypes.number,
};

IngredientGroup.defaultProps = {
  ingredients: [],
  groups: [{}],
  groupCount: null,
};

const RecipeNotes = ({ notes }) => (
  <div>
    <p className="recipe-info-label">notes</p>
    <p className="recipe-info-notes">{notes}</p>
  </div>
);

RecipeNotes.propTypes = {
  notes: PropTypes.string,
};

RecipeNotes.defaultProps = {
  notes: '',
};

class RecipeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      groups: [],
      loadingGroups: true,
      groupCount: 1,
      loadingIngredients: true,
    };
  }

  componentDidUpdate(prevProps) {
    const { selectedId } = this.props;
    if (selectedId !== prevProps.selectedId) {
      this.fetchIngredients();
      this.fetchGroups();
    }
  }

  fetchGroups() {
    const { selectedId } = this.props;
    this.setState({ loadingGroups: true });
    fetch(`http://localhost:3005/api/getingredientgroups/${selectedId}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({ groups: res });
        this.setState({ groupCount: res[res.length - 1].group_id });
        this.setState({ loadingGroups: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  fetchIngredients() {
    const { selectedId } = this.props;
    this.setState({ loadingIngredients: true });
    fetch(`http://localhost:3005/api/getingredients/${selectedId}`)
      .then(res => res.json())
      .then((res) => {
        this.setState({ ingredients: res, loadingIngredients: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    const {
      selectedId,
      loading,
      error,
      recipes,
    } = this.props;
    const {
      loadingGroups,
      groups,
      groupCount,
      ingredients,
      loadingIngredients,
    } = this.state;
    if (selectedId === -1) {
      return <p className="housekeeping-message">Select a recipe to view it!</p>;
    }
    if (loading || error || loadingGroups || loadingIngredients) {
      return <p />;
    }
    const selected = recipes.filter(item => item.id === selectedId)[0];
    return (
      <div>
        <p className="recipe-info-name">{selected.name}</p>
        <p className="recipe-info-serves">{selected.size}</p>
        <p className="recipe-info-label">ingredients</p>
        <IngredientGroup
          ingredients={ingredients}
          groups={groups}
          groupCount={groupCount}
        />
        <RecipeNotes notes={selected.notes} />
      </div>
    );
  }
}

RecipeInfo.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.bool,
  loading: PropTypes.bool,
  selectedId: PropTypes.number,
};

RecipeInfo.defaultProps = {
  recipes: {},
  error: false,
  loading: false,
  selectedId: 1,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(RecipeInfo);
