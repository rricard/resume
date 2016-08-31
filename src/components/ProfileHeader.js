/* @flow */

import React from 'react';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
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
  keywordsRegex: RegExp,
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

const ProfileHeader = (props: ProfileHeaderProps): ?React.Element<*> => {
  const {basics, skills, keywordsRegex} = props;
  return (
    <Card className="ProfileHeader_container">
      <Row>
        {window.location.search !== '?nopic' ?
          <Col xs="90px" className="ProfileHeader_picture">
            <img
              alt={basics.get('name')}
              src={basics.get('picture')}
              width={80}
              height={80}
            />
          </Col> :
          null}
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
        <Col md="2/3">
          <p className="ProfileHeader_summary">{basics.get('summary')}</p>
        </Col>
        <Col md="1/3">
          <p>
            <Glyph icon="tag" />
            {skills.flatMap(skillGroup => 
              skillGroup.get('keywords').filter(keyword =>
                keywordsRegex.test(keyword)
              )
            ).join(', ')}
          </p>
        </Col>
      </Row>
      
    </Card>
  )
};

const ProfileHeaderWithState = connect(
  (state) => ({
    keywordsRegex: new RegExp(`(${
      state.get('options').get('keywords').join('|')
    })`, 'i'),
  }),
)(ProfileHeader);

export default ProfileHeaderWithState;
