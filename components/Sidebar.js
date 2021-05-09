
import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faImages, faHandHoldingUsd, faSignOutAlt, faTimes, faHome } from "@fortawesome/free-solid-svg-icons";
import { Nav, Badge, Image, Button, Dropdown, Accordion, Navbar } from '@themesberg/react-bootstrap';

export const Sidebar = (props) => {

  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const NavItem = (props) => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
    const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
    const navItemClassName = "";
    const linkProps = { href: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
            {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
        <Navbar.Toggle as={Button} aria-controls="main-navbar" onClick={onCollapse}>
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <Nav.Link className="collapse-close d-md-none" onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0">
              <NavItem title="Home" icon={faHome} link={props.user ? `/users/${props.user.id}` : '/home'}/>
              <NavItem title="Search Images" icon={faImages} link={'/images'}/>

              <Dropdown.Divider className="my-3 border-indigo" />
              
              <NavItem title="Manage Balance" icon={faHandHoldingUsd} link={'/managebalance'}/>

              <Dropdown.Divider className="my-3 border-indigo" />

              <NavItem external title="GitHub Repo" link="https://github.com/Yzma/Shopify-Backend-Internship-Challenge" target="_blank" icon={faGithub} />

            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};
