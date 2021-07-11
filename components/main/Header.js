import React from "react";
import { signIn, signOut, useSession } from 'next-auth/client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserCircle, faCog, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Nav, Button, Navbar, Dropdown, Form, InputGroup } from '@themesberg/react-bootstrap';

import Image from 'next/image'

// TODO: Correct button links when other pages are implemented

// TODO: Should we use the Next Image component for the user profile icon? 
// Its a very small image and Next doesn't seem to cache it, so we need to fetch it every time we reload the page

export const Header = (props) => {
  const [session, loading] = useSession()

  return (
    <>

      {/* Desktop Navbar */}
      <div className="d-none d-lg-block">
        <Navbar className="px-3" collapseOnSelect expand="lg" bg="dark" variant="dark">

          <Navbar.Brand href="#home">Image-Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">

            <Nav className="me-auto">
              <Form className="navbar-search">
                <Form.Group id="topbarSearch">
                  <InputGroup className="input-group-merge search-bar">
                    <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                    <Form.Control type="text" placeholder="Search" />
                  </InputGroup>
                </Form.Group>
              </Form>
            </Nav>

            <Nav>
              {(loading || !session) ?
                <Button onClick={() => signIn()} variant="outline-dark" className="ms-3">Sign In</Button>
                :
                <>
                  <Dropdown as={Nav.Item} className="pe-2 align-self-center">
                    <Dropdown.Toggle as={Nav.Link} className="notification-bell">
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
                        <Image className="user-avatar md-avatar rounded-circle" src={session.user.image} layout="fixed" width={40} height={40} />
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
          </Navbar.Collapse>
        </Navbar>
      </div>

      {/* Mobile Navbar */}

      <div className="d-lg-none">

        <Navbar className="px-3" collapseOnSelect expand="lg" bg="dark" variant="dark">

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand href="#home">Image-Store</Navbar.Brand>

          <Nav>
            {(loading || !session) ?
              <Button onClick={() => signIn()} variant="outline-dark" className="ms-3">Sign In</Button>
              :
              <>
                <Dropdown as={Nav.Item}>
                  <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
                    <div className="media d-flex align-items-center">
                      <Image className="user-avatar md-avatar rounded-circle" src={session.user.image} layout="fixed" width={40} height={40} />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="user-dropdown dropdown-menu-end mt-2" style={{ position: "absolute" }}>

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

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#features">Create Post</Nav.Link>
              <Nav.Link href="#features">Create Collection</Nav.Link>
              <Form className="navbar-search">
                <Form.Group id="topbarSearch">
                  <InputGroup className="input-group-merge search-bar">
                    <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                    <Form.Control type="text" placeholder="Search" />
                  </InputGroup>
                </Form.Group>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>

    // USE THIS ONE - MOBILE NAVBAR

    /*
    <Navbar className="px-3" collapseOnSelect expand="lg" bg="dark" variant="dark">
    
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Brand href="#home">Image-Store</Navbar.Brand>
    
    <Nav>
      {(loading || !session) ?
        <Button onClick={() => signIn()} variant="outline-dark" className="ms-3">Sign In</Button>
        :
        <>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
              <div className="media d-flex align-items-center">
                <Image className="user-avatar md-avatar rounded-circle" src={session.user.image} layout="fixed" width={40} height={40} />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="user-dropdown dropdown-menu-end mt-2" style={{ position: "absolute" }}>
    
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
    
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav>
        <Nav.Link href="#features">Create Post</Nav.Link>
        <Nav.Link href="#features">Create Collection</Nav.Link>
        <Form className="navbar-search">
          <Form.Group id="topbarSearch">
            <InputGroup className="input-group-merge search-bar">
              <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Form.Group>
        </Form>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
    
    
    /////////////////////// - END
    
    
    
    
    
    
    // USE THIS ONE - DESKTOP NAVBAR
    
    /* <Navbar className="px-3" collapseOnSelect expand="lg" bg="dark" variant="dark">
    
    <Navbar.Brand href="#home">Image-Store</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    
      <Nav className="me-auto">
        <Form className="navbar-search">
          <Form.Group id="topbarSearch">
            <InputGroup className="input-group-merge search-bar">
              <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
              <Form.Control type="text" placeholder="Search" />
            </InputGroup>
          </Form.Group>
        </Form>
      </Nav>
    
      <Nav>
        {(loading || !session) ?
          <Button onClick={() => signIn()} variant="outline-dark" className="ms-3">Sign In</Button>
          :
          <>
            <Dropdown as={Nav.Item} className="pe-2 align-self-center">
              <Dropdown.Toggle as={Nav.Link} className="notification-bell">
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
                  <Image className="user-avatar md-avatar rounded-circle" src={session.user.image} layout="fixed" width={40} height={40} />
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
    </Navbar.Collapse>
    </Navbar> */



    ///////////////////////////// END




    // <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="px-3">
    //   <div clasName="d-flex justify-content-between w-100">

    //     <div>
    //       <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //     </div>

    //     {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}


    //     <Form className="navbar-search">
    //       <Form.Group id="topbarSearch">
    //         <InputGroup className="input-group-merge search-bar">
    //           <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
    //           <Form.Control type="text" placeholder="Search" />
    //         </InputGroup>
    //       </Form.Group>
    //     </Form>


    //     <Nav>

    //       {(loading || !session) ?
    //         <Button onClick={() => signIn()} variant="outline-dark" className="ms-3">Sign In</Button>
    //         :
    //         <>
    //           <Dropdown as={Nav.Item} className="pe-2">
    //             <Dropdown.Toggle as={Nav.Link} className="notification-bell d-flex align-items-center">
    //               <span className="icon icon-sm ">
    //                 <FontAwesomeIcon icon={faPlus} className="bell-shake" />
    //               </span>
    //             </Dropdown.Toggle>
    //             <Dropdown.Menu className="user-dropdown dropdown-menu-end mt-2">

    //               <Dropdown.Item className="fw-bold">
    //                 Upload Image
    //               </Dropdown.Item>

    //               <Dropdown.Item className="fw-bold">
    //                 Create Collection
    //               </Dropdown.Item>

    //             </Dropdown.Menu>
    //           </Dropdown>

    //           <Dropdown as={Nav.Item}>
    //             <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0">
    //               <div className="media d-flex align-items-center">
    //                 <Image className="user-avatar md-avatar rounded-circle" src={session.user.image} layout="fixed" width={40} height={40} />
    //               </div>
    //             </Dropdown.Toggle>
    //             <Dropdown.Menu className="user-dropdown dropdown-menu-end mt-2">

    //               <Dropdown.Item disabled={true} className="fw-bolder">
    //                 {session.user.email || session.user.name}
    //               </Dropdown.Item>

    //               <Dropdown.Divider />

    //               <Dropdown.Item className="fw-bold" href={`/users/${session.user.id}`}>
    //                 <FontAwesomeIcon icon={faUserCircle} className="me-2" />Profile
    //               </Dropdown.Item>

    //               <Dropdown.Item className="fw-bold">
    //                 <FontAwesomeIcon icon={faCog} className="me-2" />Settings
    //               </Dropdown.Item>

    //               <Dropdown.Divider />

    //               <Dropdown.Item className="fw-bold" onClick={() => signOut()}>
    //                 <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Logout
    //               </Dropdown.Item>

    //             </Dropdown.Menu>
    //           </Dropdown>
    //         </>
    //       }
    //     </Nav>

    //   </div>


    //   {/* 
    //   <div className="d-flex justify-content-between">

    //       <Nav className="icon icon-sm">
    //         <Button variant="success" className="me-2">
    //           <FontAwesomeIcon icon={faPlus} className="me-1" /> Upload Images
    //         </Button>
    //       </Nav>


    //       <Form className="d-flex">
    //         <FormControl
    //           type="search"
    //           placeholder="Search"
    //           className="mr-2"
    //           aria-label="Search"
    //         />
    //         <Button variant="outline-success">Search</Button>
    //       </Form>

    //   </div>
    //  */}


    //   {/* <Navbar.Collapse id="responsive-navbar-nav">
    //     <Nav className="me-auto justify-content-end">
    //       <Nav.Link href="#features">Features</Nav.Link>
    //       <Nav.Link href="#pricing">Pricing</Nav.Link>
    //       <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
    //         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
    //         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //         <NavDropdown.Divider />
    //         <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    //       </NavDropdown>
    //     </Nav>
    //     <Nav>
    //       <Nav.Link href="#deets">More deets</Nav.Link>
    //       <Nav.Link eventKey={2} href="#memes">
    //         Dank memes
    //       </Nav.Link>
    //     </Nav>
    //   </Navbar.Collapse> */}


    // </Navbar>
  );
};




{/* <>
<Navbar collapseOnSelect className="px-4 d-flex justify-content-between" expand="md" bg="dark" variant="dark">
  <Navbar.Brand href="/">
    <Image className="d-inline-block align-top" src={ImageStoreIcon} width={60} height={60} />
  </Navbar.Brand>


    <Nav className="icon icon-sm">
      <Button variant="success" className="me-2">
        <FontAwesomeIcon icon={faPlus} className="me-1" /> Upload Images
      </Button>
    </Nav>

    <Form className="d-flex">
      <FormControl
        type="search"
        placeholder="Search"
        className="mr-2"
        aria-label="Search"
      />
      <Button variant="outline-success">Search</Button>
    </Form>

    {(loading || !session) ?
      <Button onClick={() => signIn()} variant="outline-dark" className="ms-3">Sign In</Button>
      :
      <>
        {/* <Dropdown as={Nav.Item} className="pe-2">
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
              <Image className="user-avatar md-avatar rounded-circle" src={session.user.image} layout="fixed" width={40} height={40} />
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


    



  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">

   
  </Navbar.Collapse>
</Navbar>
</> */}