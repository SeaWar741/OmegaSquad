import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Image,Form,Button,Navbar,Nav,NavDropdown,FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ResponsiveEmbed from 'react-responsive-embed';

import history from "../../history";
import Panel from "../Panel";



const useStyles = makeStyles((theme) =>({
    contentDiv:{
        marginLeft:"1rem",
        backgroundColor:"white",
        padding:"2rem",
        minHeight:"90vh",
    }
}))



const MobileDrawer = ({classes}) =>{
    classes = useStyles();

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">
                    <img
                        src="/img/Corporate/Logo.png"
                        width="90"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '300px' }}
                    navbarScroll
                    >
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/game">Juego</Nav.Link>
                        <Nav.Link href="/test">Examen</Nav.Link>
                        <Nav.Link href="/stats">Estadisticas</Nav.Link>
                        <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                        <Nav.Link href="/settings">Ajustes</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

export default MobileDrawer;
