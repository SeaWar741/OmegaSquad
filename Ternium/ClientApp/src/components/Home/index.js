import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Panel from "../Panel";
import Left from "./left";


const useStyles = makeStyles((theme) =>({
    mainDiv:{
        backgroundImage: "url('./img/backgrounds/Login.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "noRepeat",
        height: "100vh",
        color:"white"
    }
}))

const Home = ({classes}) =>{
    classes = useStyles();


    return (
        <div>
            <Panel>
                <Container>
                    <Row>
                        <Col>
                            <Left/>
                        </Col>
                        <Col>
                            KPIS
                        </Col>
                    </Row>
                </Container>
            </Panel>
        </div>
    );
}

export default Home;
