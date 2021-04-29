import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import Panel from "../Panel";
import Left from "./left";
import { InlineIcon } from '@iconify/react';
import sortRight from '@iconify/icons-icons8/sort-right';
import { Bar, BarChart,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer,Legend  } from 'recharts';


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
      "name": "Page A",
      "uv": 4000,
      "pv": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300
    }
]
  

const Home = ({classes}) =>{
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
                                    <InlineIcon icon={sortRight}/>
                                    Precisión de clasificación
                                </h1>
                                <div style={{ width: '100%', height: 600}}>
                                        <BarChart 
                                            width={600} 
                                            height={300} 
                                            data={data} 
                                            layout="vertical"
                                            margin={{top: 5, right: 30, left: 20, bottom: 5}}
                                            >
                                            <XAxis type="number"/>
                                            <YAxis type="category" dataKey="name" />
                                            <CartesianGrid strokeDasharray="3 3"/>
                                            <Tooltip/>
                                            <Legend />
                                            <Bar dataKey="pv" fill="#8884d8" />
                                            <Bar dataKey="uv" fill="#82ca9d" />
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

export default Home;
