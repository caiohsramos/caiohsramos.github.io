import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Main from "./containers/Main";
import BlogPost from "./containers/blogPost/BlogPost";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/blog/:id" component={BlogPost} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
