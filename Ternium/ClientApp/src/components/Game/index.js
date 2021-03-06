import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from '@material-ui/core/Container';
import { Icon, InlineIcon } from '@iconify/react';
import controller from '@iconify/icons-icons8/controller';
import resizeFourDirections from '@iconify/icons-icons8/resize-four-directions';
import Button from '@material-ui/core/Button';
import Fade from 'react-reveal/Fade';

import {Helmet} from "react-helmet";

import Panel from "../PanelGame";

import Unity, { UnityContext } from "react-unity-webgl";

//Redux
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) =>({
    contentDiv:{
        marginLeft:"1rem",
        backgroundColor:"white",
        padding:"2rem",
        minHeight:"90vh",
    },
    gameDiv:{
        msTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
        margin: "0",
        position: "absolute",
        top: "50%"
    },
    header:{
        display:"inline-block"
    },
    gameOverlay:{
        position: "fixed", /* Sit on top of the page content */
        //display: "none", /* Hidden by default */
        width: "100%", /* Full width (cover the whole page) */
        height: "100%", /* Full height (cover the whole page) */
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        //backgroundColor:"red",
        zIndex: "20000000", /* Specify a stack order in case you're using a different order for other elements */
        pointerEvents: "auto",
        cursor: "pointer" /* Add a pointer on hover */
    }
}))


const unityContext = new UnityContext({
    loaderUrl: "https://firebasestorage.googleapis.com/v0/b/newagent-7ceb9.appspot.com/o/Ternium%2Fjuego.loader.js?alt=media&token=647a6468-e23a-4603-b573-32ffd028657a",
    dataUrl: "https://firebasestorage.googleapis.com/v0/b/newagent-7ceb9.appspot.com/o/Ternium%2Fjuego.data?alt=media&token=d16305a6-24d9-4d31-9834-ebae508c9b85",
    frameworkUrl: "https://firebasestorage.googleapis.com/v0/b/newagent-7ceb9.appspot.com/o/Ternium%2Fjuego.framework.js?alt=media&token=9f61e408-303e-4b56-af93-487da7087b3b",
    codeUrl: "https://firebasestorage.googleapis.com/v0/b/newagent-7ceb9.appspot.com/o/Ternium%2Fjuego.wasm?alt=media&token=29a27148-60f2-4e31-9ed5-386657e5efb9",
});


const Game = ({classes}) =>{
    classes = useStyles();

    
    const username = useSelector(state => state.usernameState.username);
    const [isLoaded, setIsLoaded] = useState(false);
    const [didError, setDidError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function setUsernameGame() {
        unityContext.send("Data Publisher", "SetUsername", username);
        console.log("setting username");
    }

    const loadGame = () =>{
        unityContext.on("loaded", function () {
            setIsLoaded(true);
        });
    }

    function handleOnClickFullscreen() {
        unityContext.setFullscreen(true);
        setUsernameGame()
    }

    const UnityGame = () => {
        return(
            <div>
                <Unity
                    unityContext={unityContext}
                    matchWebGLToCanvasSize={true}
                    style={{
                            width: "100%",
                            height: "100%",
                            background: "black",
                        }}
                />
                <Button onClick={handleOnClickFullscreen} style={{float:"right"}}>
                    <InlineIcon icon={resizeFourDirections} style={{ fontSize: 50}} />
                </Button>
            </div>
            
        )
    }

    useEffect(() =>{
        unityContext.on("error", function (message) {
          setDidError(true);
          setErrorMessage(message);
        });

        unityContext.on("quitted", function () {
            setDidError(true);
            console.log("BYE");
        });

    }, []);



    return (
        <div>
            <Helmet>
                <title>Ternium Trainer | Practica</title>
            </Helmet>
            <Panel>
                <Fade big>
                    <div className={classes.contentDiv} >
                        <div className={classes.header}>
                            <h1 style={{display: "inline"}}>
                                <InlineIcon icon={controller} style={{ fontSize: 50,marginRight:"0.5rem" }} />
                                Modo Pr??ctica
                            </h1>
                        </div>
                        <Container style={{marginTop:"2rem"}} onClick={setUsernameGame}>
                            {didError===false?<UnityGame/>:<p>Error cargando el juego</p>}
                        </Container>
                    </div>
                </Fade>
            </Panel>
        </div>
    );
}

export default Game;
