import React,{useState,useCallback,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Panel from "../Panel";

import { InlineIcon } from '@iconify/react';
import { useHistory } from 'react-router-dom';
import sortRight from '@iconify/icons-icons8/sort-right';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { Bar, BarChart,XAxis,YAxis,CartesianGrid,Tooltip, Legend,ResponsiveContainer } from 'recharts';

import axios from 'axios';

//Redux
import { useSelector } from 'react-redux';

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
    },
    buttonPlay:{
        pointer:"pointer",
        "&:hover, &:focus, &:active": {
            textDecorationLine: "none"
        }

    }
}))


const Left = ({classes}) =>{
    classes = useStyles();

    const history = useHistory();

    const username = useSelector(state => state.usernameState.username)

    const [horas,setHoras] = useState([]);

    useEffect(async () => {

        const result = await axios(
            'https://localhost:5001/tiempodiasemanaactual?user='+username,
        );

        const dataDays = [
            {
                name:"Lunes",
                HorasDeJuego:result.data[0].lunes
            },
            {
                name:"Martes",
                HorasDeJuego:result.data[0].martes
            },
            {
                name:"Miercoles",
                HorasDeJuego:result.data[0].miercoles
            },
            {
                name:"Jueves",
                HorasDeJuego:result.data[0].jueves
            },
            {
                name:"Viernes",
                HorasDeJuego:result.data[0].viernes
            }
        ];

        console.log(result.data)

        setHoras(dataDays);

    }, []);

    console.log(horas);

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className={classes.chartDiv}>
                            <h1 style={{paddingBottom:"1rem"}}>
                                <HourglassEmptyIcon style={{ fontSize: 50,marginRight:"0.5rem" }} />
                                 Horas de juego:
                            </h1>
                            <div style={{ width: '100%', height: 300 }}>
                                <ResponsiveContainer>
                                    <BarChart data={horas}>
                                        <defs>
                                            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#007db1" stopOpacity={1}/>
                                            <stop offset="48%" stopColor="#0069ad" stopOpacity={1}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="HorasDeJuego" fill="url(#colorHours)" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            
                        </div>
                    </Col>
                </Row>
                <Row style={{paddingTop:"2rem",pointer:"drag"}}>
                    <Col>
                        <a href={"/game"} className={classes.buttonPlay}> 
                            <div className={classes.playCard}>
                                <h1 style={{fontSize:"8vw",paddingTop:"5vh",paddingBottom:"5vh"}}>
                                    <InlineIcon icon={sortRight}/>
                                    Play
                                </h1>
                            </div>
                        </a>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Left;
