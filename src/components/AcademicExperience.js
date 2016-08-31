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
import '../styles/AcademicExperience.css';
import type {Map} from 'immutable';

type AcademicExperienceProps = {
  education: Map<string, any>,
};

export const academicExperienceFragment = mergeDocumentDefinitions(gql`
  fragment AcademicExperience on Education {
    institution
    area
    studyType
    logoUrl
    website
    startDate
    endDate
    gpa
    openSource {
      type
      project
      url
    }
    projects
    courses
  }
`);

const AcademicExperience = (props: AcademicExperienceProps): ?React.Element<*> => {
  const {education} = props;
  return (
    <div className="AcademicExperience_container">
      <span className="AcademicExperience_endDate">
        <Glyph icon="arrow-small-left" /> {education.get('endDate')}
      </span>
      <Card className="AcademicExperience_card">
        <Row>
          <Col xs="35px" className="AcademicExperience_picture">
            <img
              alt={education.get('institution')}
              src={education.get('logoUrl')}
              width={35}
              height={35}
            />
          </Col>
          <Col xs="auto">
            <hgroup>
              <h3 className="AcademicExperience_institution">
                <a href={education.get('website')}>{education.get('institution')}</a>
              </h3>
              <p className="AcademicExperience_type">
                {education.get('area')} - {education.get('studyType')}
              </p>
            </hgroup>
          </Col>
        </Row>
        <strong>Grades/GPA: </strong>{education.get('gpa')}
        <ul className="AcademicExperience_points">
          {education.get('openSource').map(proj => proj ?
            <li key={proj.get('url')}>
              <a href={proj.get('url')}>
                <span className="AcademicExperience_open">
                  <Glyph icon="git-pull-request" /> Open Src.
                </span>
                <span> {proj.get('type')}</span> on
                <strong> {proj.get('project')} </strong>
              </a>
            </li> :
            null
          )}
          {education.get('projects').map(proj =>
            <li key={proj}>
              <span className="AcademicExperience_project">
                <Glyph icon="code" /> Project
              </span>
              {' ' + proj}
            </li>
          )}
          {education.get('courses').map(course =>
            <li key={course}>
              <span className="AcademicExperience_course">
                <Glyph icon="repo" /> Course
              </span>
              {' ' + course}
            </li>
          )}
        </ul>
      </Card>
      <span className="AcademicExperience_startDate">
        <Glyph icon="arrow-small-left" /> {education.get('startDate')}
      </span>
    </div>
  );
};

export default AcademicExperience;
