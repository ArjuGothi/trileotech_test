import React from "react";
import "./App.css";
import SigninWrapper from "./pages/signin/signin";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import RouterPage from "./pages/modules/router";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={SigninWrapper} />
          <Route path="/pages" component={RouterPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
