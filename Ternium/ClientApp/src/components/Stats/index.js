import React,{useState,useCallback,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';


import Panel from "../Panel";
import { InlineIcon } from '@iconify/react';
import sortRight from '@iconify/icons-icons8/sort-right';
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
import { Bar, BarChart,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,Legend  } from 'recharts';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';

import axios from 'axios';

//Redux
import { useSelector } from 'react-redux';


import Left from './left';

const useStyles = makeStyles((theme) =>({
    mainDiv:{
        backgroundImage: "url('./img/backgrounds/Login.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "noRepeat",
        height: "100vh",
    },
    kpisDiv:{
        backgroundColor:"white",
        padding:"2rem"
    }

}))

  
const Stats = ({classes}) =>{
    classes = useStyles();

    
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
                'https://localhost:5001/buenas?user='+username+'&tipo='+chatarra+'&categoria='+categoria,
            );
            const resultMalas = await axios(
                'https://localhost:5001/nobuenas?user='+username+'&tipo='+chatarra+'&categoria='+categoria,
            );

            setBuenas(buenas => [...buenas, {name: chatarra, buenas: resultBuenas.data[0].buenas}]);
            setMalas(buenas => [...buenas, {name: chatarra, malas: resultMalas.data[0].noBuenas}]);
            setClassification(classification => [...classification, {name: chatarra, buenas: resultBuenas.data[0].buenas, malas: resultMalas.data[0].noBuenas}])
        }

    }, []);

    console.log(buenas)
    console.log(malas)
    console.log(classification)

    return (
        <div>
            <Panel>
                <Row>
                    <Col>
                        <Left/>
                    </Col>
                    <Col className={classes.kpisDiv}>
                        <Container>
                            <div>
                                <h1 style={{paddingBottom:"1rem"}}>
                                    <RecordVoiceOverOutlinedIcon style={{ fontSize: 50,marginRight:"0.5rem" }}/>
                                    Precisión de clasificación
                                </h1>
                                <div style={{ width: '100%', height: 600}}>
                                        <BarChart 
                                            width={600} 
                                            height={600} 
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
                                </div>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Panel>
        </div>
    );
}

export default Stats;
