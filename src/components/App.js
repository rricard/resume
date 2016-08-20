/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Card,
} from 'elemental';
import { fetchData } from '../actions';
import '../styles/App.css';
import type { DataState } from '../reducer/data';

export type AppProps = {
};

class App extends Component {
  props: AppProps&{
    dataState: DataState,
    requestData: (lang?: string) => Promise<any>,
  };

  render() {
    return (
      <Container className="mainContainer">
        <Card>
          <h1>Robin Ricard's resume</h1>
        </Card>
      </Container>
    );
  }

  componentDidMount() {
    this.props.requestData();
  }
}

const mapStateToProps = (state) => {
  const dataState = state.get('data');
  return {
    dataState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestData: (lang: string = 'en') => dispatch(fetchData(lang)),
  };
};

const AppWithData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppWithData;
