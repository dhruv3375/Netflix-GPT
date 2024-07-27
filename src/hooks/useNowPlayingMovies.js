import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";




const useNowPlayingMovies = () => {
    // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const getNowplayingMovies = async () => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS) ;
    const json = await data.json();
    //console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
  };

  // i want to call this api only once when component renders first time so we will use useeffect
  useEffect(() => {
    getNowplayingMovies();
  } , [])
};
export default useNowPlayingMovies;