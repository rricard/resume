/* @flow */
import React from 'react';
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

const ResumeApp = (
  props: AppProps&{
    dataState: DataState,
    requestData: (lang?: string) => Promise<any>,
  }
) => {
  const { dataState, requestData } = props;
  if(!dataState.get('loading') && !dataState.get('data')) {
    window.requestAnimationFrame(() => requestData());
  }
  return (
    <Container className="mainContainer">
      <Card>
        <h1>Robin Ricard's resume</h1>
      </Card>
    </Container>
  );
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

const ResumeAppWithData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResumeApp);

export default ResumeAppWithData;
