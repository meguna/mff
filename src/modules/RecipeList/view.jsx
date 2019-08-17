import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadMoreButton from './components/LoadMoreButton';
import { hs } from '../helpers';
import { withTranslation } from 'react-i18next';

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: 'update_date',
    };
    this.onSortSelect = this.onSortSelect.bind(this);
  }

  shouldComponentUpdate(prevProps) {
    const { recipes, selectedId } = this.props;
    if (recipes !== prevProps.recipes) {
      return true;
    }
    if (selectedId !== prevProps.selectedId) {
      return true;
    }
    if (prevProps.error) {
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      throw Error();
    }
  }

  onRecipeClick(id) {
    const { selectedId, setSelectedRecipe } = this.props;
    if (id !== selectedId) {
      setSelectedRecipe(id);
    }
  }

  onSortSelect(event) {
    const { fetchRecipes } = this.props;
    this.setState({ sortMethod: event.target.value }, () => {
      const { sortMethod } = this.state;
      fetchRecipes(sortMethod);
    });
  }

  render() {
    const {
      recipes,
      selectedId,
      loading,
      error,
      fetchMoreRecipes,
      listOffset,
      loadingAuth,
      t,
    } = this.props;
    const { sortMethod } = this.state;

    return (
      <div>
        <form>
          <select value={sortMethod} onChange={this.onSortSelect}>
            <option value="name">{t('common:list.name')}</option>
            <option value="update_date">{t('common:list.update')}</option>
            <option value="create_date">{t('common:list.create')}</option>
          </select>
        </form>
        {(!loading || !error) && recipes.map((recipe) => {
          const hashid = hs.encode(recipe.id);
          return (
            <div key={recipe.id}>
              <Link
                role="link"
                to={`/recipe/${hashid}`}
                tabIndex="0"
                onClick={() => this.onRecipeClick(recipe.id)}
                onKeyDown={() => this.onRecipeClick(recipe.id)}
                className="recipe-list-item-wrapper"
              >
                <p className={(recipe.id === selectedId ? 'selected' : '')}>
                  {recipe.name}
                </p>
              </Link>
            </div>
          );
        })}
        <LoadMoreButton
          onAction={() => fetchMoreRecipes(listOffset, sortMethod)}
          loading={loading}
          loadingAuth={loadingAuth}
        />
      </div>
    );
  }
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.bool,
  loading: PropTypes.bool,
  loadingAuth: PropTypes.bool.isRequired,
  selectedId: PropTypes.number,
  listOffset: PropTypes.number,
  fetchRecipes: PropTypes.func.isRequired,
  fetchMoreRecipes: PropTypes.func.isRequired,
  setSelectedRecipe: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

RecipeList.defaultProps = {
  recipes: [],
  error: false,
  loading: false,
  selectedId: 1,
  listOffset: 0,
};

export default withTranslation()(RecipeList);
