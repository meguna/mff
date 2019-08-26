import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { AlertCircle } from 'react-feather';

class Field extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, onChange } = this.props;
    if (onChange) {
      onChange(name, e.target.value);
    }
  }

  render() {
    const {
      name,
      className,
      labelClassName,
      value,
      id,
      textarea,
      invalid,
      validString,
      onBlur,
      outerClassName,
      required,
      info,
      labelname,
      t,
    } = this.props;

    const TagType = textarea ? 'textarea' : 'input';
    const validClass = invalid ? ' invalid' : '';

    return (
      <div className={outerClassName}>
        <label htmlFor={id} className={`${labelClassName} field-label`}>
          {labelname || name}
          {required && (
            <span className="required-label">
              {t('common:recipeform.required')}
            </span>
          )}
        </label>
        {info && <p className="form-description">{info}</p>}
        <TagType
          placeholder={labelname || name}
          className={`${className}${validClass} rf-input`}
          id={id}
          type="text"
          value={value || ''}
          onChange={this.handleChange}
          onBlur={onBlur}
        />
        {invalid && (
          <p className="error-msg">
            <AlertCircle />
            {` ${validString}`}
          </p>
        )}
      </div>
    );
  }
}

Field.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  labelClassName: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  name: PropTypes.string,
  textarea: PropTypes.bool,
  invalid: PropTypes.bool,
  validString: PropTypes.string,
  outerClassName: PropTypes.string,
  info: PropTypes.string,
  labelname: PropTypes.string,
  required: PropTypes.bool,
  screen: PropTypes.string.isRequired,
};

Field.defaultProps = {
  onBlur: () => {},
  className: '',
  labelClassName: '',
  value: '',
  id: '',
  name: '',
  textarea: false,
  invalid: false,
  validString: '',
  labelname: '',
  outerClassName: 'form-group',
  info: '',
  required: false,
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withTranslation()(Field));
