import React, { useEffect } from 'react'
import Header from "../components/Header";
import { API_OPTIONS } from '../utils/constant';

const Browse = () =>{

  const getNowplayingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS) ;
    const json = await data.json();
    console.log(json.results);
  };

  // i want to call this api only once when component renders first time so we will use useeffect
  useEffect(() => {
    getNowplayingMovies();
  } , [])
  return (
    <div>
      <Header/>
    </div>
  )
}

export default Browse;