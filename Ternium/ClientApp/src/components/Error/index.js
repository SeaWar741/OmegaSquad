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
        minHeight:"90vh",
        
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
    },
    textError:{

        textAlign: "center",
        marginTop:"30vh"
    }
}))


const ErrorPage = ({classes}) =>{
    classes = useStyles();

    
    return (
        <div>
            <Helmet>
                <title>Ternium Trainer | 404</title>
            </Helmet>
            <Panel>
                <Fade big>
                    <div className={classes.contentDiv}>
                            <h1 className={classes.textError}><strong>404</strong>:  Página no encontrada</h1>
                            <h3 style={{textAlign:"center"}}>Regresa a inicio para seguir navegando</h3>
                    </div>
                </Fade>
            </Panel>
        </div>
    );
}

export default ErrorPage;
