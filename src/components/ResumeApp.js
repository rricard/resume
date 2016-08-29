/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Card,
  Spinner,
} from 'elemental';
import gql from 'graphql-tag';
import { fetchData } from '../actions';
import '../styles/ResumeApp.css';
import type { DataState } from '../reducer/data';
import type { Map } from 'immutable';

export type AppProps = {
};

const RESUME_QUERY = gql`
  {
    basics {
      name
    }
  }
`;

const ResumeApp = (
  props: AppProps&{
    dataState: DataState,
    requestData: (lang?: string) => Promise<any>,
  }
) => {
  const { dataState, requestData } = props;
  const loading = dataState.get('loading');
  const data: ?Map<string, any> = dataState.get('data');
  if(!loading && !data) {
    window.requestAnimationFrame(() => requestData(RESUME_QUERY));
  }
  return (
    <Container className="ResumeApp_mainContainer">
      {loading ? <Spinner size="lg" /> : null}
      {data ?
        <Card className="ResumeApp_card">
          <pre>{JSON.stringify(data.toJS(), null, ' ')}</pre>
        </Card>
        : null}
      
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
