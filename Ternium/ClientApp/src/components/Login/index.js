import React, { useCallbac,useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import { Container,Row,Col,Image,Form,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from "react-router-dom";
import {Helmet} from "react-helmet";
import Fade from 'react-reveal/Fade';

//Redux
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setUsernameCode, setUsernameToken} from '../../store/actions'


const useStyles = makeStyles((theme) =>({
    mainDiv:{
        backgroundImage: "url('./img/backgrounds/Login.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "noRepeat",
        height: "100vh",
        color:"white"
    },
    mask:{
        position:"absolute",
        width:"100%",
        height:"100%",
        background:"rgba(0,0,0,0.3)"
    },
    cardLogin:{
        /* Parent background + Gaussian blur */
        backdropFilter: "blur(70px)",
        webkitBackdropFilter: "blur(20px)",
        backgroundColor:"transparent !important",

        /* Exclusion blend */
        backgroundBlendMode: "exclusion",

        /* Color/tint overlay + Opacity */
        background: "rgba(255, 255, 255, .6)",

        /* Tiled noise texture */
        backgroundImage: "url(data:image/png;base64,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)",

        color:"white",

        position: "absolute",
        left: "50%",
        top: "50%",
        webkitTransform: "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
        boxShadow: "0px 24px 48px 0 rgba(0,0,0,0.16)"
    },
    content:{
        padding:"5rem"
    },
    logoTernium:{
        [theme.breakpoints.up('md')]:{
            marginLeft:"8rem",
            marginRight:"8rem",
        },
        marginBottom:"3rem",
        backgroundColor:"white"
    },
    image:{
        padding:"0.25rem",
        width: "100%",
        height: "auto",
    },
    credentials:{
        paddingLeft:"2rem",
        paddingRight:"2rem"
    },
    loginButtonDiv:{
        marginTop:"5rem",
        textAlign:"center"
    },
    button:{
        fontSize:"30px",
        backgroundColor:"#E23E30",
        padding: "1rem 6rem",
        border: "0",
        transition: "all 200ms ease"
    },
    recoverPassword:{
        textAlign:"center",
        marginBottom:"2.5rem",
        
    },
    recoverLink:{
        color:"white",
        cursor:"pointer",
        "&:hover, &:focus": {
            color:"black",
            textDecoration: "none",
            cursor:"pointer"
        },

    },
    secondLine:{
        paddingTop:"3rem"
    }
}))

const Login = ({classes}) =>{
    classes = useStyles();

    const dispatch = useDispatch();

    const [usernameText, setUsernameText] = useState('');
    const [password, setPassword] = useState('');


    const getLogins = async ({}) =>{
        const response = await fetch('loginlog');
        const data = await response.json();
        console.log({ Logins: data, loading: false });
    };

    const redirecting = ()=>{
        return(
            <Redirect to={"/home"}/>
        );
    }

    const addLogin = async() =>{

        //let mySqlTimestamp = new Date().toISOString();
        let mySqlTimestamp = new Date().toISOString().slice(0, 10)+" "+new Date().toLocaleTimeString('en-GB');

        console.log(mySqlTimestamp)

        if(usernameText !== "" && password !== ""){

            //login Verify
            fetch(`login?user=${usernameText}&password=${password}`, {
                method:'POST',
                headers:{'Content-type':'application/json'}
            }).then(r=>r.json().then(res=>{
                //console.log(res);

                if(res.user !="Bad Request"){
                    //console.log(res.token);
                    dispatch(setUsernameToken(res.token))
                    //console.log(res.user);
                    dispatch(setUsernameCode(res.user))
    
                    
                    //console.log("Adding to DB");
    
    
                    //Login Logger
                    fetch(`loginlog?user=${usernameText}&date=${mySqlTimestamp}`, {
                        method:'POST',
                        headers:{'Content-type':'application/json'}
                    }).then(r=>r.json().then(res=>console.log("Uploaded")));
                    dispatch(setUsername(usernameText))
                    redirecting();
                    
                }else{
                    //console.log(res.user)
                    //console.log("Usuario y/o contraseña incorrectos");
                    alert("Usuario y/o contraseña incorrectos");
                }
            }));

            
        }else{
            alert("Sin datos de usuario, agregue información de inicio de sesión.")
        }
    }


    return (
        <div>
            <Helmet>
                <title>Ternium Trainer | Login</title>
            </Helmet>
            <div className={classes.mainDiv}>
                <div className={classes.mask}/>
                <Card className={classes.cardLogin}>
                    <div className={classes.content}>
                        <div className={classes.logoTernium}>
                            <Image className={classes.image} src="./img/corporate/Logo.png" fluid />
                        </div>
                        <div className={classes.credentials}>
                            <Form.Group>
                                <h2>Usuario</h2>
                                <Form.Control size="lg" type="text" placeholder="" type="usernameTernium" onChange={event => setUsernameText(event.target.value)}/>
                                <h2 className={classes.secondLine}>Contraseña</h2>
                                <Form.Control size="lg" type="text" placeholder="" type="password" onChange={event => setPassword(event.target.value)}/>
                            </Form.Group>
                            <div className={classes.loginButtonDiv}>
                                <Button variant="danger" className={classes.button} onClick={addLogin}>Login</Button>
                            </div>
                        </div>
                    </div>
                    {/**
                    <div className={classes.recoverPassword}>
                        <a className={classes.recoverLink}>¿Olvidaste tu contraseña?</a>
                    </div> 
                    */}
                </Card>
            </div>
        </div>
    );
}

export default Login;
