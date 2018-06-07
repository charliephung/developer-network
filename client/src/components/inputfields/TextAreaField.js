import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextAreaField extends Component {
    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        name: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        id: PropTypes.string
    }

    static defaultProps = {
        className: "form-control"
    }

    render() {
        const { className, placeholder, name, value, onChange, id } = this.props;
        return (
            <textarea
                className={className}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                id={id}
            />
        )
    }
}


export default TextAreaField
