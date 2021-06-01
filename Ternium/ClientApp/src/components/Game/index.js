import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
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



const Game = ({classes}) =>{
    classes = useStyles();

    return (
        <div>
            <Panel>
                <div className={classes.contentDiv}>
                    <Container>
                        <ResponsiveEmbed src='https://shellshock.io/' allowFullScreen/>
                    </Container>
                </div>
            </Panel>
        </div>
    );
}

export default Game;
