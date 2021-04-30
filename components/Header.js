
import React from "react";
import { signIn, signOut, useSession } from 'next-auth/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Nav, Button, Image, Navbar, Dropdown, Container } from '@themesberg/react-bootstrap';

import Profile3 from "../public/assets/img/team/profile-picture-3.jpg";

export const Header = (props) => {
  const [ session, loading ] = useSession()

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-end w-100">
          <Nav className="align-items-right">
            {!session ? (
                <Button onClick={() => signIn("github")} variant="outline-dark" className="ms-3">Sign In</Button>
              ) : (
              <>
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                    <div className="media d-flex align-items-center">
                      <Image src={session.user.image} className="user-avatar md-avatar rounded-circle" />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="user-dropdown dropdown-menu-end mt-2">

                    <Dropdown.Item className="fw-bolder">
                      {session.user.email || session.user.name}
                    </Dropdown.Item>

                    <Dropdown.Divider />
                      <Dropdown.Item className="fw-bold">
                        Your Profile
                      </Dropdown.Item>
                      <Dropdown.Item className="fw-bold">
                        Your Images
                      </Dropdown.Item>
                      <Dropdown.Item className="fw-bold">
                        Your Money
                      </Dropdown.Item>
                    <Dropdown.Divider />

                    <Dropdown.Item className="fw-bold" onClick={() => signOut()}>
                      <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2"/> Logout
                    </Dropdown.Item>
                    
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
