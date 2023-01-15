import React, { Component } from 'react';

import './app.scss';

export default class App extends Component {
  state = {
    text: 'this is TypeScript app',
  };

  render() {
    const { text } = this.state;

    return <div className="app">{text}</div>;
  }
}
