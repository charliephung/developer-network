import React, { Component } from "react";
import PropTypes from "prop-types";

class SocialLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    iconClass: PropTypes.string,
    iconStyle: PropTypes.object,
    children: PropTypes.string.isRequired
  };

  render() {
    const { to, children } = this.props;
    let iconClass = "";
    let iconStyle = {};
    switch (children) {
      case "facebook":
        iconClass = "fab fa-2x fa-facebook";
        iconStyle = { color: "#3b5998" };
        break;
      case "twitter":
        iconClass = "fab fa-2x fa-twitter-square";
        iconStyle = { color: "#00aced" };
        break;
      case "instagram":
        iconClass = "fab fa-2x fa-instagram";
        iconStyle = { color: "#cd486b" };
        break;
      case "linkedin":
        iconClass = "fab fa-2x fa-linkedin";
        iconStyle = { color: "#007bb6" };
        break;
      case "youtube":
        iconClass = "fab fa-2x fa-youtube-square";
        iconStyle = { color: "#bb0000" };
        break;
      default:
        break;
    }

    return (
      <a href={to}>
        <i style={iconStyle} className={`${iconClass} mr-2 `} />
        {to}
      </a>
    );
  }
}

export default SocialLink;
