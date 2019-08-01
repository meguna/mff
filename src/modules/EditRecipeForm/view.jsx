import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import RecipeForm from '../RecipeForm';
import { hs, callApi } from '../helpers';
import { ING_FIELD_BLANK, ING_GROUP_BLANK } from '../common/initial';
import './styles.css';

class EditRecipeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        ingredients: [[{ ...ING_FIELD_BLANK }]],
        groups: [{ ...ING_GROUP_BLANK }],
        info: {
          name: '',
          size: '',
          notes: '',
        },
        invalid: { name: false, ingCount: false },
        images: [],
      },
      loadingInfo: true,
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

    const paramId = +hs.decode(match.params.id);
    if (selectedId !== paramId) {
      setSelectedRecipe(paramId);
    }

    /* Run fetchInfo() when a user first navigates to this page
     * from elsewhere on the website
     */
    if (!loadingAuth) {
      if (selectedId !== -1) {
        this.fetchInfo();
      }
    }

    /* Redirect page if no recipe is selected or
     * if no recipe id is passed  as a route parameter
     */
    if (!(+match.params.id) && selectedId === -1) {
      history.push('/');
    }
  }

  componentDidUpdate(prevProps) {
    const {
      loadingAuth,
      selectedId,
    } = this.props;

    /* Run fetchInfo() once when a user first navigates to this page
     * (not from a different page on the website) and the call needs
     * to wait until the user is authenticated.
     */
    if (prevProps.loadingAuth !== loadingAuth
      || prevProps.selectedId !== selectedId) {
      if (!loadingAuth) {
        if (selectedId !== -1) {
          this.fetchInfo();
        }
      }
    }
  }

  fetchInfo() {
    const { selectedId } = this.props;
    this.setState({ loadingInfo: true }, () => {
      callApi(`/getrecipeinfo/${selectedId}`)
        .then((res) => {
          /* If no groups are stored in the DB, add one default group
           */
          let { groups } = res;
          if (res.length === 0) {
            groups = [{ ...ING_GROUP_BLANK }];
          }

          /* Restructure flat array of ingredient objects into a 2D
           * array where ingredients are grouped by Group ID
           */
          const ings = res.ingredients;
          let ingGroups = [];
          ingGroups.push([]);
          let counter = 0;
          for (let i = 0; i < ings.length; i++) {
            if (i !== 0 && ings[i].groupId !== ings[i - 1].groupId) {
              ingGroups.push([]);
              counter++;
            }
            ingGroups[counter].push(ings[i]);
          }
          if (ings.length === 0) {
            ingGroups = [[{ ...ING_FIELD_BLANK }]];
          }

          this.setState({
            form: {
              groups,
              ingredients: ingGroups,
              images: res.images,
              groupCount: groups.length,
              info: res.info,
            },
            loadingInfo: false,
            fetchError: false,
          });
        })
        .catch(() => {
          this.setState({ fetchError: true });
        });
    });
  }

  render() {
    const { form, loadingInfo, fetchError } = this.state;
    const { selectedId } = this.props;
    const messages = {
      buttonAction: 'Update recipe!',
      failMessage: `Oops! There was an error updating your recipe. 
        Please try again!`,
      successMessage: 'The recipe was updated successfully!',
    };

    if (loadingInfo) {
      return <p>Loading...</p>;
    }

    if (fetchError) {
      return <p>We&apos;re having trouble connecting to our server.</p>;
    }

    return (
      <Fragment>
        <RecipeForm
          initialFormState={form}
          title={`Edit Recipe: ${form.info.name}`}
          initialIngredients={form.ingredients}
          initialGroups={form.groups}
          initialImages={form.images}
          notes={form.info.notes}
          name={form.info.name}
          size={form.info.size}
          fetchUrl={`/updateRecipe/${selectedId}`}
          messages={messages}
        />
      </Fragment>
    );
  }
}

EditRecipeForm.propTypes = {
  selectedId: PropTypes.number.isRequired,
  setSelectedRecipe: PropTypes.func.isRequired,
  loadingAuth: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default EditRecipeForm;
