import React, { Children, useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyle from './Style'
import mapStyles from './mapStyles'

const Map = ({setCoordinates,setBound,coordinates,places,setChildClicked,weatherData}) => {
    const classes =useStyle()
    const isDektop= useMediaQuery('(min-width:600px)')

    
   //const coordinates={lat:0,lng:0}
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
      // bootstrapURLKeys={{key:'AIzaSyCCfOlf71dAS1u0Z1COwWK2S3tOs0ZzaWY'}}
       bootstrapURLKeys={{key:'AIzaSyCCfOlf71dAS1u0Z1COwWK2S3tOs0ZzaWY'}}
       defaultCenter={coordinates}
       center={coordinates}
       defaultZoom={14}
       margin={[50,50,50,50]}
       options={{disableDefaultUI:true,zoomControl:true,styles:mapStyles}}
       onChange={(e) => {

    
        setCoordinates({ lat: e.center.lat, lng: e.center.lng });
        setBound({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
       }}
       onChildClick={(child) => setChildClicked(child)}
      >

        {
          places?.map((place,i)=>(
            <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
            >
              {
                !isDektop ?(
                  <LocationOnOutlinedIcon color="primary" fontSize='large'/>
                ) :
                (
                  <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitl2" gutterBottom></Typography>
                    {place.name}

                    <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                    />
                    <Rating  size="small" value={Number(place.rating)} readOnly/>
                  </Paper>
                )
              }

            </div>
          ))
        }

        {
          weatherData?.list?.map((data,i)=>(
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
           <img  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
            </div>
          ))
        }


      </GoogleMapReact>
    </div>
  )
}

export default Map