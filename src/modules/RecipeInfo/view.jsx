import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import IngredientGroup from './components/IngredientGroup';
import RecipeNotes from './components/RecipeNotes';
import RecipeSize from './components/RecipeSize';
import AddRecipeButton from './components/AddRecipeButton';
import EditRecipeButton from './components/EditRecipeButton';
import DeleteRecipeButton from './components/DeleteRecipeButton';
import RecipeImages from './components/RecipeImages';
import { callApi } from '../helpers';
import { ING_GROUP_BLANK } from '../common/initial';
import './styles.css';

class RecipeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      groups: [],
      groupCount: 1,
      images: [],
      loadingIngredients: true,
      loadingGroups: true,
      loadingImages: true,
      fetchError: false,
    };
  }

  componentDidMount() {
    const {
      match,
      setSelectedRecipe,
      selectedId,
      fetchSelectedRecipe,
      history,
    } = this.props;

    if (selectedId !== +match.params.id) {
      setSelectedRecipe(+match.params.id);
    }
    fetchSelectedRecipe(+match.params.id);
    this.fetchIngredients();
    this.fetchGroups();
    this.fetchImages();

    /* Redirect page if no recipe is selected or
     * if no recipe id is passed  as a route parameter
     */
    if (!(+match.params.id) && selectedId === -1) {
      history.push('/');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedId } = this.props;
    if (selectedId !== prevProps.selectedId) {
      this.fetchIngredients();
      this.fetchGroups();
      this.fetchImages();
    }

    /* If above fetch calls causes a problem, throw error.
     * RecipeInfoErrorBoundary component will catch it.
     */
    if (prevProps.error || prevState.fetchError) {
      throw Error();
    }
  }

  fetchGroups() {
    const { selectedId } = this.props;
    this.setState({ loadingGroups: true }, () => {
      callApi(`/getingredientgroups/${selectedId}`)
        .then((res) => {
          let groups = res;
          if (res.length === 0) {
            groups = [{ ...ING_GROUP_BLANK }];
          }
          this.setState({
            groups,
            groupCount: res.length,
            loadingGroups: false,
            fetchError: false,
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({ fetchError: true });
        });
    });
  }

  fetchIngredients() {
    const { selectedId } = this.props;
    this.setState({ loadingIngredients: true }, () => {
      callApi(`/getingredients/${selectedId}`)
        .then((res) => {
          this.setState({
            ingredients: res,
            loadingIngredients: false,
            fetchError: false,
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({ fetchError: true });
        });
    });
  }

  fetchImages() {
    const { selectedId } = this.props;
    this.setState({ loadingImages: true }, () => {
      callApi(`/getrecipeimages/${selectedId}`)
        .then((res) => {
          this.setState({
            images: res,
            loadingImages: false,
            fetchError: false,
          });
        })
        .catch((err) => {
          console.error(err);
          this.setState({ fetchError: true });
        });
    });
  }

  render() {
    const { selectedId, error, selected } = this.props;
    const {
      loadingGroups,
      groups,
      groupCount,
      ingredients,
      images,
      loadingIngredients,
      loadingImages,
      fetchError,
    } = this.state;

    if (error || fetchError) {
      return null;
    }

    return (
      <Fragment>
        <AddRecipeButton />
        <EditRecipeButton id={selectedId} />
        <DeleteRecipeButton id={selectedId} />
        <p className="recipe-info-name">{selected.name}</p>
        <RecipeSize size={selected.size} />
        {!loadingIngredients && !loadingGroups && (
          <IngredientGroup
            ingredients={ingredients}
            groups={groups}
            groupCount={groupCount}
          />
        )}
        <RecipeNotes notes={selected.notes} />
        {!loadingImages && (
          <RecipeImages images={images} name={selected.name} />
        )}
      </Fragment>
    );
  }
}

RecipeInfo.propTypes = {
  selected: PropTypes.shape({
    create_date: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    notes: PropTypes.string,
    size: PropTypes.string,
    update_date: PropTypes.string,
  }),
  error: PropTypes.bool,
  selectedId: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  setSelectedRecipe: PropTypes.func,
  fetchSelectedRecipe: PropTypes.func,
};

RecipeInfo.defaultProps = {
  selected: {
    create_date: '',
    id: -1,
    name: '',
    notes: '',
    size: '',
    update_date: '',
  },
  error: false,
  setSelectedRecipe: () => {},
  fetchSelectedRecipe: () => {},
};

export default withRouter(RecipeInfo);
