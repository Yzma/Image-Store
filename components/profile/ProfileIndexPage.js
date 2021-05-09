import React from 'react';

import { Col, Row } from '@themesberg/react-bootstrap';
import { PageTemplate } from '../PageTemplate'
import { ProfileCard } from "./ProfileCard";
import { ProfileTabs } from './ProfileTabs'

export const ProfileIndexPage = (props) => {

  return (
    <PageTemplate>
      <div className="py-4">
        <Row>
          <Col xs={12} xl={3}>
            <ProfileCard userInformation={props.user} />
          </Col>
          <Col xs={12} xl={8}>
            <ProfileTabs user={props.user} images={props.images}/>
          </Col>
        </Row>   
      </div>
    </PageTemplate>
  )
}
