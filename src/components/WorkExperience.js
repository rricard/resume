/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import {
  Card,
  Row,
  Col,
  Glyph,
} from 'elemental';
import {mergeDocumentDefinitions} from '../lib/graphqlTooling';
import '../styles/WorkExperience.css';
import type {Map} from 'immutable';

type WorkExperienceProps = {
  work: Map<string, any>,
};

export const workExperienceFragment = mergeDocumentDefinitions(gql`
  fragment WorkExperience on Work {
    company
    position
    logoUrl
    website
    startDate
    endDate
    summary
    talks {
      conference
      date
      subject
      url
    }
    openSource {
      type
      project
      url
    }
    highlights
  }
`);

const WorkExperience = (props: WorkExperienceProps): ?React.Element<*> => {
  const {work} = props;
  return (
    <div className="WorkExperience_container">
      <span className="WorkExperience_endDate">{work.get('endDate')}</span>
      <Card className="WorkExperience_card">
        <Row>
          <Col xs="35px" className="WorkExperience_picture">
            <img
              alt={work.get('company')}
              src={work.get('logoUrl')}
              width={35}
              height={35}
            />
          </Col>
          <Col xs="auto">
            <hgroup>
              <h3 className="WorkExperience_company">
                <a href={work.get('website')}>{work.get('company')}</a>
              </h3>
              <p className="WorkExperience_position">{work.get('position')}</p>
            </hgroup>
          </Col>
        </Row>
        {work.get('summary')}
        <ul className="WorkExperience_points">
          {work.get('talks').map(talk => talk ?
            <li key={talk.get('url')}>
              <a href={talk.get('url')}>
                <span className="WorkExperience_talk">
                  <Glyph icon="megaphone" /> Talk
                </span>
                <em> {talk.get('subject')}</em> at
                <strong> {talk.get('conference')} </strong>
                in {talk.get('date')}
              </a>
            </li> :
            null
          )}
          {work.get('openSource').map(proj => proj ?
            <li key={proj.get('url')}>
              <a href={proj.get('url')}>
                <span className="WorkExperience_open">
                  <Glyph icon="git-pull-request" /> Open Src.
                </span>
                <span> {proj.get('type')}</span> on
                <strong> {proj.get('project')} </strong>
              </a>
            </li> :
            null
          )}
          {work.get('highlights').map(highlight =>
            <li key={highlight}>
              <span className="WorkExperience_highlight">
                <Glyph icon="eye" /> Highlight
              </span>
              {' ' + highlight}
            </li>
          )}
        </ul>
      </Card>
      <span className="WorkExperience_startDate">{work.get('startDate')}</span>
    </div>
  );
};

export default WorkExperience;
