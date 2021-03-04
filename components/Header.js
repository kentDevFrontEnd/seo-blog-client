import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import { isAuth, signout } from "../actions/auth.action";
import { APP_NAME } from "../config";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthLocal, setIsAuthLocal] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isAuth()) {
      setIsAuthLocal(true);
    } else {
      setIsAuthLocal(false);
    }
  }, [isAuth]);

  const handleSignout = () => {
    signout(() => {
      Router.replace("/signin");
    });
  };

  console.log("isAuth", isAuth());

  return (
    <>
      <Navbar color="dark" dark expand="md">
        <Container>
          <Link href="/">
            <a className="navbar-brand">{APP_NAME}</a>
          </Link>
          <NavbarToggler onClick={toggle} />

          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {/* BUG when change ui of header */}
              <NavItem>
                <NavLink href="/blogs">Blogs</NavLink>
              </NavItem>

              {isAuthLocal && (
                <React.Fragment>
                  <NavItem>
                    <a
                      href="#"
                      className="nav-link cursor"
                      onClick={() => {
                        signout(() => {
                          Router.push("/signin");
                        });
                      }}
                    >
                      Signout
                    </a>
                  </NavItem>

                  {isAuth().role === "user" && (
                    <NavItem>
                      <NavLink href="/user">{`${
                        isAuth().name
                      }'s Dashboard`}</NavLink>
                    </NavItem>
                  )}

                  {isAuth().role === "admin" && (
                    <NavItem>
                      <NavLink href="/admin">{`${
                        isAuth().name
                      }'s Dashboard`}</NavLink>
                    </NavItem>
                  )}

                  <NavItem>
                    <NavLink href="https://github.com/kentBui">GitHub</NavLink>
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Options
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>Option 1</DropdownItem>
                      <DropdownItem>Option 2</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Reset</DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </React.Fragment>
              )}
              {!isAuthLocal && (
                <React.Fragment>
                  <NavItem>
                    <Link href="/signin">
                      <a className="nav-link">Signin</a>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link href="/signup">
                      <a className="nav-link">Signup</a>
                    </Link>
                  </NavItem>
                </React.Fragment>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      <style jsx>{`
        .cursor {
          cursor: "pointer";
        }
      `}</style>
    </>
  );
};

export default Header;
