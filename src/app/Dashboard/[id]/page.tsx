'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import Loading from "../../loading";
import { Movie } from "../../store/movieDataStore";
import { useParams } from "next/navigation";



export default function MovieId() {

  const [movieData, setMovieData] = useState<Movie | null>(null)

   console.log(movieData)

     const {id} = useParams<{ id: string }>();


  const getMovieId = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=86278648&i=${id}`);
      if (response.data.Response === "True") {
        console.log(response)
        setMovieData(response.data)
      } else {
        console.error("Error fetching movies:", response.data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
  useEffect(() => {
    getMovieId()
  }, [id])

  if (!movieData) {
    return (
      <div>
        <Loading />
      </div>
    )
  }




  return (
    <div className="">

      <div>
        <iframe
          className="w-full h-[500px] rounded-lg shadow-lg"
          src={`https://www.youtube.com/results?search_query=${encodeURIComponent(movieData.Title + " trailer")}`}
          title="YouTube Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <p className=""> playing {movieData.Title} trailer</p> 
        <div className="flex flex-col md:flex-row gap-4">
       
          <div className="w-full  md:w-1/2">
            <h2 className="text-2xl font-bold">{movieData.Title}</h2>
            <p className="text-gray-600">{movieData.Plot}</p>
            <p className="text-gray-600">Release Date: {movieData.Released}</p>
            <p className="text-gray-600">Director: {movieData.Director}</p>
            <p className="text-gray-600">Actors: {movieData.Actors}</p>
            <p className="text-gray-600">Genre: {movieData.Genre}</p>
  
          </div>

      </div>


    </div>
    </div>
  )
}