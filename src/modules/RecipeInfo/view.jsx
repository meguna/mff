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
      info: [],
      loadingInfo: true,
      fetchError: false,
    };
  }

  componentDidMount() {
    const {
      match,
      setSelectedRecipe,
      selectedId,
      history,
      loadingAuth,
    } = this.props;

    if (selectedId !== +match.params.id) {
      setSelectedRecipe(+match.params.id);
    }

    /* Run fetchInfo() when a user first navigates to this page
     * from elsewhere on the website
     */
    if (!loadingAuth) {
      if (selectedId !== -1) {
        this.fetchRecipeInfo();
      }
    }

    /* Redirect page if no recipe is selected or
     * if no recipe id is passed  as a route parameter
     */
    if (!(+match.params.id) && selectedId === -1) {
      history.push('/');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      loadingAuth,
      selectedId,
    } = this.props;

    /* Run fetchInfo() once when a user first navigates to this page
     * (not from a different page on the website) and the call needs
     * to wait until the user is authenticated.
     */
    if (prevProps.loadingAuth !== loadingAuth || prevProps.selectedId !== selectedId) {
      if (!loadingAuth) {
        if (selectedId !== -1) {
          this.fetchRecipeInfo();
        }
      }
    }

    /* If above fetch calls causes a problem, throw error.
     * RecipeInfoErrorBoundary component will catch it.
     */
    if (prevProps.error || prevState.fetchError) {
      throw Error();
    }
  }

  fetchRecipeInfo() {
    const { selectedId } = this.props;
    callApi(`/getrecipeinfo/${selectedId}`)
      .then((res) => {
        let { groups } = res;
        if (groups.length === 0) {
          groups = [{ ...ING_GROUP_BLANK }];
        }
        this.setState({
          groups,
          ingredients: res.ingredients,
          images: res.images,
          groupCount: groups.length,
          info: res.info,
          loadingInfo: false,
          fetchError: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ fetchError: true });
      });
  }

  render() {
    const { selectedId, error } = this.props;
    const {
      loadingInfo,
      groups,
      groupCount,
      ingredients,
      images,
      info,
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
        <p className="recipe-info-name">{info.name}</p>
        <RecipeSize size={info.size} />
        {!loadingInfo && (
          <Fragment>
            <IngredientGroup
              ingredients={ingredients}
              groups={groups}
              groupCount={groupCount}
            />
            <RecipeNotes notes={info.notes} />
            <RecipeImages images={images} name={info.name} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

RecipeInfo.propTypes = {
  error: PropTypes.bool,
  selectedId: PropTypes.number.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  setSelectedRecipe: PropTypes.func.isRequired,
  loadingAuth: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

RecipeInfo.defaultProps = {
  error: false,
};

export default withRouter(RecipeInfo);
