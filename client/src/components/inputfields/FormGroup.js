import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Load isempty
import isEmpty from '../../utils/isEmpty';

export class FormGroup extends Component {
    static propTypes = {
        outterClass: PropTypes.string,
        labelFor: PropTypes.string,
        labelClass: PropTypes.string,
        labelName: PropTypes.string,
        innerClass: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array
        ]),
        bottomTextClass: PropTypes.string,
        bottomText: PropTypes.string,
        invalidText: PropTypes.string
    }

    static defaultProps = {
        outterClass: "form-group row",
        labelClass: "col-2 col-form-label text-muted font-weight-bold",
        innerClass: "col-10",
        bottomTextClass: "form-text text-muted",
        invalidText: ""
    }

    render() {
        const { outterClass, labelFor,
            labelClass, labelName, innerClass,
            bottomTextClass, bottomText, invalidText } = this.props;
        return (
            <div className={outterClass}>
                <label htmlFor={labelFor}
                    className={labelClass}>
                    {labelName}
                </label>
                <div className={innerClass}>
                    {this.props.children}
                    <small id={labelFor}
                        className={isEmpty(invalidText)
                            ? bottomTextClass
                            : "form -text text-danger"
                        }
                    >
                        {isEmpty(invalidText)
                            ? bottomText
                            : invalidText
                        }
                    </small>
                </div>
            </div>
        )
    }
}


export default FormGroup;
