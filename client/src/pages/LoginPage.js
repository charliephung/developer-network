import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Actions from '../actions/actAuth';
import InputField from "../components/inputfields/InputField";
import { withRouter } from 'react-router-dom'

export class LoginPage extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            errors: {}
        }
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
        this.setState({ errors: {} });
        this.setState({ errors: nextProps.errors });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.actLoginUser(userData, this.props.history)
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <legend>Login</legend>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <InputField
                        id="email"
                        placeholder="Enter email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                    />
                    {errors && errors.email ?
                        <p className="text-danger">{errors.email}</p>
                        : ""
                    }
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <InputField
                        type="password"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                    {errors && errors.password ?
                        <p className="text-danger">{errors.password}</p>
                        : ""
                    }
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

LoginPage.prototypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    actLoginUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

const mapDispatchToProps = {
    actLoginUser: Actions.actLoginUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
