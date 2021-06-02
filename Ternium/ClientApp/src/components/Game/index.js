import React,{ useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from '@material-ui/core/Container';

import ResponsiveEmbed from 'react-responsive-embed';

import history from "../../history";
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
    }
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

    useEffect(function () {
        unityContext.on("loaded", function () {
        setIsLoaded(true);
        });
    }, []);

    return (
        <div>
            <Panel>
                <div className={classes.contentDiv} >
                    <Container>
                        <Unity
                            unityContext={unityContext}
                            matchWebGLToCanvasSize={true}
                            style={{
                                width: "100%",
                                height: "100%",
                                background: "grey",
                            }}
                        />
                    </Container>
                    <button onClick={handleOnClickFullscreen}>Fullscreen</button>
                </div>
            </Panel>
        </div>
    );
}

export default Game;
