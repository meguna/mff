import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import alertCircle from '../../../assets/icons/alert-circle.svg';

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
    } = this.props;

    const TagType = (textarea !== 'notes') ? 'input' : 'textarea';
    const validClass = invalid ? 'invalid' : '';

    return (
      <div className="form-group">
        <label htmlFor={id} className={labelClassName}>
          {name}
        </label>
        <TagType
          placeholder={name}
          className={`${className} ${validClass}`}
          id={id}
          type="text"
          value={value}
          onChange={this.handleChange}
          onBlur={onBlur}
        />
        {invalid && (
          <p className="error-msg">
            <img className="alert-symbol" src={alertCircle} alt="alert-symbol" />
            {validString}
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
};

export default Field;
