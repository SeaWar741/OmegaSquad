import React,{useState,useCallback,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Panel from "../Panel";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Icon, InlineIcon } from '@iconify/react';
import Settings from '@iconify-icons/ic/settings';
import Fade from 'react-reveal/Fade';

import {Helmet} from "react-helmet";

import axios from 'axios';
 

//Redux
import { useSelector } from 'react-redux';

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
        minHeight:"90vh"
    },
    configDiv:{
        marginTop:"1rem",
        overflowY: "auto",
        maxHeight:"75vh",
        textAlign:"center"
    },
    header:{
        display:"inline-block"
    },
    mainDiv:{
    },
    loginLog:{
        marginBottom:"2rem",
        overflowY:"auto",
        height:"50vh"
    },
    userInfo:{
        textAlign:"left",
        paddingLeft:"1rem",
        paddingRight:"1rem",
        paddingTop:"2rem"
    }
}))


const Config = ({classes}) =>{
    classes = useStyles();

    const [rows,setRows] = useState([]);
    
    const username = useSelector(state => state.usernameState.username)

    const reload=()=>{
        localStorage.clear();
        window.location.reload();
    }

    const fetchData = async() =>{
        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'loginlog?user='+username,
        );
        setRows(result.data.reverse());
    }

    useEffect(() => {
        fetchData();
    }, []);

    const formatedDate = (unix_timestamp) =>{
        
        const nombres_dias = new Array("Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado")
        const nombres_meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre")
        const fecha_actual = new Date(unix_timestamp * 1000);

        const dia_mes = fecha_actual.getDate() //dia del mes
        const dia_semana = fecha_actual.getDay() //dia de la semana
        const mes = fecha_actual.getMonth() + 1
        const anio = fecha_actual.getFullYear()

        var fechaHora = new Date(unix_timestamp * 1000);
        var horas = fechaHora.getHours();
        var minutos = fechaHora.getMinutes();
        var segundos = fechaHora.getSeconds();
        var sufijo = 'AM';

        if(horas > 12) {
            horas = horas - 12;
            sufijo = 'PM';
        }

        if(horas < 10) { horas = '0' + horas; }
        if(minutos < 10) { minutos = '0' + minutos; }
        if(segundos < 10) { segundos = '0' + segundos;}

        const fechaFinal = nombres_dias[dia_semana] + ", " + dia_mes + " de " + nombres_meses[mes-1] + " de " + anio + ", "+ horas + ":"+minutos + " " + sufijo;

        return fechaFinal;
    }

    //console.log(rows)
    
    return (
        <div>
            <Helmet>
                <title>Ternium Trainer | Ajustes</title>
            </Helmet>
            <Panel>
                <Fade big>
                    <div className={classes.contentDiv}>
                        <div className={classes.mainDiv}>
                            <div className={classes.header}>
                                <h1 style={{display: "inline"}}>
                                    <InlineIcon icon={Settings} style={{ fontSize: 50,marginRight:"0.5rem" }} />
                                    Configuración de cuenta
                                </h1>
                            </div>
                            <div className={classes.userInfo}>
                                    <h4> <strong>Username:</strong><br/> {username}</h4>
                            </div>
                            <div className={classes.configDiv}>
                            <div className={classes.loginLog}>
                                    {rows.length > 0 &&
                                        <TableContainer>
                                            <Table className={classes.table} aria-label="simple table">
                                                <TableHead>
                                                <TableRow>
                                                    <TableCell>Historial de logins semanal</TableCell>
                                                </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow key={row.user}>
                                                        <TableCell>{formatedDate(row.timestamp)}</TableCell>
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    }
                            </div>
                            <br/>
                            <Button variant="danger" onClick={reload}>Log out</Button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Panel>
        </div>
    );
}

export default Config;
