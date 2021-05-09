
import React from 'react'

import { Col, Row } from '@themesberg/react-bootstrap'
import { PageTemplate } from '../../components/PageTemplate'
import { ProfileCard } from "../../components/profile/ProfileCard"
import { ProfileTabs } from '../../components/profile/ProfileTabs'
import { getUser } from '../../util/database/userUtil'

const UserProfile = (props) => {

    return (
        <PageTemplate user={props.user}>
            <div className="py-4">
                <Row>
                    <Col xs={12} xl={3}>
                        <ProfileCard userInformation={props.user} />
                    </Col>
                    <Col xs={12} xl={8}>
                        <ProfileTabs user={props.user}/>
                    </Col>
                </Row>   
            </div>
        </PageTemplate>
    );
};

export async function getServerSideProps(context) {

    return await getUser(context.params.userID)
        .then((data) => {

            // TODO: Change this later - Used to parse decimal for now
            data = JSON.parse(JSON.stringify(data))

            if (!data) {
                return {
                    notFound: true
                }
            }

            return {
                props: {
                    user: data
                }
            }

        })
        .catch(() => {
            return {
                props: {}
            }
        })
}
  

export default UserProfile