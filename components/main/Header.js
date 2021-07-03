import React from "react";
import { signIn, signOut, useSession } from 'next-auth/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle, faCog, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Nav, Button, Navbar, Dropdown, Container } from '@themesberg/react-bootstrap';

import Image from 'next/image'

import ImageStoreIcon from "public/assets/img/icons/IS.svg";

// TODO: Correct button links when other pages are implemented

// TODO: Should we use the Next Image component for the user profile icon? 
// Its a very small image and Next doesn't seem to cache it, so we need to fetch it every time we reload the page

export const Header = (props) => {
  const [session, loading] = useSession()

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-2">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Image src={ImageStoreIcon} width={55} height={80}/>
          </div>

          <Nav className="align-items-center">
            {(loading || !session) ? 
                <Button onClick={() => signIn()} variant="outline-dark" className="ms-3">Sign In</Button>
              : 
              <>
                <Dropdown as={Nav.Item} className="pe-2">
                  <Dropdown.Toggle as={Nav.Link} className="text-dark notification-bell">
                    <span className="icon icon-sm">
                      <FontAwesomeIcon icon={faPlus} className="bell-shake" />
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="user-dropdown dropdown-menu-end mt-2">

                    <Dropdown.Item className="fw-bold">
                      Upload Image
                    </Dropdown.Item>

                    <Dropdown.Item className="fw-bold">
                      Create Collection
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                    <div className="media d-flex align-items-center">
                     <Image className="user-avatar md-avatar rounded-circle" src={session.user.image} layout="fixed" width={40} height={40} priority={true} />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="user-dropdown dropdown-menu-end mt-2">

                    <Dropdown.Item disabled={true} className="fw-bolder">
                      {session.user.email || session.user.name}
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item className="fw-bold" href={`/users/${session.user.id}`}>
                      <FontAwesomeIcon icon={faUserCircle} className="me-2" />Profile
                    </Dropdown.Item>

                    <Dropdown.Item className="fw-bold">
                      <FontAwesomeIcon icon={faCog} className="me-2" />Settings
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item className="fw-bold" onClick={() => signOut()}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
              </>
            }
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
