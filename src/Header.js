import React from 'react';

import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar inverse fixedTop>
        
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">
              Disclose
            </a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem
              eventKey={1}
              href="#">
              About
            </NavItem>
            <NavItem
              eventKey={2}
              href="#">
              Cases
            </NavItem>
            <NavItem
              eventKey={3}
              href="#">
              User
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

    );
  }
}


export default Header;