import React from "react";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) =>({
    sidebar:{
        margin: "0",
        padding: "0",
        width: "200px",
        backgroundColor: "#f1f1f1",
        position: "fixed",
        height: "100%",
        overflow: "auto",
        '@media screen and (max-width: 800px)' : {
            width: "100%",
            height: "auto",
            position: "relative"
        }
    },
    elementMenu:{
        display: "block",
        color: "black",
        padding: "16px",
        textDecoration: "none",
        '&:active': {
            backgroundColor: "#4CAF50",
            color: "white"
        },
        '&:hover:not': {
            backgroundColor: "#555",
            color: "white"
        },
        '@media screen and (max-width: 800px)' : {
            float: "left"
        },
        '@media screen and (max-width: 400px)' : {
            textAlign: "center",
            float: "none"
        }
    },
    content:{
        marginLeft: "200px",
        padding: "1px 16px",
        height: "1000px",
        '@media screen and (max-width: 800px)' : {
            marginLeft: "0"
        }
    }
}))

const Panel = ({classes}) =>{
    classes = useStyles();


    return (
        <div>
            <div className={classes.sidebar}>
                <a className={classes.elementMenu}  href="/home">Home</a>
                <a className={classes.elementMenu}  href="/game">Game</a>
                <a className={classes.elementMenu}  href="/leaderboard">Leaderboard</a>
                <a className={classes.elementMenu}  href="/stats">Stats</a>
            </div>

            <div className={classes.content}>
                <h2>Responsive Sidebar Example</h2>
                <p>This example use media queries to transform the sidebar to a top navigation bar when the screen size is 700px or less.</p>
                <p>We have also added a media query for screens that are 400px or less, which will vertically stack and center the navigation links.</p>
                <h3>Resize the browser window to see the effect.</h3>
            </div>
        </div>
    );
}

export default Panel;
