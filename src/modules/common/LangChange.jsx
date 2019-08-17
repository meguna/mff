import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import './styles.css';

class LangChange extends Component {
  constructor(props) {
    super(props);
    this.onLangSelect = this.onLangSelect.bind(this);
  }

  onLangSelect(e) {
    const { i18n } = this.props;
    if (e.target.value === 'en') {
      i18n.changeLanguage('en');
    } else if (e.target.value === 'en') {
      i18n.changeLanguage('ja');
    }
  }

  render() {
    const { i18n } = this.props;
    return (
      <Fragment>
        <select
          className="select-lang-dropdown"
          value={i18n.language}
          onChange={this.onLangSelect}
        >
          <option value="en">English</option>
          <option value="ja">Japanese</option>
        </select>
      </Fragment>
    );
  }
}

LangChange.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    changeLanguage: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
  }).isRequired,

};

export default withTranslation()(LangChange);
