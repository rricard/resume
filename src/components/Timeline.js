/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import {
  Row,
  Col,
  Glyph,
} from 'elemental';
import '../styles/Timeline.css';
import type {Map, List} from 'immutable';

type TimelineProps = {
  work: List<Map<string, any>>,
};

export const timelineFragment = gql`
  fragment WorkTimeline on Work {
    company
    position
    website
    startDate
    endDate
    summary
    highlights
  }
`;

const Timeline = (props: TimelineProps): ?React.Element<*> => {
  //const {} = props;
  return (
    <Row>
      <Col md="1/2" className="Timeline_leftcol">
        <h2 className="Timeline_header"><Glyph icon="briefcase" /> Work</h2>
      </Col>
      <Col md="1/2">
        <h2 className="Timeline_header"><Glyph icon="mortar-board" /> Academic</h2>
      </Col>
    </Row>
  );
};

export default Timeline;
