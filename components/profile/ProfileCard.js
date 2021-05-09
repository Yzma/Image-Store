
import React from "react";
import { Card } from '@themesberg/react-bootstrap';

import DefaultProfilePicture from "../../public/assets/img/team/profile-picture-1.jpg";

export const ProfileCard = (props) => {

    const { name, balance, image } = props.userInformation;

    return (
      <Card border="light" className="text-center p-0 mb-4">
        <div className="profile-cover rounded-top" />
        <Card.Body className="pb-5">
          <Card.Img src={image ? image : DefaultProfilePicture} alt="Default Image" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle>{balance}</Card.Subtitle>
        </Card.Body>
      </Card>
    );
  };