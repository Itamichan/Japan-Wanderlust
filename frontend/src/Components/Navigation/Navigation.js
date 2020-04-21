import React, {useState} from 'react';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, ButtonDropdown, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {logout, openModal} from "../Login/redux/actions";
import {connect} from "react-redux";
import TripChooserModal from "../TripBanner/TripChooser/TripChooserModal";

const Navigation = ({isUserLoggedIn, openLoginModal, username, logout}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [showTripsModal, setShowTripsModal] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    let toggleNavItem;

    //if user is not logged in we see "Login" button otherwise "Profile".
    if (isUserLoggedIn) {
        toggleNavItem = <NavItem>
            <ButtonDropdown isOpen={isOpen} toggle={toggle}>
                <DropdownToggle caret>
                    Profile of {username}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => setShowTripsModal(true)}>Show my trips</DropdownItem>
                    <DropdownItem onClick={logout}>Log Out</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        </NavItem>
    } else {
        toggleNavItem = <NavItem>
            <NavLink onClick={openLoginModal}>Login</NavLink>
        </NavItem>
    }

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">JapanWanderlust</NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {toggleNavItem}
                    </Nav>
                </Collapse>
            </Navbar>
            {showTripsModal && <TripsModal close={() => setShowTripsModal(false)}/>}
        </div>
    );
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        openLoginModal: () => dispatch(openModal()),
        logout: () => dispatch(logout())
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.LoginReducer.loggedIn,
        username: state.LoginReducer.username,
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(Navigation);
export default DefaultApp;