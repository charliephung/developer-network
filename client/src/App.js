import React, { Component } from "react";
import routes from "./routes";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Switch, BrowserRouter as Router } from "react-router-dom";
// Test
import "./App.css";
import ProfilePage from "./pages/ProfilePage";

// Load Private Route
import PrivateRoute from "./components/common/PrivateRoute";
import PropsRoute from "./components/common/PropsRoute";

class App extends Component {
  showContent = r => {
    let result = null;
    if (r.length > 0) {
      result = r.map((ele, index) => {
        // Change to private route if route has field private
        if (ele.private) {
          return (
            <PrivateRoute
              key={index}
              exact={ele.exact}
              path={ele.path}
              component={ele.main}
            />
          );
        }
        return (
          <PropsRoute
            key={index}
            exact={ele.exact}
            path={ele.path}
            component={ele.main}
          />
        );
      });
    }

    // Switch case routes
    return <Switch>{result}</Switch>;
  };

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className="container">
            <br />
            {this.showContent(routes)}
            <br />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
