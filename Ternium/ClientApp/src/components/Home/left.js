import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Panel from "../Panel";

import { InlineIcon } from '@iconify/react';
import sortRight from '@iconify/icons-icons8/sort-right';



const useStyles = makeStyles((theme) =>({
    mainDiv:{
        backgroundImage: "url('./img/backgrounds/Login.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "noRepeat",
        height: "100vh",
        color:"white"
    },
    playCard:{
        background: "linear-gradient(66deg, rgba(153,250,151,1) 4%, rgba(0,179,81,1) 100%)",
        color:"white",
        padding:"2srem",
        textAlign:"center"
    }
}))

const Left = ({classes}) =>{
    classes = useStyles();


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>This is some text within a card body.</Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row style={{paddingTop:"10rem"}}>
                    <Col>
                        <div className={classes.playCard}>
                            <h1 style={{fontSize:"100px"}}>
                                <InlineIcon icon={sortRight}/>
                                Play
                            </h1>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Left;
