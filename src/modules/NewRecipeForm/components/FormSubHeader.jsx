import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const FormSubHeader = ({ subtitle }) => (
  <Fragment>
    <hr />
    <h2 className="subtitle">{subtitle}</h2>
  </Fragment>
);

FormSubHeader.propTypes = {
  subtitle: PropTypes.string,
};

FormSubHeader.defaultProps = {
  subtitle: '',
};

export default React.memo(FormSubHeader);
