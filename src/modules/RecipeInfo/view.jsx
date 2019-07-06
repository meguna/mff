import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import IngredientGroup from './components/IngredientGroup';
import RecipeNotes from './components/RecipeNotes';
import RecipeSize from './components/RecipeSize';
import AddRecipeButton from './components/AddRecipeButton';
import EditRecipeButton from './components/EditRecipeButton';
import DeleteRecipeButton from './components/DeleteRecipeButton';
import RecipeImages from './components/RecipeImages';
import StatusInfo from '../common/StatusInfo';
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
    } = this.props;
    if (selectedId !== +match.params.id) {
      setSelectedRecipe(+match.params.id);
    }
    const { selected } = this.props;
    if (selected.id === -1 || !selected.id) {
      fetchSelectedRecipe(+match.params.id);
    }
    this.fetchIngredients();
    this.fetchGroups();
    this.fetchImages();
  }

  componentDidUpdate(prevProps) {
    const { selectedId } = this.props;
    if (selectedId !== prevProps.selectedId) {
      this.fetchIngredients();
      this.fetchGroups();
      this.fetchImages();
    }
  }

  fetchGroups() {
    const { selectedId } = this.props;
    this.setState({ loadingGroups: true }, () => {
      fetch(`http://localhost:3005/api/getingredientgroups/${selectedId}`)
        .then(res => res.json())
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
      fetch(`http://localhost:3005/api/getingredients/${selectedId}`)
        .then(res => res.json())
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
      fetch(`http://localhost:3005/api/getrecipeimages/${selectedId}`)
        .then(res => res.json())
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
    const { selectedId, error, selected, notification } = this.props;
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

    if (selectedId === -1) {
      return (
        <p className="housekeeping-message">
          Select a recipe to view it!
        </p>
      );
    }

    if (error || fetchError) {
      return null;
    }

    return (
      <Fragment>
        <StatusInfo message="notification message!!!" color="green" />
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
  selectedId: PropTypes.number,
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
  selectedId: -1,
  setSelectedRecipe: () => {},
  fetchSelectedRecipe: () => {},
};

export default RecipeInfo;
