/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Card,
  Spinner,
} from 'elemental';
import gql from 'graphql-tag';
import {
  fetchData,
  setPreferredKeywords,
} from '../actions';
import {mergeDocumentDefinitions} from '../lib/graphqlTooling';
import ProfileHeader, {profileFragment} from './ProfileHeader';
import '../styles/ResumeApp.css';
import type { DataState } from '../reducer/data';
import type { Map } from 'immutable';

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
    requestData: Function,
    setKeywords: Function
  }
) => {
  const { dataState, requestData, setKeywords } = props;
  const loading = dataState.get('loading');
  const data: ?Map<string, any> = dataState.get('data');
  if(!loading && !data) {
    // First render hook
    window.requestAnimationFrame(() => {
      requestData();
      const keywords = window.location.hash;
      if (keywords) {
        setKeywords(keywords.slice(1).split(','));
      }
    });
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
    requestData: (lang: string = 'en') =>
      dispatch(fetchData(RESUME_QUERY, {}, lang)),
    setKeywords: (keywords: Array<string>) => 
      dispatch(setPreferredKeywords({keywords})),
  };
};

const ResumeAppWithData = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResumeApp);

export default ResumeAppWithData;
