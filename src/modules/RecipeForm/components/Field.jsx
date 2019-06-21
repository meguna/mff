import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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
    } = this.props;

    const TagType = textarea ? 'textarea' : 'input';
    const validClass = invalid ? ' invalid' : '';

    return (
      <div className={outerClassName}>
        <label htmlFor={id} className={`${labelClassName} field-label`}>
          {name}
          {required && <span className="required-label"> required</span>}
        </label>
        <p className="form-description">{info}</p>
        <TagType
          placeholder={name}
          className={`${className}${validClass}`}
          id={id}
          type="text"
          value={value}
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
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
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
  required: PropTypes.bool,
};

Field.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  className: '',
  labelClassName: '',
  value: '',
  id: '',
  name: '',
  textarea: false,
  invalid: false,
  validString: '',
  outerClassName: 'form-group',
  info: '',
  required: false,
};

export default Field;
