import React,{useState,useCallback,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Panel from "../Panel";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Icon, InlineIcon } from '@iconify/react';
import baselineLeaderboard from '@iconify-icons/ic/baseline-leaderboard';
import {Redirect } from 'react-router';

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
        marginTop:"2rem",
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
    },
    userInfo:{
        textAlign:"left",
        padding:"1rem"
    }
}))


const Config = ({classes}) =>{
    classes = useStyles();

    const reload=()=>{
        localStorage.clear();
        window.location.reload();
    }

    const [rows,setRows] = useState([]);
    

    const username = useSelector(state => state.usernameState.username)
    const usernameCode = useSelector(state => state.usernameState.usernameCode)
    const usernameToken = useSelector(state => state.usernameState.usernameToken)

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
            <Panel>
                <div className={classes.contentDiv}>
                    <div className={classes.mainDiv}>
                        <div className={classes.header}>
                            <h1 style={{display: "inline"}}>
                                <InlineIcon icon={baselineLeaderboard} style={{ fontSize: 50,marginRight:"0.5rem" }} />
                                Configuración de cuenta
                            </h1>
                        </div>
                        <div className={classes.configDiv}>
                           <div className={classes.loginLog}>
                                {rows.length > 0 &&
                                    <TableContainer>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell>Fechas login</TableCell>
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
                           <div className={classes.userInfo}>
                                <h4> <strong>Username:</strong><br/> {username}</h4>
                                <h4> <strong>UsernameCode:</strong><br/> {usernameCode}</h4>
                                <h4> <strong>UsernameToken:</strong><br/> {usernameToken}</h4>
                           </div>
                           <br/>
                           <Button variant="danger" onClick={reload}>Log out</Button>
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    );
}

export default Config;
