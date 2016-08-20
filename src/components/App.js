/* @flow */
import React, { Component } from 'react';
import {
  Container,
  Card,
} from 'elemental';
import '../styles/App.css';

class App extends Component {
  render() {
    return (
      <Container className="mainContainer">
        <Card>
          <h1>Robin Ricard's resume</h1>
        </Card>
      </Container>
    );
  }
}

export default App;
