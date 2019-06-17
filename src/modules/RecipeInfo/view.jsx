import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import IngredientGroup from './components/IngredientGroup';
import RecipeNotes from './components/RecipeNotes';
import RecipeSize from './components/RecipeSize';
import AddRecipeButton from './components/AddRecipeButton';
import './styles.css';

class RecipeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      groups: [],
      loadingGroups: true,
      groupCount: 1,
      loadingIngredients: true,
      fetchError: false,
    };
  }

  componentDidMount() {
    this.fetchIngredients();
    this.fetchGroups();
    console.log(this.props);
  }

  shouldComponentUpdate(prevProps) {
    const { selectedId } = this.props;
    if (selectedId !== prevProps.selectedId) {
      return true;
    }
    return false;
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
        this.setState({ loadingGroups: false, fetchError: false });
      })
      .catch(() => {
        this.setState({ fetchError: true });
      });
  }

  fetchIngredients() {
    const { selectedId } = this.props;
    this.setState({ loadingIngredients: true });
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
  }

  render() {
    const {
      selectedId,
      loading,
      error,
      selected,
    } = this.props;
    const {
      loadingGroups,
      groups,
      groupCount,
      ingredients,
      loadingIngredients,
      fetchError,
    } = this.state;
    if (selectedId === -1) {
      return (
        <p className="housekeeping-message">
          Select a recipe to view it!
        </p>
      );
    }
    if (loading || error || loadingGroups || loadingIngredients || fetchError) {
      return <p />;
    }
    return (
      <Fragment>
        <AddRecipeButton />
        <p className="recipe-info-name">{selected.name}</p>
        <RecipeSize size={selected.size} />
        {ingredients.length !== 0 && (
          <IngredientGroup
            ingredients={ingredients}
            groups={groups}
            groupCount={groupCount}
          />
        )}
        <RecipeNotes notes={selected.notes} />
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
};

RecipeInfo.defaultProps = {
  selected: {
    create_date: '',
    id: 1,
    name: '',
    notes: '',
    size: '',
    update_date: '',
  },
  error: false,
  loading: false,
  selectedId: 1,
};

export default RecipeInfo;
