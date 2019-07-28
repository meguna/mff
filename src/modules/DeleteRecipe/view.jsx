import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import StatusInfo from '../common/StatusInfo';
import { callApi } from '../helpers';
import './styles.css';

class DeleteRecipe extends Component {
  constructor(props) {
    super(props);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.state = {
      deleteStatus: '',
      deleteMessage: '',
    };
  }

  componentDidMount() {
    const { match, setSelectedRecipe } = this.props;
    setSelectedRecipe(+match.params.id);
  }

  deleteRecipe = (e) => {
    const {
      selectedId,
      fetchRecipes,
      sortMethod,
      history,
      setNotification,
    } = this.props;

    e.preventDefault();
    callApi(`/deleteRecipe/${selectedId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setNotification('success', 'Successfully deleted recipe.');
        fetchRecipes(sortMethod);
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
        setNotification(
          'fail',
          'Failed to delete recipe. Please try again later.',
        );
      });
  }

  render() {
    const { selectedId } = this.props;
    const { deleteStatus, deleteMessage } = this.state;
    return (
      <Fragment>
        <StatusInfo
          status={deleteStatus}
          dynamicMessage={deleteMessage}
        />
        <h1 className="title">
          Delete Recipe
        </h1>
        <p className="delete-description">
          You are about to delete this recipe. Are you sure?
        </p>
        <div className="confirm-buttons-wrapper">
          <button
            type="button"
            className="confirm-buttons
            affirmative"
            onClick={this.deleteRecipe}
          >
            Yes, I am sure.
          </button>
          <div>
            <Link to={`/recipe/${selectedId}`} className="confirm-buttons cancel">
              Cancel
            </Link>
          </div>
        </div>
      </Fragment>
    );
  }
}

DeleteRecipe.propTypes = {
  selectedId: PropTypes.number.isRequired,
  setSelectedRecipe: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  fetchRecipes: PropTypes.func.isRequired,
  sortMethod: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

DeleteRecipe.defaultProps = {
  sortMethod: 'update_date',
};

export default withRouter(DeleteRecipe);
