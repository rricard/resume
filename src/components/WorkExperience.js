/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import {
  Card,
} from 'elemental';
import {mergeDocumentDefinitions} from '../lib/graphqlTooling';
import '../styles/Timeline.css';
import type {Map, List} from 'immutable';

type WorkExperienceProps = {
  work: Map<string, any>,
};

export const workExperienceFragment = mergeDocumentDefinitions(gql`
  fragment WorkExperience on Work {
    company
    position
    website
    startDate
    endDate
    summary
    highlights
    talks {
      conference
      date
      subject
    }
  }
`);

const WorkExperience = (props: WorkExperienceProps): ?React.Element<*> => {
  //const {} = props;
  return (
    <Card></Card>
  );
};

export default WorkExperience;
