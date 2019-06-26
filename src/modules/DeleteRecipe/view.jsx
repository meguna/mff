import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import StatusInfo from '../common/StatusInfo';
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
    const { selectedId, fetchRecipes, sortMethod, history } = this.props;
    e.preventDefault();
    fetch(`http://localhost:3005/api/deleteRecipe/${selectedId}`, {
      method: 'DELETE',
    })
      .then(() => {
        this.setState({
          deleteStatus: 'success',
          deleteMessage: 'Successfully deleted recipe.',
        });
        fetchRecipes(sortMethod);
        history.push('/');
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          deleteStatus: 'fail',
          deleteMessage: 'Failed to delete recipe. Please try again later.',
        });
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
          <button type="button" className="confirm-buttons affirmative" onClick={this.deleteRecipe}>
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
  setSelectedRecipe: PropTypes.func,
  match: PropTypes.object.isRequired,
  fetchRecipes: PropTypes.func,
  sortMethod: PropTypes.string,
};

DeleteRecipe.defaultProps = {
  setSelectedRecipe: () => {},
  fetchRecipes: () => {},
  sortMethod: 'update_date',
};

export default withRouter(DeleteRecipe);
