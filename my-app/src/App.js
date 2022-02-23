import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';
import Header from './Component/Header/Header';
import Map from './Component/Map/Map';
import List from './Component/List/List';
import PlaceDetails from './Component/PlaceDetails/PlaceDetails';
import {CssBaseline,Grid} from '@material-ui/core'
import { getPlaces ,getWeatherData } from './api';

const App = ()=>{

    const[places,setPlaces] =useState([])
    const[coordinates,setCoordinates] =useState({})
    const[bounds,setBound]=useState({})
    const [childClicked, setChildClicked] = useState(null);

    const [type,setType]=useState('restaurants')
     const[rating,setRating]=useState('')


    const[isloading,setloading] =useState(false)

    const[filteredPlaces,setFilteredPlaces]=useState([])
    const [weatherData,setWeatherData] =useState([])

    const [coords, setCoords] = useState({});
    const [autocomplete, setAutocomplete] = useState(null);

    //Rating useEffect

    useEffect(()=>{
      const filteredPlacess =places.filter((place)=>place.rating >=rating)
      setFilteredPlaces(filteredPlacess)
    },[rating])
    useEffect(()=>{
      navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
          setCoordinates({lat:latitude,lng:longitude})
      })
    },[])

    useEffect(()=>{
      if(bounds.sw && bounds.ne){

     
      setloading(true)
       // console.log(cordinate,bound)
        //fetch restaurant
        getWeatherData(coordinates.lat,coordinates.lng)
                              .then((data)=>{
                                setWeatherData(data)
                              })
        getPlaces(type,bounds.ne,bounds.sw)
        .then((data)=>{
        
            setPlaces(data?.filter((place)=> place.name && place.num_reviews >0))
            setFilteredPlaces([])
            setloading(false)
            
        })
      }
    },[type,bounds])

    

    return(

        <>
         <CssBaseline />
         <Header   setCoordinates={setCoordinates}/>
         <Grid container spacing={3} style={{width:"100%"}}>
             <Grid item xs={12} md={4}>
               <List  places={filteredPlaces.length ? filteredPlaces : places}
                childClicked={childClicked}
               isloading={isloading}

               type={type}
               setType={setType}

               ratring ={rating}
               setRating={setRating}
               />
             </Grid>

             <Grid item xs={12} md={8}>
               <Map
                 setCoordinates={setCoordinates}
                 setBound={setBound}
                 coordinates={coordinates}
                 places={filteredPlaces.length ? filteredPlaces : places}
                 setChildClicked={setChildClicked}
                 weatherData={weatherData}
               />
             </Grid>

         </Grid>
        </>
    )
}



export default App;


