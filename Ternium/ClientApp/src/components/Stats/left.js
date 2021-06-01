import React,{useState,useCallback,useEffect}  from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Card,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Panel from "../Panel";

import { InlineIcon } from '@iconify/react';
import sortRight from '@iconify/icons-icons8/sort-right';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import { Bar, BarChart,XAxis,YAxis,CartesianGrid,Tooltip, Legend,ResponsiveContainer,AreaChart,Area,PieChart, Pie, Sector, Cell } from 'recharts';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types';

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
}));

function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={`Medalla ${index + 1}`} />
      </ListItem>
    );
  }
  
  renderRow.propTypes = {
    index: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
  };
  



const data2 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function binarySearch(sortedArray, inusername){
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (sortedArray[middle].username === inusername) {
            // found the inusername
            return middle;
        } else if (sortedArray[middle].username < inusername) {
            // continue searching to the right
            start = middle + 1;
        } else {
            // search searching to the left
            end = middle - 1;
        }
    }
    // key wasn't found
    return undefined;
}

const Left = ({classes}) =>{
    classes = useStyles();

    const username = useSelector(state => state.usernameState.username)

    const [horas,setHoras] = useState([]);
    const [horast,setHorast] = useState(0);
    const [juegos,setJuegos] = useState(0);
    const [posicion, setPosicion] = useState();


    useEffect(async () => {

        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'tiempodiasemanaactual?user='+username,
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


        setHoras(dataDays);

    }, []);

    useEffect(async () => {

        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'tiempohorasjugadas?user='+username,
        );
        
        setHorast(Math.floor(result.data[0].tiempoHorasJugadas/60) + ":" +result.data[0].tiempoHorasJugadas%60);

    }, []);

    useEffect(async () => {

        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'numerojuegos?user='+username,
        );
        
        setJuegos(result.data[0].numeroJuegos);

    }, []);

    useEffect(async () => {
        const result = await axios(
          process.env.REACT_APP_SQL_ROUTE+'ScoresPractice',
        );
        setPosicion(binarySearch(result.data,username));
    }, []);



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
                                    <AreaChart data={horas}>
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
                                            <strong>{horast}</strong>
                                            <br/>
                                            Horas de juego totales
                                            <br/><br/>

                                            <strong>{juegos}</strong>
                                            <br/>
                                            Juegos completados
                                            <br/><br/>

                                            <strong>{posicion !== undefined ? "#"+posicion:"N/A"}</strong>
                                            <br/>
                                            Posición global
                                            <br/><br/>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div style={{textAlign:"center"}}>
                                            <FixedSizeList height={200} width={300} itemSize={46} itemCount={200}>
                                                {renderRow}
                                            </FixedSizeList>
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
