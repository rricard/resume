/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import {
  Row,
  Col,
  Glyph,
  Card,
  Button,
} from 'elemental';
import WorkExperience, {workExperienceFragment} from './WorkExperience';
import AcademicExperience, {academicExperienceFragment} from './AcademicExperience';
import {mergeDocumentDefinitions} from '../lib/graphqlTooling';
import '../styles/Timeline.css';
import type {Map, List} from 'immutable';

type TimelineProps = {
  work: List<Map<string, any>>,
  education: List<Map<string, any>>,
};

export const timelineFragment = mergeDocumentDefinitions(gql`
  fragment WorkTimeline on Work {
    startDate
    ...WorkExperience
  }
  fragment AcademicTimeline on Education {
    startDate
    ...AcademicExperience
  }
`, workExperienceFragment, academicExperienceFragment);

const AVAIL = '☀️ Summer 2017';

const onHireIntent = () => {
  window.location = "mailto:rricard@gatech.edu";
};

const Timeline = (props: TimelineProps): ?React.Element<*> => {
  const {work, education} = props;
  return (
    <div>
      <Row>
        <Col className="Timeline_chevron">
          <Glyph icon="chevron-up" />
        </Col>
      </Row>
      <Row>
        <Col md="1/2" className="Timeline_leftcol">
          <h2 className="Timeline_header"><Glyph icon="briefcase" /> Work</h2>
          {AVAIL ?
            <Card className="Timeline_availability">
              <Row>
                <Col xs="1/2">
                  <strong>Available</strong> starting<br />
                  <strong>{AVAIL}</strong>
                </Col>
                <Col xs="1/2">
                  <Button type="success" onClick={onHireIntent}>
                    Get in touch! <Glyph icon="check" />
                  </Button>
                </Col>
              </Row>
            </Card> :
            null}
          {work.map(work =>
            <WorkExperience key={work.get('startDate')} work={work} />)}
        </Col>
        <Col md="1/2" className="Timeline_rightcol">
          <h2 className="Timeline_header"><Glyph icon="mortar-board" /> Academic</h2>
          {education.map(education =>
            <AcademicExperience key={education.get('startDate')} education={education} />)}
        </Col>
      </Row>
      <Row>
        <Col className="Timeline_chevron">
          Time
        </Col>
      </Row>
    </div>
  );
};

export default Timeline;
