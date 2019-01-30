import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link } from 'react-router-dom';
import SignedInMenu from "../Menus/SignedInMenu";

import { connect } from 'react-redux'

class NavBar extends Component {
  render() {

    const {authenticated}=this.props;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item as={Link} to='/' header>
            <img src="/assets/logo.png" alt="logo" />
            SkoSal
          </Menu.Item>
          
          <Menu.Item as={NavLink} to='/videos' name="Videos" />
          {authenticated && 
          <Menu.Item>
            <Button as={Link} to='/addVideo' floated="right" positive inverted content="Add new video" />
          </Menu.Item>
          }
          <SignedInMenu signOut={this.handleSignOut} />
        </Container>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.isAdmin
  }
}

export default connect(mapStateToProps)(NavBar);
