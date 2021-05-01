import React from "react";
import { makeStyles,withStyles  } from "@material-ui/core/styles";
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import Countdown from "react-countdown";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';


import Panel from "../Panel";
import { Icon, InlineIcon } from '@iconify/react';
import baselineLeaderboard from '@iconify-icons/ic/baseline-leaderboard';

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

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
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: "black"
    },
    margin: {
        margin: theme.spacing(1),
    },
    examenDiv:{
        padding:"2rem"
    }
}))


const Leaderboard = ({classes}) =>{
    classes = useStyles();

    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
      setAge(event.target.value);
    };

    return (
        <div>
            <Panel>
                <div className={classes.contentDiv}>
                    <div className={classes.mainDiv}>
                        <div className={classes.header}>
                            <h1 style={{display: "inline"}}>
                                <InlineIcon icon={baselineLeaderboard} style={{ fontSize: 50,marginRight:"0.5rem" }} />
                                Examen práctico
                            </h1>
                        </div>
                        <div className={classes.examenDiv}>
                            <div className={classes.root}>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                            <Image src="./img/Test/Mixto.jpg" fluid />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div>
                                            <h1 style={{fontWeight:"bold",textAlign:"center"}}>
                                                <Countdown date={Date.now() + 1000000}>
                                                    Examen Finalizado
                                                </Countdown>
                                            </h1>
                                            <div style={{padding:"2rem"}}>
                                                <div style={{textAlign:"center",marginTop:"2rem"}}>
                                                    <h4 style={{fontWeight:"bold"}}>
                                                        Pregunta: 02/30
                                                    </h4>
                                                </div>
                                                <div>
                                                    <div style={{textAlign:"center",marginTop:"3rem"}}>
                                                        <FormControl className={classes.margin}>
                                                            <InputLabel htmlFor="demo-customized-textbox">Justificación</InputLabel>
                                                            <BootstrapInput id="demo-customized-textbox" />
                                                        </FormControl>
                                                        <FormControl className={classes.margin}>
                                                            <InputLabel htmlFor="demo-customized-select-native">Categoría</InputLabel>
                                                            <NativeSelect
                                                            id="demo-customized-select-native"
                                                            value={age}
                                                            onChange={handleChange}
                                                            input={<BootstrapInput />}
                                                            >
                                                            <option aria-label="None" value="" />
                                                            <option value={10}>Ten</option>
                                                            <option value={20}>Twenty</option>
                                                            <option value={30}>Thirty</option>
                                                            </NativeSelect>
                                                        </FormControl>
                                                        <FormControl className={classes.margin}>
                                                            <InputLabel htmlFor="demo-customized-select-native">Tipo</InputLabel>
                                                            <NativeSelect
                                                            id="demo-customized-select-native"
                                                            value={age}
                                                            onChange={handleChange}
                                                            input={<BootstrapInput />}
                                                            >
                                                            <option aria-label="None" value="" />
                                                            <option value={10}>Ten</option>
                                                            <option value={20}>Twenty</option>
                                                            <option value={30}>Thirty</option>
                                                            </NativeSelect>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div style={{textAlign:"center",marginTop:"5rem"}}>
                                                    <Button variant="danger">Registrar respuesta</Button>
                                                </div>
                                                <div style={{textAlign:"center",marginTop:"3rem"}}>
                                                    <Button variant="primary" style={{margin:"1rem"}}>🠔</Button>
                                                    <Button variant="primary" style={{margin:"1rem"}}>🠖</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div> 
                        </div>
                    </div>
                </div>
            </Panel>
        </div>
    );
}

export default Leaderboard;
