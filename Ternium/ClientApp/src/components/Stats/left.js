import React,{useState,useCallback,useEffect}  from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';


import EqualizerIcon from '@material-ui/icons/Equalizer';
import { XAxis,YAxis,CartesianGrid,Tooltip, Legend,ResponsiveContainer,AreaChart,Area } from 'recharts';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Fade from 'react-reveal/Fade';


import axios from 'axios';

//Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) =>({
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
    demo: {
        backgroundColor: theme.palette.background.paper,
        overflowY: "scroll",
        height:"25vh"
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    }
}));

const range = (min, max) => {
    const arr = Array(max - min + 1)
      .fill(0)
      .map((_, i) => i + min);
    return arr;
}

function generate(element) {
    return range(1,200).map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
}



function binarySearch(sortedArray, inusername){
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (sortedArray[middle].user === inusername) {
            // found the inusername
            return (middle+1);
        } else if (sortedArray[middle].user < inusername) {
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
    const usernameid = useSelector(state => state.usernameState.usernameCode)
    

    const [horas,setHoras] = useState([]);
    const [horasLast,setHorasLast] = useState([]);
    const [horast,setHorast] = useState(0);
    const [juegos,setJuegos] = useState(0);
    const [streaks,setStreaks] = useState(0);
    const [medallas,setMedallas] = useState([]);
    const [posicion, setPosicion] = useState();

    const [dense, setDense] = useState(false);
    const [secondary, setSecondary] = useState(false);

    const getJuegos = async() =>{
        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'tiempodiasemanaactual?user='+username,
        );
        const result2 = await axios(
            process.env.REACT_APP_SQL_ROUTE+'tiempodiasemanapasada?user='+username,
        );

        const dataDays = [
            {
                name:"Lunes",
                HorasDeJuego:result.data[0].lunes.toFixed(2),
                HorasDeJuegoLast:result2.data[0].lunes.toFixed(2),
            },
            {
                name:"Martes",
                HorasDeJuego:result.data[0].martes.toFixed(2),
                HorasDeJuegoLast:result2.data[0].martes.toFixed(2),
            },
            {
                name:"Miercoles",
                HorasDeJuego:result.data[0].miercoles.toFixed(2),
                HorasDeJuegoLast:result2.data[0].miercoles.toFixed(2),
            },
            {
                name:"Jueves",
                HorasDeJuego:result.data[0].jueves.toFixed(2),
                HorasDeJuegoLast:result2.data[0].jueves.toFixed(2),
            },
            {
                name:"Viernes",
                HorasDeJuego:result.data[0].viernes.toFixed(2),
                HorasDeJuegoLast:result2.data[0].viernes.toFixed(2),
            }
        ];


        setHoras(dataDays);
    };

    const getJuegosLast = async() =>{
        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'tiempodiasemanapasada?user='+username,
        );
        
        const dataDays = [
            {
                name:"Lunes",
                HorasDeJuegoLast:result.data[0].lunes
            },
            {
                name:"Martes",
                HorasDeJuegoLast:result.data[0].martes
            },
            {
                name:"Miercoles",
                HorasDeJuegoLast:result.data[0].miercoles
            },
            {
                name:"Jueves",
                HorasDeJuegoLast:result.data[0].jueves
            },
            {
                name:"Viernes",
                HorasDeJuegoLast:result.data[0].viernes
            }
        ];


        setHorasLast(dataDays);
    };

    const getHoras = async() =>{
        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'tiempohorasjugadas?user='+username,
        );
        
        setHorast(Math.floor(result.data[0].tiempoHorasJugadas/60) + ":" +result.data[0].tiempoHorasJugadas%60);
    }
    

    const getNJuegos = async() =>{
        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'numerojuegos?user='+username,
        );
        
        setJuegos(result.data[0].numeroJuegos);
    }

    const getPosExamenes = async() =>{
        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'ScoresPractice',
          );
          setPosicion(binarySearch(result.data,username));
    }

    const getStreaks = async() =>{
        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'streaks?userid='+usernameid,
          );
          setStreaks(result.data);
    }

    const getMedallas = async() =>{
        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'logrosusuario?user='+username,
          );
          setMedallas(result.data);
    }



    useEffect(() => {
        getJuegos();
        getJuegosLast();
        getHoras();
        getNJuegos();
        getStreaks();
        getMedallas();
        getPosExamenes();
    }, []);

    console.log(posicion);

    return (
        <div>
            <Grid container spacing={3} style={{ backgroundColor:"white !important"}}>
                    <Grid item xs={12}>
                        <Fade big>
                            <div className={classes.chartDiv}>
                                <h1 style={{paddingBottom:"1rem"}}>
                                    <EqualizerIcon style={{ fontSize: 50,marginRight:"0.5rem" }} />
                                    Estadísticas generales
                                </h1>
                                <div style={{ width: '100%', height: 300}}>
                                    <ResponsiveContainer>
                                        <AreaChart data={horas}>
                                            <defs>
                                                <linearGradient id="colorHoursLast" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#00355F" stopOpacity={1}/>
                                                    <stop offset="48%" stopColor="#00355F" stopOpacity={1}/>
                                                </linearGradient>
                                                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#007DB1" stopOpacity={0.48}/>
                                                    <stop offset="48%" stopColor="#007DB1" stopOpacity={1}/>
                                                </linearGradient>
                                            </defs>
                                            <XAxis dataKey="name" />
                                            <YAxis/>
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <Tooltip />
                                            <Legend />
                                            <Area type="monotone" fillOpacity={0.6}  dataKey="HorasDeJuego" fill="url(#colorHours)" />
                                            {/*<Area type="monotone" fillOpacity={0.6}  dataKey="HorasDeJuego" fill="url(#colorHours)" />*/}
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                                <div style={{marginTop:"1rem",padding:"2rem"}}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
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

                                                <strong>{streaks}</strong>
                                                <br/>
                                                Streaks examen
                                                <br/><br/>

                                            </div>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <div style={{textAlign:"center"}}>
                                                {/*
                                                <FixedSizeList height={200} width={300} itemSize={46} itemCount={200}>
                                                    {renderRow}
                                                </FixedSizeList>
                                                */}
                                                <h3 style={{textAlign:"left",fontWeight:"600"}}>
                                                    <SportsEsportsIcon style={{ fontSize: 50,marginRight:"0.5rem" }} />
                                                    Medallas
                                                </h3>
                                                <div className={classes.demo}>
                                                    <List dense={dense}>
                                                    {medallas.map(s => 
                                                        <ListItem>
                                                        <ListItemIcon>
                                                            <EmojiEventsIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={s.nombre}
                                                            secondary={secondary ? 'Secondary text' : null}
                                                        />
                                                        </ListItem>,
                                                    )}
                                                    </List>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Fade>
                    </Grid>
            </Grid>
        </div>
    );
}

export default Left;
