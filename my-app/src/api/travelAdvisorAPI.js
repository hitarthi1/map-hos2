import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

//const res = await fetch('./api/v1/hospitals');
//const res = await fetch('.../store_locator_api/api/v1/hospitals');

const URL2 ='http://localhost:5000/api/v1/hospitals'


export const getPlacesData = async (sw,ne) => {
  try{

    const { data: { data } }= await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': '3aa7ab146amshd3eaa21b92e7062p15f719jsnf015b7bb19ac'
      }
    })

    return data;
    }  catch (error) {   
    console.log(error);
  }
}
//sw,ne
export const getPlacesData2 = async () => {
  try{

    const { data: { data } }= await axios.get(URL2, {
      // params: {
      //   bl_latitude: sw.lat,
      //   bl_longitude: sw.lng,
      //   tr_longitude: ne.lng,
      //   tr_latitude: ne.lat,
      // },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': '3aa7ab146amshd3eaa21b92e7062p15f719jsnf015b7bb19ac'
      }
    })

    return data;
    }  catch (error) {   
    console.log(error);
  }
}


