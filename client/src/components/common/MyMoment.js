import React, { Component } from "react";
import Moment from "react-moment";
// Proptype
import PropTypes from "prop-types";

class MyMoment extends Component {
  static propTypes = {
    date: PropTypes.string.isRequired
  };

  render() {
    const dateToFormat = this.props.date;
    return <Moment format="YYYY/MM/DD">{dateToFormat}</Moment>;
  }
}

export default MyMoment;
