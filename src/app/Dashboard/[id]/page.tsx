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


  const SearchForTrailerOnYoutube = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieData.Title + " trailer")}`


  return (
    <div className="">

      <div>
        <iframe
          className="w-full h-full rounded-xl shadow-lg"
          src={SearchForTrailerOnYoutube}
          title="YouTube Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>


    </div>
  )
}