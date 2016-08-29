/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import type {Map, List} from 'immutable';
import {
  Card,
  Row,
  Col,
  Glyph,
} from 'elemental';
import '../styles/ProfileHeader.css';

type ProfileHeaderProps = {
  basics: Map<string, any>,
  skills: List<Map<string, any>>,
};

export const profileFragment = gql`
  fragment Profile on Basics {
    name
    label
    picture
    summary
    website
    email
    phone
    profiles {
      network
      username
      url
    }
  }
  fragment ProfileSkills on Skills {
    keywords
  }
`;

const KEY_FILTER = /(js|ql|es|react|script|apollo)/i;

const ProfileHeader = (props: ProfileHeaderProps): ?React.Element<*> => {
  const {basics, skills} = props;
  return (
    <Card className="ProfileHeader_container">
      <Row>
        <Col xs="90px" className="ProfileHeader_picture">
          <img alt={basics.get('name')} src={basics.get('picture')} />
        </Col>
        <Col xs="auto">
          <hgroup>
            <h1 className="ProfileHeader_name">{basics.get('name')}</h1>
            <p className="ProfileHeader_label">{basics.get('label')}</p>
          </hgroup>
        </Col>
        <Col md="5/20">
          <p className="ProfileHeader_socialLink">
            <Glyph icon="link"/>
            <a href={basics.get('website')}> {basics.get('website')}</a>
          </p>
          <p className="ProfileHeader_socialLink">
            <Glyph icon="mail"/>
            <a href={`mailto:${basics.get('email')}`}> {basics.get('email')}</a>
          </p>
          <p className="ProfileHeader_socialLink">
            <Glyph icon="device-mobile"/>
            <a href={`tel:${basics.get('phone')}`}> {basics.get('phone')}</a>
          </p>
        </Col>
        <Col md="3/20">
          {basics.get('profiles').map(prof => (
            <p key={prof.get('network')} className="ProfileHeader_socialLink">
              <i className={`icon-${prof.get('network').toLowerCase()}`} />
              <a href={prof.get('url')}> {prof.get('username')}</a>
            </p>
          ))}
        </Col>
      </Row>
      <Row className="ProfileHeader_infoRow">
        <Col md="3/5">
          <p>{basics.get('summary')}</p>
        </Col>
        <Col md="2/5">
          <p>
            <Glyph icon="tag" />
            {skills.flatMap(skillGroup => 
              skillGroup.get('keywords').filter(keyword =>
                KEY_FILTER.test(keyword)
              )
            ).join(', ')}
          </p>
        </Col>
      </Row>
      
    </Card>
  )
};

export default ProfileHeader;
