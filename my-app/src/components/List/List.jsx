import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select, Card } from '@material-ui/core';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles.js';

export default function List({places,type,isLoading,setType,rating,setRating}) {
  //const [elRefs, setElRefs] = useState([]);

  const classes = useStyles();
 
  return (
    <div className={classes.container}>
            <Typography variant="h4">Hospital,Medical store and Blood bank arond you</Typography>
            {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
              <FormControl className={classes.formControl}>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)} >
              <MenuItem value="Hospital">Hospital</MenuItem>
              <MenuItem value="Medical store">Medical store</MenuItem>
              <MenuItem value="Blood bank">Blood bank</MenuItem>
                </Select>
                </FormControl>
              

              <FormControl className={classes.formControl}>
             <InputLabel id="rating">Rating</InputLabel>
             <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
             </Select>
               </FormControl>

               <Grid container spacing={3} className={classes.list}>
               {places?.map((place, i) => (
              <Grid  key={i} item xs={12}>
                   <PlaceDetails place={place}/>
              </Grid>
            ))}
                 </Grid>
                 </>
      )}          
      </div>

  )
}
