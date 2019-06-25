import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import IngredientGroup from './components/IngredientGroup';
import RecipeNotes from './components/RecipeNotes';
import RecipeSize from './components/RecipeSize';
import AddRecipeButton from './components/AddRecipeButton';
import EditRecipeButton from './components/EditRecipeButton';
import DeleteRecipeButton from './components/DeleteRecipeButton';
import RecipeImages from './components/RecipeImages';
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

  shouldComponentUpdate(prevProps) {
    const { selectedId, loading } = this.props;
    const { loadingIngredients, loadingGroups, loadingImages } = this.state;
    if (selectedId !== prevProps.selectedId) {
      return true;
    }
    if (loading) {
      return true;
    }
    if (loadingIngredients || loadingGroups || loadingImages) {
      return true;
    }
    return false;
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
          this.setState({ groups: res });
          this.setState({ groupCount: res[res.length - 1].groupId });
          this.setState({ loadingGroups: false, fetchError: false });
        })
        .catch(() => {
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
        .catch(() => {
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
        .catch(() => {
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
      loadingIngredients,
      fetchError,
      images,
      loadingImages,
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
        {!loadingImages && <RecipeImages images={images} name={selected.name} />}
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
  loading: PropTypes.bool,
  selectedId: PropTypes.number,
  match: PropTypes.object.isRequired,
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
  loading: false,
  selectedId: -1,
  setSelectedRecipe: () => {},
  fetchSelectedRecipe: () => {},
};

export default RecipeInfo;
