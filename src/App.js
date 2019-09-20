import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
//theme
import themeCss from "./util/theme";
//axios
import axios from 'axios';
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import {SET_AUTHENTICATED }  from './redux/types';
import  {logoutUser, getUserData} from './redux/actions/userActions';
//jwt decode
import jwtDecode from "jwt-decode";

// pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
//components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

const theme = createMuiTheme(themeCss);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = "/login";
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/login"
                component={login}
            
              />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
          
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
