import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from '@material-ui/core/Container';
import { Icon, InlineIcon } from '@iconify/react';
import controller from '@iconify/icons-icons8/controller';
import resizeFourDirections from '@iconify/icons-icons8/resize-four-directions';
import Button from '@material-ui/core/Button';

import {Helmet} from "react-helmet";

import Panel from "../Panel";

import Unity, { UnityContext } from "react-unity-webgl";

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
}))


const unityContext = new UnityContext({
    loaderUrl: "build/Downloads.loader.js",
    dataUrl: "build/Downloads.data",
    frameworkUrl: "build/Downloads.framework.js",
    codeUrl: "build/Downloads.wasm",
});


const Game = ({classes}) =>{
    classes = useStyles();

    function handleOnClickFullscreen() {
        unityContext.setFullscreen(true);
    }

    const [isLoaded, setIsLoaded] = useState(false);

    const loadGame = () =>{
        unityContext.on("loaded", function () {
            setIsLoaded(true);
        });
    }

    useEffect(() =>{
        loadGame();
    }, []);

    return (
        <div>
            <Helmet>
                <title>Ternium Trainer | Practica</title>
            </Helmet>
            <Panel>
                <div className={classes.contentDiv} >
                    <div className={classes.header}>
                        <h1 style={{display: "inline"}}>
                            <InlineIcon icon={controller} style={{ fontSize: 50,marginRight:"0.5rem" }} />
                            Modo Práctica
                        </h1>
                    </div>
                    <Container style={{marginTop:"2rem"}}>
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
                    </Container>
                </div>
            </Panel>
        </div>
    );
}

export default Game;
