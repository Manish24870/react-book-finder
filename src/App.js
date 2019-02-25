import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";

import Books from "./components/books/Books";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" component={Books} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
