'use client'
import { useState, useEffect } from "react"
import axios from "axios"
import Loading from "../../loading";
import { Movie } from "../../store/movieDataStore";
import { useParams } from "next/navigation";
import Link from "next/link";



export default function MovieId() {

  const [movieData, setMovieData] = useState<Movie | null>(null)
  const [trailerId, setTrailerId] = useState<string | null>(null)

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

  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const fetchYouTubeTrailer = async (title: string): Promise<string | null> => {
  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: `${title}`,
        key: YOUTUBE_API_KEY,
        maxResults: 1,
        type: "video"
      }
    });

    if (response.data.items.length === 0) {
      console.error("No trailer found");
      return null;
    }
    return response.data.items[0]?.id?.videoId || null;
  } catch (error) {
    console.error("Error fetching trailer:", error);
    return null;
  }
};
  useEffect(() => {
    getMovieId()
   
  }, [id])

  useEffect(() => {
    if (movieData) {
      fetchYouTubeTrailer(movieData.Title).then((trailerId) => {
          setTrailerId(trailerId);
        })
    }
  }
  , [movieData]);

  if (!movieData) {
    return (
      <div>
        <Loading />
      </div>
    )
  }




  return (
    <div className="">

      <div className="m-4 sm:m-6 md:m-9 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-2 rounded-3xl shadow-2xl shadow-gray-900/50">
       <Link href={`/Dashboard/`} className="text-base text-white  my-4"> Back to Dashbord   </Link>
       
        <iframe
          className="w-full h-[200px] md:h-[500px] rounded-lg shadow-lg"
          src={`https://www.youtube.com/embed/${trailerId}`}
          title="YouTube Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
                      <Link href={`https://www.youtube.com/results?search_query=${encodeURIComponent( movieData.Title )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 transition duration-300"
                        >
                        Click here to watch full movie on youtube on YouTube                 
                        </Link>
        <div className="flex flex-col md:flex-row gap-4">
       
          <div className="w-full  md:w-1/2">
            <h2 className="text-2xl text-gray-400 font-bold">Overview</h2>
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