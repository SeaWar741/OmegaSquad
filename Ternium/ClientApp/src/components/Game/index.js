import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import ResponsiveEmbed from 'react-responsive-embed';


import Panel from "../Panel";



const useStyles = makeStyles((theme) =>({
    whiteBox:{
        backgroundColor: "white",
        color: "black",
        height: "60vh",
    },
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
                    <ResponsiveEmbed src='https://shellshock.io/' allowFullScreen/>
                </div>
            </Panel>
        </div>
    );
}

export default Game;
