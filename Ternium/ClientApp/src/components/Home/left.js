import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Panel from "../Panel";

import { InlineIcon } from '@iconify/react';
import sortRight from '@iconify/icons-icons8/sort-right';
import { Bar, BarChart,XAxis,YAxis,CartesianGrid,Tooltip, Legend,ResponsiveContainer } from 'recharts';


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
        padding:"2rem",
        textAlign:"center",
    },
    chartDiv:{
        backgroundColor:"white",
        padding:"2rem",
        pointer:"pointer"
    }
}))

const data = [
    {
      "name": "Lunes",
      "HorasDeJuego": 4000,
    },
    {
      "name": "Martes",
      "HorasDeJuego": 3000,
    },
    {
      "name": "Miercoles",
      "HorasDeJuego": 2000,
    },
    {
      "name": "Jueves",
      "HorasDeJuego": 2780,
    },
    {
        "name": "Viernes",
        "HorasDeJuego": 2780,
    }
]


const Left = ({classes}) =>{
    classes = useStyles();


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className={classes.chartDiv}>
                            <h1 style={{paddingBottom:"1rem"}}>
                                <InlineIcon icon={sortRight}/>
                                Horas de juego:
                            </h1>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={data}>
                                        <XAxis dataKey="name" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="HorasDeJuego" fill="#005BAA" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            
                        </div>
                    </Col>
                </Row>
                <Row style={{paddingTop:"2rem",pointer:"drag"}}>
                    <Col>
                        <div className={classes.playCard}>
                            <h1 style={{fontSize:"8vw",paddingTop:"5vh",paddingBottom:"5vh"}}>
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
