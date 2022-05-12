import React, {useRef, useState, useEffect } from 'react';
import {CssBaseline,Grid} from '@material-ui/core'
import mapboxgl from 'mapbox-gl'

import {getPlacesData,getPlacesData2 } from './api/travelAdvisorAPI'
import Header from './components/Header/Header'
import List from './components/List/List'
import Map from './components/Map/Map'
//import Tap from './components/Tap/Tap'

import PlaceDetails from './components/PlaceDetails/PlaceDetails'

export default function App() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaGl0YXJ0aGkwMSIsImEiOiJjbDExa2lmb3IwMmliM2RwNHhobXluODVhIn0.fcHve_vB4qC3LOzTgaeIvw';

  const [type, setType] = useState('Hospital');
  const [rating, setRating] = useState('');
  const [places, setPlaces] = useState([]);
  const [data, setData] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);


  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});

  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
    //   console.log({coords});
    //   setCoords({ lat: latitude, lng: longitude });
    // });
    if(navigator.geolocation){
      var location_timeout = setTimeout( 10000);
      navigator.geolocation.getCurrentPosition((e) => {
        clearTimeout(location_timeout);
        console.log({e});
        setCoords({ lat: e.coords.latitude, lng:e.coords.longitude });
        console.log({coords})
      });
    }else{
      console.log(navigator.geolocation,"amh")
    }
  }, []);

    
  useEffect(() => {
    
    if (bounds) {
      // setIsLoading(true);
       // getPlacesData(bounds.sw, bounds.ne )
       //   .then((data) => {
       //     console.log("this is data",data);
       //     setPlaces(data);
       //     setIsLoading(false);
       //   });
         getPlacesData2(bounds.sw, bounds.ne )
         .then((data) => {
           console.log("this ism is is is  data",data);
           setData(data);
          // setIsLoading(false);
          setIsLoading(true);
      const filtered = data.filter((data)=> data.typeHC===type);
      setPlaces(filtered);
    //  console.log( "this is fplaces",filtered);
      console.log( "this is places",places);
      setIsLoading(false);
         });
       }
    // if(data.length){
    //   setIsLoading(true);
    //   const filtered = setPlaces(data.filter((data)=> data.typeHC===type));
    //   setPlaces(filtered);
    //   console.log( "this is places",places);
    //   setIsLoading(false);
  
    // }
   
  }, []);
  useEffect(() => {
    //setIsLoading(true);
    console.log("type change thay tyre data",data)
    // const filtered = ;
    console.log({type})
    setPlaces(data.filter((data)=> data.typeHC==type));
    setPlaces(data.filter((data)=> data.typeHC===type));

   // setIsLoading(false);
    console.log( "ohh",places);

  }, [type]);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);


  return (
    <div>
     
        <CssBaseline/>
        <Header/>
        <Grid container spacing={3}  style={{width :'100%'}}>
          <Grid item xs={12} md={4}>
            <List 
             places={filteredPlaces.length ? filteredPlaces : places}
             isLoading={isLoading}
             childClicked={childClicked}
             type={type}
             setType={setType}
             rating={rating}
            setRating={setRating}
            />

          </Grid>
          <Grid item xs={12} md={8}>
            <Map
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            type={type}
            places={ places}
            //filteredPlaces.length ? filteredPlaces :
            setChildClicked={setChildClicked}
            />
            </Grid>
        </Grid>
          </div>
  )
}
