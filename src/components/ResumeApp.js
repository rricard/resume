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
import Timeline, {timelineFragment} from './Timeline';
import '../styles/ResumeApp.css';
import type { DataState } from '../reducer/data';
import type { Map } from 'immutable';

export type ResumeAppProps = {
};

type ConnectedResumeAppProps = ResumeAppProps&{
  dataState: DataState,
  requestData: Function,
  setKeywords: Function
};

const RESUME_QUERY = mergeDocumentDefinitions(gql`
  {
    basics {
      ...Profile
    }
    skills {
      ...ProfileSkills
    }
    work {
      ...WorkTimeline
    }
    education {
      ...AcademicTimeline
    }
  }
`, profileFragment, timelineFragment);

class ResumeApp extends React.Component {
  props: ConnectedResumeAppProps;
  _hashChangeHandler: ?Function;

  render(): ?React.Element<*> {
    const { dataState } = this.props;
    const loading = dataState.get('loading');
    const data: ?Map<string, any> = dataState.get('data');
    return (
      <Container className="ResumeApp_mainContainer">
        {loading ? <Spinner size="lg" /> : null}
        {data ? 
          <ProfileHeader basics={data.get('basics')} skills={data.get('skills')} /> :
          null}
        {data ?
          <Timeline work={data.get('work')} education={data.get('education')} /> :
          null}
        {data && window.location.search === '?debug' ?
          <Card className="ResumeApp_debug">
            <pre>{JSON.stringify(data.toJS(), null, ' ')}</pre>
          </Card>
          : null}
        
      </Container>
    );
  }

  componentDidMount() {
    this._dataRefresh();
    this._hashChangeHandler = this._dataRefresh.bind(this);
    window.addEventListener('hashchange', this._hashChangeHandler);
  }

  componentWillUnmount() {
    if (this._hashChangeHandler) {
      window.removeEventListener('hashchange', this._hashChangeHandler);
    }
  }

  _dataRefresh() {
    const { requestData, setKeywords } = this.props;
    requestData();
    const keywords = window.location.hash;
    if (keywords) {
      setKeywords(keywords.slice(1).split(','));
    }
  }
}

const ResumeAppWithState = connect(
  (state) => {
    const dataState = state.get('data');
    return {
      dataState,
    };
  },
  (dispatch) => {
    return {
      requestData: (lang: string = window.location.search === '?fr' ? 'fr' : 'en') =>
        dispatch(fetchData(RESUME_QUERY, {}, lang)),
      setKeywords: (keywords: Array<string>) => 
        dispatch(setPreferredKeywords({keywords})),
    };
  },
)(ResumeApp);

export default ResumeAppWithState;
