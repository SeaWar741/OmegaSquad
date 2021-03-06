import React ,{useState,useCallback,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Helmet} from "react-helmet";
import Fade from 'react-reveal/Fade';


import axios from 'axios';

import Panel from "../Panel";
import { Icon, InlineIcon } from '@iconify/react';
import baselineLeaderboard from '@iconify-icons/ic/baseline-leaderboard';
import diploma1 from '@iconify/icons-icons8/diploma-1';


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
    tableDiv:{
        marginTop:"2rem",
        overflowY: "auto",
        maxHeight:"75vh"
    },
    container:{
        maxHeight: "100%",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        [theme.breakpoints.up('sm')]:{
            position: "absolute",
            right: "100px"
        },
        [theme.breakpoints.down('sm')]:{
            position: "absolute",
            display:"none"
            
        },
    },
    formControl3:{
        margin: theme.spacing(1),
        minWidth: 120,
        [theme.breakpoints.up('sm')]:{
            display:"none"
            
        },
        [theme.breakpoints.down('sm')]:{
            display:"block"
            
        },
    },
    formControl2: {
        margin: theme.spacing(1),
        minWidth: 120,
        [theme.breakpoints.up('sm')]:{
            position:"absolute",
            
        },
        [theme.breakpoints.down('sm')]:{
            position:"relative",
            right: "250px"
        },
        
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    header:{
        [theme.breakpoints.up('sm')]:{
            display:"inline-block"
        },
        [theme.breakpoints.down('sm')]:{
            display:"flex"
        }
    }
}))


//Ordenar lista    
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
} 

//Estructura de leaderboard de Examen
const columnsExamen = [
    { id: 'posicion', label: 'Posici??n'},
    { id: 'username', label: 'Usuario'},
    { id: 'score', label: 'Puntos'}
];

//Estructura de leaderboard de Practica
const columnsPractica = [
    { id: 'ranking', label: 'Posici??n'},
    {
        id: 'user',
        label: 'Usuario',
        format: (value) => value.toLocaleString('en-US'),
    },
    {   id: 'metrica', 
        label: 'Asertividad',
        format: (value) => value.toLocaleString('en-US')+"%"
    },
    { id: 'puntaje', label: 'Puntos'}

];

//Se hace un fill a las filas del examen
function createExamenData(posicion, username, score) {
    return { posicion, username, score};
}

//Aqui se guardan las filas
const rows = [
];


const Leaderboard = ({classes}) =>{
    classes = useStyles();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [categoria, setCategoria] = useState('');
    const [tipo, setTipo] = useState('Examen');
    const [categorias,setCategorias] = useState([]);

    const [examenes, setExamenes] = useState([]);
    const [practicas, setPracticas] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeCategoria = (event) => {
        setCategoria(event.target.value);
    };

    const handleChangeTipo = (event) => {
        setTipo(event.target.value);
    };   

    const getCategorias = async() =>{
        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'UserTypes',
        );
        setCategorias(result.data);
        setCategoria(result.data[0]);
    }

    const getExamenes = async() =>{
        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'scores',
        );
        var ex = [];
        var examenesApi = result.data.sort(GetSortOrder("score")).reverse();
        examenesApi.forEach(function(item,index) {
            console.log(item)
            console.log(index)
            if(index == 0){
                ex.push(createExamenData("????", item.username, item.score))
            }
            if(index == 1){
                ex.push(createExamenData("????", item.username, item.score))
            }
            if(index == 2){
                ex.push(createExamenData("????", item.username, item.score))
            }
            if(index >2){
                ex.push(createExamenData(index+1, item.username, item.score))
            }
            
        });
        setExamenes(ex);
  
    }

    const getPracticas = async() =>{
        const result = await axios(
            process.env.REACT_APP_SQL_ROUTE+'ScoresPractice',
        );
        setPracticas(result.data);
    }
    
    useEffect(() => {
        getCategorias();
        getExamenes();
        getPracticas();
    }, []);
    //console.log(practicas)


    //Componente Examen
    const ExamenTableComponent = ({classes}) =>{
        return (
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columnsExamen.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {examenes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columnsExamen.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
        );
    };

    //Componente Practica
    const PracticaTableComponent = ({classes}) =>{
        return (
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columnsPractica.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {practicas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        {columnsPractica.map((column) => {
                            const value = row[column.id];
                            return (
                            <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    );
                    })}
                </TableBody>
            </Table>
        );
    };


    return (
        <div>
            <Helmet>
                <title>Ternium Trainer | Leaderboard</title>
            </Helmet>
            <Panel>
                <Fade big>
                    <div className={classes.contentDiv}>
                        <div className={classes.mainDiv}>
                            <div className={classes.header}>
                                <h1 style={{display: "inline"}}>
                                    <InlineIcon icon={diploma1} style={{ fontSize: 50,marginRight:"0.5rem" }} />
                                    Leaderboard
                                </h1>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={tipo}
                                        onChange={handleChangeTipo}
            
                                    >
                                        <MenuItem value={"Examen"}>Ex??men</MenuItem>
                                        <MenuItem value={"Practica"}>Pr??ctica</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={classes.mobileSelector}>
                                <FormControl className={classes.formControl3}>
                                    <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={tipo}
                                        onChange={handleChangeTipo}
            
                                    >
                                        <MenuItem value={"Examen"}>Ex??men</MenuItem>
                                        <MenuItem value={"Practica"}>Pr??ctica</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={classes.tableDiv}>
                                <TableContainer className={classes.container}>
                                    {tipo=="Examen"?<ExamenTableComponent/>:<PracticaTableComponent/>}
                                </TableContainer>
                                <TablePagination
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </div>
                        </div>
                    </div>
                </Fade>
            </Panel>
        </div>
    );
}

export default Leaderboard;
