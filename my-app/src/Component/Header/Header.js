import React,{useState} from 'react'
import {Autocomplete} from '@react-google-maps/api'
import { AppBar,Toolbar,Typography,InputBase,Box } from '@material-ui/core'
import { mergeClasses } from '@material-ui/styles'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './Style'

const Header = ({setCoordinates}) => {

    const classes =useStyles()
    const[autoComplete,setAutoComplete] =useState(null)

    const onLoad=(autoC)=>setAutoComplete(autoC)

    const onPlaceChanged=()=>{
      const place =autoComplete.getPlace()
    //  const lat =place.geometry.location.lat()
    //   const lng =place.geometry.location.lng()
     
    //  console.log(place)

    //   setCoordinates(lat,lng)
      console.log("yess")
    }
  return (
    <AppBar position='static'>
        <Toolbar className={classes.toolbar}>
            <Typography variant="h5" className={classes.title}>
                 Travel Advisor
            </Typography>

            <Box display="flex">
             
            <Typography variant="h6" className={classes.title}>
                 Explore new
            </Typography>


            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}> 
                 <div className={classes.search}>

                     <div className={classes.searchIcon}>
                       <SearchIcon />
                     </div>

                     <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                 </div>
             </Autocomplete> 

            </Box>

        </Toolbar>

    </AppBar>
  )
}

export default Header