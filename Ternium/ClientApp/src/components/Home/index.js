import React,{useState,useCallback,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Panel from "../Panel";
import Left from "./left";
import { InlineIcon } from '@iconify/react';
import sortRight from '@iconify/icons-icons8/sort-right';
import Grid from '@material-ui/core/Grid';
import { Bar, BarChart,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,Legend  } from 'recharts';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';

import axios from 'axios';

//Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) =>({
    kpisDiv:{
        backgroundColor:"white",
        height: "100%",
    }

}))

const Home = ({classes}) =>{
    classes = useStyles();

    /**
     * "Chatarra Nacional Primera",
        "Devanado",
        "Mixto Cizallado",
        "Mixto Para Procesar",
        "Placa y Estructura Nacional",
        "Rebaba de Acero",
        "Regreso Industrial Galvanizado Nacional"
     */


    const [buenas,setBuenas] = useState([]);
    const [malas,setMalas] = useState([]);
    const [classification,setClassification] = useState([]);

    const listChatarra = ["Chatarra Nacional Primera","Devanado","Mixto Cizallado","Mixto Para Procesar","Placa y Estructura Nacional","Rebaba de Acero","Regreso Industrial Galvanizado Nacional"]

    const username = useSelector(state => state.usernameState.username)

    const categoria = "Chatarra";

    useEffect(async () => {

        for (const chatarra of listChatarra) {
            console.log(chatarra)
            const resultBuenas = await axios(
                process.env.REACT_APP_SQL_ROUTE+'buenas?user='+username+'&tipo='+chatarra+'&categoria='+categoria,
            );
            const resultMalas = await axios(
                process.env.REACT_APP_SQL_ROUTE+'nobuenas?user='+username+'&tipo='+chatarra+'&categoria='+categoria,
            );

            setBuenas(buenas => [...buenas, {name: chatarra, buenas: resultBuenas.data[0].buenas}]);
            setMalas(buenas => [...buenas, {name: chatarra, malas: resultMalas.data[0].noBuenas}]);
            setClassification(classification => [...classification, {name: chatarra, buenas: resultBuenas.data[0].buenas, malas: resultMalas.data[0].noBuenas}])
        }

    }, []);

    //console.log(buenas)
    //console.log(malas)
    //console.log(classification)

    return (
        <div>
            <Panel>
                <Grid container spacing={3} alignItems="stretch">
                    <Grid item xs={12} sm={6}>
                        <Left/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Container className={classes.kpisDiv}>
                            <div style={{padding:"2rem"}}>
                                <h1 style={{paddingBottom:"1rem"}}>
                                    <RecordVoiceOverOutlinedIcon style={{ fontSize: 50,marginRight:"0.5rem" }}/>
                                    Precisión de clasificación
                                </h1>
                                <div style={{ width: '100%', height: 600}}>
                                    <ResponsiveContainer>
                                        <BarChart 
                                            data={classification} 
                                            layout="vertical"
                                            fontSize={12}
                                        >
                                             <defs>
                                                <linearGradient id="buenasColor" x1="1" y1="0" x2="0" y2="0">
                                                <stop offset="0%" stopColor="#FF9900" stopOpacity={1}/>
                                                <stop offset="48%" stopColor="#FF390E" stopOpacity={1}/>
                                                </linearGradient>
                                            </defs>
                                            <XAxis type="number"/>
                                            <YAxis type="category" dataKey="name" />
                                            <Tooltip/>
                                            <Legend />
                                            <Bar dataKey="buenas" fill="#8884d8" fill="url(#buenasColor)"/>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </Container>
                    </Grid>
                </Grid>
            </Panel>
        </div>
    );
}

export default Home;
