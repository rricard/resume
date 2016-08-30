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
import {mergeDocumentDefinitions} from '../lib/graphqlTooling';
import '../styles/Timeline.css';
import type {Map, List} from 'immutable';

type TimelineProps = {
  work: List<Map<string, any>>,
};

export const timelineFragment = mergeDocumentDefinitions(gql`
  fragment WorkTimeline on Work {
    startDate
    ...WorkExperience
  }
`, workExperienceFragment);

const AVAIL = '☀️Summer 2017';

const onHireIntent = () => {
  window.location = "mailto:rricard@gatech.edu";
};

const Timeline = (props: TimelineProps): ?React.Element<*> => {
  const {work} = props;
  return (
    <Row>
      <Col md="1/2" className="Timeline_leftcol">
        <h2 className="Timeline_header"><Glyph icon="briefcase" /> Work</h2>
        {AVAIL ?
          <Card>
            <Row>
              <Col xs="1/2">
                <strong>Available</strong> starting<br />
                <strong>{AVAIL}</strong>
              </Col>
              <Col xs="1/2">
                <Button type="success" onClick={onHireIntent}>
                  Hire Me! <Glyph icon="check" />
                </Button>
              </Col>
            </Row>
          </Card> :
          null}
        {work.map(work =>
          <WorkExperience key={work.get('startDate')} work={work} />)}
      </Col>
      <Col md="1/2">
        <h2 className="Timeline_header"><Glyph icon="mortar-board" /> Academic</h2>
      </Col>
    </Row>
  );
};

export default Timeline;
