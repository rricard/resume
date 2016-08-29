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
import {mergeDocumentDefinitions} from '../lib/graphqlTooling';
import ProfileHeader, {profileFragment} from './ProfileHeader';
import '../styles/ResumeApp.css';
import type { DataState } from '../reducer/data';
import type { Map } from 'immutable';
import type { GraphQLDocument } from '../lib/graphqlTooling';

export type AppProps = {
};

const RESUME_QUERY = mergeDocumentDefinitions(gql`
  {
    basics {
      ...Profile
    }
    skills {
      ...ProfileSkills
    }
  }
`, profileFragment);

const ResumeApp = (
  props: AppProps&{
    dataState: DataState,
    requestData: (query: GraphQLDocument, vars?: any, lang?: string) => Promise<any>,
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
        <ProfileHeader basics={data.get('basics')} skills={data.get('skills')} /> :
        null}
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
