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

      const { ingredients } = this.state;
      ings = (
        <ul className="recipe-info-ingredients-list">
          {ingredients.map(item => (
            <li key={item.id}>
              {item.name}
              &mdash;
              {item.amount}
              {item.amount_unit}
            </li>
          ))}
        </ul>
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
      renderVal = <div><p>Nothing selected</p></div>;
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
