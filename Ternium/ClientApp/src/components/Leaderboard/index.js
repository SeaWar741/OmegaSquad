import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import Panel from "../Panel";
import { Icon, InlineIcon } from '@iconify/react';
import baselineLeaderboard from '@iconify-icons/ic/baseline-leaderboard';


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
        position: "absolute",
        right: "100px"
    },
    formControl2: {
        margin: theme.spacing(1),
        minWidth: 120,
        position: "absolute",
        right: "250px"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    header:{
        display:"inline-block"
    }
}))


const columns = [
    { id: 'name', label: 'Posición'},
    {
        id: 'density',
        label: 'Usuario',
        format: (value) => value.toLocaleString('en-US'),
    },
    { id: 'code', label: 'Horas Jugadas'},
    {
      id: 'population',
      label: 'Mejor categoría',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Logro más reciente',
      format: (value) => value.toLocaleString('en-US'),
    }
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}
  
const rows = [
    createData('1', 'IN', 1324171354, 3287263),
    createData('2', 'CN', 1403500365, 9596961),
    createData('3', 'IT', 60483973, 301340),
    createData('4', 'US', 327167434, 9833520),
    createData('5', 'CA', 37602103, 9984670),
    createData('6', 'AU', 25475400, 7692024),
    createData('7', 'DE', 83019200, 357578),
    createData('8', 'IE', 4857000, 70273),
    createData('9', 'MX', 126577691, 1972550),
    createData('10', 'JP', 126317000, 377973),
    createData('11', 'FR', 67022000, 640679),
    createData('12', 'GB', 67545757, 242495),
    createData('13', 'RU', 146793744, 17098246),
    createData('14', 'NG', 200962417, 923768),
    createData('15', 'BR', 210147125, 8515767),
];


const Leaderboard = ({classes}) =>{
    classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [categoria, setCategoria] = React.useState('Global');
    const [tipo, setTipo] = React.useState('Practica');

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


    return (
        <div>
            <Panel>
                <div className={classes.contentDiv}>
                    <div className={classes.mainDiv}>
                        <div className={classes.header}>
                            <h1 style={{display: "inline"}}>
                                <InlineIcon icon={baselineLeaderboard} style={{ fontSize: 50,marginRight:"0.5rem" }} />
                                Leaderboard
                            </h1>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Categorías</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoria}
                                    onChange={handleChangeCategoria}
                                >
                                    <MenuItem value={"Global"}>Global</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl2}>
                                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tipo}
                                    onChange={handleChangeTipo}
                                >
                                    <MenuItem value={"Examen"}>Exámen</MenuItem>
                                    <MenuItem value={"Practica"}>Práctica</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className={classes.tableDiv}>
                            <TableContainer className={classes.container}>
                                    <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                        {columns.map((column) => (
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
                                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
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
            </Panel>
        </div>
    );
}

export default Leaderboard;
