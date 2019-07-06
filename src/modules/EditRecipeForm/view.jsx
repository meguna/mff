import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import RecipeForm from '../RecipeForm';
import { ING_FIELD_BLANK, ING_GROUP_BLANK } from '../common/initial';
import './styles.css';

class EditRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: '',
        size: '',
        ingredients: [[{ ...ING_FIELD_BLANK }]],
        groups: [{ ...ING_GROUP_BLANK }],
        notes: '',
        invalid: { name: false, ingCount: false },
        images: [],
      },
    };
  }

  componentDidMount() {
    const { match } = this.props;
    this.setState({ loadingImages: true }, () => {
      fetch(`http://localhost:3005/api/getrecipe/${+match.params.id}`)
        .then(res => res.json())
        .then(res => res[0])
        .then((res) => {
          this.setState(prevState => ({
            form: {
              ...prevState.form,
              name: res.name,
              notes: res.notes,
              size: res.size,
            },
            selectedId: res.id,
          }), () => {
            this.fetchIngredients();
            this.fetchGroups();
            this.fetchImages();
          });
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  fetchGroups() {
    const { selectedId } = this.state;
    this.setState({ loadingGroups: true }, () => {
      fetch(`http://localhost:3005/api/getingredientgroups/${selectedId}`)
        .then(res => res.json())
        .then((res) => {
          let groups = res;
          if (res.length === 0) {
            groups = [{ ...ING_GROUP_BLANK }];
          }
          this.setState(prevState => ({
            form: {
              ...prevState.form,
              groups,
              groupCount: res.length,
            },
            loadingGroups: false,
            fetchError: false,
          }));
        })
        .catch(() => {
          this.setState({ fetchError: true });
        });
    });
  }

  fetchIngredients() {
    const { selectedId } = this.state;
    this.setState({ loadingIngredients: true }, () => {
      fetch(`http://localhost:3005/api/getingredients/${selectedId}`)
        .then(res => res.json())
        /**
         * group ingredients into a 2D array, grouped by groupId.
         */
        .then((res) => {
          let ingGroups = [];
          ingGroups.push([]);
          let counter = 0;
          for (let i = 0; i < res.length; i++) {
            if (i !== 0 && res[i].groupId !== res[i - 1].groupId) {
              ingGroups.push([]);
              counter++;
            }
            ingGroups[counter].push(res[i]);
          }
          if (res.length === 0) {
            ingGroups = [[{ ...ING_FIELD_BLANK }]];
          }
          this.setState(prevState => ({
            form: {
              ...prevState.form,
              ingredients: ingGroups,
            },
            loadingIngredients: false,
            fetchError: false,
          }));
        })
        .catch((err) => {
          this.setState({ fetchError: true });
          console.error(err);
        });
    });
  }

  fetchImages() {
    const { selectedId } = this.state;
    this.setState({ loadingImages: true }, () => {
      fetch(`http://localhost:3005/api/getrecipeimages/${selectedId}`)
        .then(res => res.json())
        .then((res) => {
          this.setState(prevState => ({
            form: {
              ...prevState.form,
              images: res,
            },
            loadingImages: false,
            fetchError: false,
          }));
        })
        .catch(() => {
          this.setState({ fetchError: true });
        });
    });
  }

  render() {
    const {
      form,
      loadingGroups,
      loadingIngredients,
      loadingImages,
      fetchError,
      selectedId,
    } = this.state;

    const { fetchRecipes, sortMethod } = this.props;

    const messages = {
      buttonAction: 'Update recipe!',
      failMessage: `Oops! There was an error updating your recipe. 
        Please try again!`,
      successMessage: 'The recipe was updated successfully!',
    };

    if (loadingGroups || loadingIngredients || loadingImages) {
      return <p>Loading...</p>;
    }

    if (fetchError) {
      return <p>We&apos;re having trouble connecting to our server.</p>;
    }

    return (
      <Fragment>
        <RecipeForm
          initialFormState={form}
          title={`Edit Recipe: ${form.name}`}
          initialIngredients={form.ingredients}
          initialGroups={form.groups}
          initialImages={form.images}
          notes={form.notes}
          name={form.name}
          size={form.size}
          fetchUrl={`http://localhost:3005/api/updateRecipe/${selectedId}`}
          messages={messages}
          submitCallback={() => {fetchRecipes(sortMethod)}}
        />
      </Fragment>
    );
  }
}


EditRecipeForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default EditRecipeForm;
