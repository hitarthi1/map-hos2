import React from 'react'
import  {useRef, useState, useEffect } from 'react';

import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import mapboxgl from 'mapbox-gl'
import mapStyles from '../../mapStyles';
import useStyles from './styles.js';

export default function Map({ coords, places, setCoords,type, setBounds,setChildClicked}) {

  mapboxgl.accessToken = 'pk.eyJ1IjoiaGl0YXJ0aGkwMSIsImEiOiJjbDExa2lmb3IwMmliM2RwNHhobXluODVhIn0.fcHve_vB4qC3LOzTgaeIvw';

//  const matches = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
 
   const mapContainer = useRef(null);
   const map = useRef(null);
   const [lng, setLng] = useState(-70.9);
   const [lat, setLat] = useState(42.35);
   const [zoom, setZoom] = useState(3);
   const [bo,setBo]=useState('')

  


  useEffect(() => {
   
   const  map = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [(coords.lng)?coords.lng:lng ,(coords.lat)?coords.lat:lat ],
    zoom: zoom
    });

    async function getHoss(){
      places.forEach((hos,i) => {
        
          if (i===i) {
            places[i].type= "Feature";
            places[i].geometry= {
                "type": "Point",
                "coordinates": [
                 `${ hos.location.coordinates[0]}`,
                 `${ hos.location.coordinates[1]}`
                ]
              };
              places[i].properties= {
               "title" :`${hos.hospitalId}` ,
               "typeHC":`${hos.typeHC}`              };
          //       delete places[i].createdAt;
          // delete places[i].hospitalId;
          // delete places[i].image_url;
          // delete places[i].location;
          // delete places[i].name;
          // delete places[i].phone;
          // delete places[i].rating;
          // delete places[i].spetiality;
          // delete places[i].typeHC;
          // delete places[i].web_url;

          }
      });
        console.log("map",{places});
      
       
    }

    getHoss();
    map.on('load', function () {
      map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        function (error, image) {
          if (error) throw error;
          map.addImage('custom-marker', image);
          // Add a GeoJSON source with multiple points
          map.addSource('points', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: places,
            },
          });
          // Add a symbol layer
          map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'points',
            layout: {
              'icon-image': 'custom-marker',
              // get the title name from the source's "title" property
              'text-field': ['get', 'title'],
              'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
              'text-offset': [0, 1.25],
              'text-anchor': 'top',
            },
          });
          map.setFilter('points', ['==', ['string', ['get', 'typeHC']], `${type}`]);

        }
      );
    });
    map.on('click', (event) => {
      // If the user clicked on one of your markers, get its information.
      const features = map.queryRenderedFeatures(event.point, {
        layers: ['points'] // replace with your layer name
      });
      if (!features.length) {
        return;
      }
      const feature = features[0];
      console.log({feature});
    
      // Code from the next step will go here.
    });

      

  
      //if (!map.current) return; // wait for map to initialize
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      

      map.on('move', () => {
        setCoords({ lat:map.getCenter().lng.toFixed(4) , lng: map.getCenter().lat.toFixed(4) });
       // setBounds({ ne: map.getBounds()._ne.toFixed(1), sw: map.getBounds()._sw.toFixed(1) });
        setZoom(map.getZoom().toFixed(2));
       // setBo(map.getBounds()._ne.lat.toFixed(1))
       // console.log(bo,"this os 8888883");
      //   if (map.getLayer('points')){
      //     map.removeLayer('points');
      // }
      
      // if (map.getSource('point')){
      //     map.removeSource('point');
      // }
      });
      return () => map.remove();

    },[places]);
   
   



 

//cooorinates set karvana che google mate
//https://console.cloud.google.com/projectcreate ...H-advisor ..create..switch to your project ...api ...dashbord...search for maps
//map javascript api enable..click on api ..credential ...create credential ...click apikey..
//devloper only mateni error mate stackovetflow edit api key

  return (
    <div >
      <div ref={mapContainer} className={classes.mapContainer} />
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </div>
  )
}
