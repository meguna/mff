import React from 'react';
import PropTypes from 'prop-types';

export const MOBILE_THRESHOLD = '768px';

class ScreenHOC extends React.Component {
  constructor() {
    super();
    this.state = {
      isMobile: window.innerWidth < MOBILE_THRESHOLD,
    };
  }

  render() {
    const { isMobile } = this.state;
    const { desktop, mobile } = this.props;

    if (isMobile) {
      return (
        { mobile }
      );
    }
    return (
      { desktop }
    );
  }
}

ScreenHOC.propTypes = {
  desktop: PropTypes.element.isRequired,
  mobile: PropTypes.element.isRequired,
};

export default ScreenHOC;
