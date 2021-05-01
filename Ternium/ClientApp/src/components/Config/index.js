import React,{useState,useCallback} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Panel from "../Panel";
import { Icon, InlineIcon } from '@iconify/react';
import baselineLeaderboard from '@iconify-icons/ic/baseline-leaderboard';
import history from "../../history";
import {Redirect } from 'react-router';


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
    }
}))


const Config = ({classes}) =>{
    classes = useStyles();

    const reload=()=>{
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div>
            <Panel>
                <div className={classes.contentDiv}>
                    <div className={classes.mainDiv}>
                        <div className={classes.header}>
                            <h1 style={{display: "inline"}}>
                                <InlineIcon icon={baselineLeaderboard}/>
                                Configuración de cuenta
                            </h1>
                        </div>
                        <div className={classes.configDiv}>
                           Aqui va la configuración
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
