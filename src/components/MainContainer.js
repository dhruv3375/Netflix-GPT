import React from 'react'
import { useSelector } from 'react-redux'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'

const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies);
    //Early Return
    if(movies === null) return;


    // lets sat out of 20 , first movie is my main movie
    const mainMovie = movies[0];
    //console.log(mainMovie);

    const { original_title , overview , id} = mainMovie;
    
    return (
    <div>
        <VideoTitle title = {original_title} overview = {overview} />

        <VideoBackground movieId = {id}  />

    </div>
  )
}

export default MainContainer