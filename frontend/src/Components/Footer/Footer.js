import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Container} from "reactstrap";
import './Footer.scss';


const Footer = (props) => {
    return (
        <Container fluid={true} id={"footer-container"}>
            <footer>
                <div>
                    <ul
                        className={'text-default'}>
                        <li>
                            <a href="https://github.com/Itamichan/Japan-Wanderlust" rel='noreferrer noopener'
                               target="_blank">
                                <FontAwesomeIcon size={"lg"} icon={['fab', 'github']}/>
                            </a>
                        </li>
                        <li>
                            <a href="mailto:cristinagarbuz@gmail.com" rel='noreferrer noopener' target="_blank">
                                <FontAwesomeIcon size={"lg"} icon='envelope'/>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/cristina-garbuz-65aabb105/" rel='noreferrer noopener'
                               target="_blank">
                                <FontAwesomeIcon size={"lg"} icon={['fab', 'linkedin']}/>
                            </a>
                        </li>
                    </ul>
                </div>
                <div> &copy; 2020</div>
            </footer>
        </Container>
    )
};

export default Footer;