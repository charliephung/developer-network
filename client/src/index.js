import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import appReducer from "./reducers";

import registerServiceWorker from "./registerServiceWorker";

// Check for token in localstorage
import setAuthToken from "./utils/setAuthToken";
import { actSetCurrentUser, actLogoutUser } from "./actions/actAuth";
import { actClearUserProfile } from "./actions/actProfile";
import jwt_decode from "jwt-decode";

const store = createStore(
  appReducer,
  // Dev tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

// Check for token
if (localStorage.jwtToken) {
  // Set token to header
  setAuthToken(localStorage.jwtToken);
  // decode token for user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // Dispatch act to store
  store.dispatch(actSetCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(actLogoutUser());
    //  Clear current Profile
    store.dispatch(actClearUserProfile());
    // Redirect to login
    window.location.href = "/";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
