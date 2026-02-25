import type { Component } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Landing from "./routes/Landing";

const App: Component = () => {
  return (
    <Router>
      <Route path="/" component={Landing} />
    </Router>
  );
};

export default App;
