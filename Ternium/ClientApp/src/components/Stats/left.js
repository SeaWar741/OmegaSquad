import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Card,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Panel from "../Panel";

import { InlineIcon } from '@iconify/react';
import sortRight from '@iconify/icons-icons8/sort-right';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { Bar, BarChart,XAxis,YAxis,CartesianGrid,Tooltip, Legend,ResponsiveContainer,AreaChart,Area,PieChart, Pie, Sector, Cell } from 'recharts';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';


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

const data2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Left = ({classes}) =>{
    classes = useStyles();


    return (
        <div>
            <Container style={{ backgroundColor:"white !important"}}>
                <Row>
                    <Col>
                        <div className={classes.chartDiv}>
                            <h1 style={{paddingBottom:"1rem"}}>
                                <HourglassEmptyIcon style={{ fontSize: 50,marginRight:"0.5rem" }} />
                                 Estadísticas generales:
                            </h1>
                            <div style={{ width: '100%', height: 300, padding:"2rem" }}>
                                <ResponsiveContainer>
                                    <AreaChart data={data}>
                                        <defs>
                                            <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#007DB1" stopOpacity={0.48}/>
                                            <stop offset="48%" stopColor="#007DB1" stopOpacity={1}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="name" />
                                        <YAxis dataKey="HorasDeJuego" />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" fillOpacity={0.6}  dataKey="HorasDeJuego" fill="url(#colorHours)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{height:300,marginTop:"1rem"}}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <div>
                                            <strong>2:27:29</strong>
                                            <br/>
                                            Horas de juego totales
                                            <br/><br/>

                                            <strong>45</strong>
                                            <br/>
                                            Juegos completados
                                            <br/><br/>

                                            <strong>#23</strong>
                                            <br/>
                                            Posición global
                                            <br/><br/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div style={{textAlign:"center"}}>
                                            <PieChart width={150} height={150} >
                                                <Pie
                                                data={data2}
                                                startAngle={180}
                                                endAngle={0}
                                                innerRadius={40}
                                                outerRadius={60}
                                                fill="#8884d8"
                                                paddingAngle={5}
                                                dataKey="value"
                                                >
                                                {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                                </Pie>
                                            </PieChart>
                                            <strong>#23</strong>
                                            <br/>
                                            Posición global
                                            <br/><br/>
                                            <Button variant="danger">Ver recomendaciones</Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Left;
