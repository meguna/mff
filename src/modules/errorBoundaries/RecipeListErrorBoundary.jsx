import React, { Fragment, Component } from 'react';
import './styles.css';

class RecipeListErrorBoundary extends Component {
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
          <p className="errorboundary-message">
            Sorry, we&apos;re having trouble loading your recipes.
          </p>
        </Fragment>
      );
    }

    return children;
  }
}

export default RecipeListErrorBoundary;
