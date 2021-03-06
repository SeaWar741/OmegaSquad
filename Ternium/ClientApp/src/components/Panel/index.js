import React,{ useCallbac,useState } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//Redux
import { useSelector } from 'react-redux';

import { InlineIcon } from '@iconify/react';
import home from '@iconify/icons-icons8/home';
import controller from '@iconify/icons-icons8/controller';
import createNew from '@iconify/icons-icons8/create-new';
import barChart  from '@iconify/icons-icons8/bar-chart';
import services from '@iconify/icons-icons8/services';
import trophy from '@iconify/icons-icons8/trophy';
import {NavLink } from 'react-router-dom';

import './panel.css';

import MobileDrawer from  './MobileDrawer.js';

const drawerWidth = 125;

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]:{
      display:"flex",
      height: "100vh"
    },
    backgroundImage: "url('./img/backgrounds/Login.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "noRepeat",
    boxShadow: "inset 0 0 0 50vw rgba(0,0,0,0.3)",
    [theme.breakpoints.down('sm')]:{
      minHeight: "100vh"
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    /* Parent background + Gaussian blur */
    backdropFilter: "blur(70px)",
    webkitBackdropFilter: "blur(20px)",

    /* Exclusion blend */
    backgroundBlendMode: "exclusion",

    /* Color/tint overlay + Opacity */

    /* Tiled noise texture */
    backgroundImage: "url(data:image/png;base64,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)",

  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:"transparent"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(6),
    
  },
  list:{
    backgroundColor:"transparent !important",
  },
  circle:{
    width: "10.5vw",
    height: "12vh",
    borderRadius: "50%",
    background: "linear-gradient(66deg, rgba(255,214,0,1) 17%, rgba(255,0,0,1) 100%)",
    textAlign:"center",
    color:"white",
    fontSize:"3vw",
    fontWeight:"bold"
  },
  buttonMain:{
    textAlign:"center",
    marginTop:"2rem"
  },
  buttons:{
    fontSize: 60,
    margin: '0 auto',
    display: "flex",
    color:"white"
  }
}));

function Panel(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const username = useSelector(state => state.usernameState.username)
  const nameLetter = username.charAt(0).toUpperCase();

  //console.log(nameLetter)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    <div>
      <div className={classes.toolbar} />
        <List>
            <ListItem button key={"User"} className={classes.buttonMain}>
                <div className={classes.circle}>
                    <div style={{position: "relative", top: "15%"}}>
                        {nameLetter}
                    </div>
                </div>
            </ListItem>
            <NavLink to="/home">
              <ListItem button key={"Home"} style={{textAlign:"center",marginTop:"3rem"}}>
                  <InlineIcon icon={home} className={classes.buttons}/>
              </ListItem>
            </NavLink>
            <NavLink to="/game">
              <ListItem button key={"Game"} className={classes.buttonMain}>
                  <InlineIcon icon={controller} className={classes.buttons}/>
              </ListItem>
            </NavLink>
            <NavLink to="/test">
              <ListItem button key={"test"} className={classes.buttonMain}>
                  <InlineIcon icon={createNew} className={classes.buttons}/>
              </ListItem>
            </NavLink>
            <NavLink to="/stats">
              <ListItem button key={"stats"} className={classes.buttonMain}>
                  <InlineIcon icon={barChart } className={classes.buttons}/>
              </ListItem>
            </NavLink>
            <NavLink to="/leaderboard">
              <ListItem button key={"Leaderboard"} className={classes.buttonMain}>
                  <InlineIcon icon={trophy} className={classes.buttons}/>
              </ListItem>
            </NavLink>
            <NavLink to="/settings">
              <ListItem button key={"Config"} style={{textAlign:"center",marginTop:"4rem",position: "fixed", bottom: "0"}}>
                  <InlineIcon icon={services} className={classes.buttons}/>
              </ListItem>
            </NavLink>
        </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  

  return (
    <div className={classes.root}>
        <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden xsDown implementation="css">
              <Drawer
                  classes={{
                  paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
              >
                  {drawer}
              </Drawer>
            </Hidden>
        </nav>
        
        <Hidden smUp implementation="css">
            <MobileDrawer/>
        </Hidden>


        <main className={classes.content}>
            
            <div className={classes.toolbar} />
            {/*Aqui va la seccion principal, se cargan los componentes */}
            <div>
                {props.children}
            </div>
        </main>
    </div>
  );
}

Panel.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Panel;
