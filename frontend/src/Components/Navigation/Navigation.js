import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import {openModal} from "../Layout/redux/actions";
import {connect} from "react-redux";

const Navigation = ({isUserLoggedIn, openLoginModal}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    let toggleNavItem;

    //if user is not logged in we see "Login" button otherwise "Profile".
    if (isUserLoggedIn) {
        toggleNavItem = <NavItem>
            <NavLink onClick={openLoginModal}>Login</NavLink>
        </NavItem>
    } else {
        toggleNavItem = <NavItem>
            <NavLink>Profile</NavLink>
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
        </div>
    );
};

//dispatch will move the provided action dict (result of login(token))
// to the global state and will run the reducer with the provided action
const mapDispatchToProps = (dispatch) => {
    return {
        openLoginModal: () => dispatch(openModal())
    }
};

//map the global state to properties that are passed into the comp
const mapStateToProps = (state) => {
    return {
        isUserLoggedIn: state.LoginReducer.loggedIn,
    }
};

//next line ensures that the properties from the 2 passed functions are passed to Login comp
const DefaultApp = connect(mapStateToProps, mapDispatchToProps)(Navigation);
export default DefaultApp;