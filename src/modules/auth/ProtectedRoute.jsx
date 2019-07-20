import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ Component, isAuthenticated, history, location, ...rest }) => {
  if (isAuthenticated) {
    return (
      <Route {...rest} component={Component} />
    );
  }
  return (
    <Redirect to="/login" />
  );
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

/* Explicit connection with redux is required in order to use
 * the `isAuthenticated` param, since it is not automatically done
 * with functional components such as this one.
 */
const mapStateToProps = state => state;

export default connect(mapStateToProps)(ProtectedRoute);
