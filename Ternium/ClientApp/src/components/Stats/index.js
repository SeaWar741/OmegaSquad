import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';


import Panel from "../Panel";
import { InlineIcon } from '@iconify/react';
import sortRight from '@iconify/icons-icons8/sort-right';
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
import { Bar, BarChart,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,Legend  } from 'recharts';
import RecordVoiceOverOutlinedIcon from '@material-ui/icons/RecordVoiceOverOutlined';

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

const data = [
    {
      "name": "Clase A",
      "buenas": 4000,
      "pv": 2400
    },
    {
      "name": "Clase B",
      "buenas": 3000,
      "pv": 1398
    },
    {
      "name": "Clase C",
      "buenas": 2000,
      "pv": 9800
    },
    {
      "name": "Clase D",
      "buenas": 2780,
      "pv": 3908
    },
    {
      "name": "Clase E",
      "buenas": 1890,
      "pv": 4800
    },
    {
      "name": "Clase F",
      "buenas": 2390,
      "pv": 3800
    },
    {
      "name": "Clase G",
      "buenas": 3490,
      "pv": 4300
    }
]
  

const Stats = ({classes}) =>{
    classes = useStyles();


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
                                            data={data} 
                                            layout="vertical"
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
