import React, {useState} from 'react';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, ButtonDropdown, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {logout, openModal} from "../Login/redux/actions";
import {connect} from "react-redux";
import TripChooserModal from "../TripBanner/TripChooser/TripChooserModal";
import TripsModal from "./Trips/TripsContainer";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {withRouter} from "react-router";
import Button from "reactstrap/es/Button";

const Navigation = ({isUserLoggedIn, openLoginModal, username, logout, history}) => {

    const [isOpen, setIsOpen] = useState(false);
    const [showTripsModal, setShowTripsModal] = useState(false);

    const toggleButton = () => setIsOpen(!isOpen);

    let toggleNavItem;

    //if user is not logged in we see "Login" button otherwise "Profile".
    if (isUserLoggedIn) {
        toggleNavItem =
            <NavItem>
                <ButtonDropdown isOpen={isOpen} toggle={toggleButton}>
                    <DropdownToggle>
                        <Button>{username}</Button>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => history.push("/profile")}>Profile</DropdownItem>
                        <DropdownItem onClick={() => history.push("/trips")}>Show my trips</DropdownItem>
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
                <Nav>
                    {toggleNavItem}
                </Nav>
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
const DefaultApp = withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
export default DefaultApp;