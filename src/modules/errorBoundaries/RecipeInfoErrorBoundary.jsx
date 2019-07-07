import React, { Fragment, Component } from 'react';
import './styles.css';

class RecipeInfoErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <Fragment>
          <h1 className="errorboundary-title">Sorry, something went wrong!</h1>
          <p className="errorboundary-message">
            We&apos;re having trouble loading your recipe at the moment.
            <br />
            We&apos;re working on it!
          </p>
        </Fragment>
      );
    }

    return children;
  }
}

export default RecipeInfoErrorBoundary;
