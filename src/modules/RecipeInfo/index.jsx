// simple enough component, so Redux logic is combined with Component view.
// separate if becomes too complex.

import { connect } from 'react-redux';
import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';

class RecipeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = { ingredients: [] };
  }

  SelectedRecipeInfo() {
    // database id's start at 1, array index starts at 0
    // probably bad practice, change to grab item using its ID instead of index
    const { recipes, selected_id: selectedId } = this.props;
    const selected = recipes[selectedId - 1];
    return (
      <div>
        <p className="recipe-info-name">{selected.name}</p>
        <p className="recipe-info-serves">{selected.size}</p>
        <p className="recipe-info-label">ingredients</p>
        {this.fetchIngredients()}
        <p className="recipe-info-label">notes</p>
        <p className="recipe-info-notes">{selected.notes}</p>
      </div>
    );
  }

  fetchIngredients() {
    let ings = <div />;
    const { selected_id: selectedId } = this.props;
    if (selectedId) {
      fetch(`http://localhost:3005/api/getingredients/${selectedId}`)
        .then(res => res.json())
        .then((res) => {
          this.setState({ ingredients: res });
        })
        .catch(() => {
        });

      // reorganize ingredients based on "group_id" parameter
      // in order to organize DOM better
      const { ingredients } = this.state;

      const max = ingredients.reduce((result, item = 0) => {
        if (item.group_id > result) result = item.group_id;
        return result;
      }, 0);
      const ingredientsGrouped = [];
      for (let i = 0; i < max; i++) {
        ingredientsGrouped.push([]);
      }
      ingredients.forEach((item) => {
        ingredientsGrouped[item.group_id - 1].push(item);
      });

      ings = (
        <div className="recipe-info-ingredients-list">
          {ingredientsGrouped.map((group, i) => (
            <div className="recipe-info-ingredients-list-group" key={i}>
              {group.map(item => (
                <p key={item.id} className="recipe-info-ingredients-item">
                  {item.name}
                  &mdash;
                  {item.amount}
                  &nbsp;
                  {item.amount_unit}
                  <span className="recipe-info-ingredient-note">
                    {item.notes}
                  </span>
                </p>
              ))}
            </div>
          ))}
        </div>
      );
    }
    return ings;
  }

  render() {
    const { selected_id: selectedId, loading, error } = this.props;
    let renderVal;
    if (selectedId && !loading && !error) {
      renderVal = <div>{this.SelectedRecipeInfo()}</div>;
    } else {
      renderVal = (
        <div className="recipe-info-error-message">
          <p>Click on a recipe to view its details!</p>
        </div>
      );
    }
    return renderVal;
  }
}

RecipeInfo.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.bool,
  loading: PropTypes.bool,
  selected_id: PropTypes.number,
};

RecipeInfo.defaultProps = {
  recipes: {},
  error: false,
  loading: false,
  selected_id: null,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(RecipeInfo);
