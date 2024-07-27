
import React from 'react'
import {  useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailor';

const VideoBackground = ({movieId}) => {
  
  const trailorVideo = useSelector((store) => store.movies?.trailerVideo);

 // console.log(trailorVideo);
  useMovieTrailer(movieId);
 
  //console.log(movies);
  
  console.log(trailorVideo);
  //console.log(movieId)
 
  // console.log(size);



  return (
    <div className='w-screen'>
      <iframe  className='w-screen aspect-video'
      src={"https://www.youtube.com/embed/" + trailorVideo?.key + "?&autoplay=1&mute=1"} 
      title ="YouTube video player"  
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" >
      

      </iframe>
    </div>
  )
}

export default VideoBackground