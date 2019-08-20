import React, { Component } from 'react';
import './styles.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import LoadMoreButton from './components/LoadMoreButton';
import { callApi, hs } from '../helpers';

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: 'update_date',
      sQuery: '',
    };
    this.onSortSelect = this.onSortSelect.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
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

  onSearchChange(e) {
    const { sortMethod, fetchRecipes, fetchQuickSearch } = this.props;
    const query = e.target.value;
    this.setState({
      sQuery: query,
    });
    if (query !== '') {
      fetchQuickSearch(query, sortMethod);
    } else {
      fetchRecipes(sortMethod);
    }
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
    const { sortMethod, sQuery } = this.state;

    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="quick search"
            id="quick-search-field"
            value={sQuery}
            onChange={this.onSearchChange}
          />
        </form>
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
  fetchQuickSearch: PropTypes.func.isRequired,
  sortMethod: PropTypes.string.isRequired,
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
