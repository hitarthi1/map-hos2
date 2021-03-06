import React from 'react'
import {Autocomplete} from '@react-google-maps/api'
import { AppBar,Toolbar, Typography,InputBase, Box } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'


import useStyles from './styles'
//this is hook
//here autocomplete is commented out
//Explore new places/hospitals  aa lambu hovathi search box ni ui bagade che k bagdelij che



export default function Header() {
    const classes = useStyles();
  return (
   <AppBar position='static'>
       <Toolbar className={classes.toolbar}>
           <Typography variant='h5' className={classes.title}>
           Hospital Finder
           </Typography>
           <Box display="flex">
            <Typography variant='h5' className={classes.title}>
               Explore new hospitals

            </Typography>
            {/* <Autocomplete> */}
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                    <InputBase placeholder="Search..." className={{root :classes.inputRoot, input :classes.inpuInput}}/>
                </div>
            {/* </Autocomplete> */}
           </Box>

       </Toolbar>

   </AppBar>
  )
}
