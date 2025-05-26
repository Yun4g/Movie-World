'use client'

import { useState, useEffect } from "react"
import axios from "axios"
import Loading from "../../loading"
import { Movie } from "../../store/movieDataStore"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function MovieId() {
  const [movieData, setMovieData] = useState<Movie | null>(null)
  const [trailerId, setTrailerId] = useState<string | null>(null)

  const { id } = useParams<{ id: string }>()

  const getMovieId = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=86278648&i=${id}`)
      if (response.data.Response === "True") {
        setMovieData(response.data)
      } else {
        console.error("Error fetching movie:", response.data.Error)
      }
    } catch (error) {
      console.error("Error fetching movie:", error)
    }
  }

  const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

  const fetchYouTubeTrailer = async (title: string): Promise<string | null> => {
    try {
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: `${title} Trailer`,
          key: YOUTUBE_API_KEY,
          maxResults: 1,
          type: "video",
        },
      })

      if (response.data.items.length === 0) {
        console.error("No trailer found")
        return null
      }

      return response.data.items[0]?.id?.videoId || null
    } catch (error) {
      console.error("Error fetching trailer:", error)
      return null
    }
  }

  useEffect(() => {
    getMovieId()
  }, [id])

  useEffect(() => {
    if (movieData) {
      fetchYouTubeTrailer(movieData.Title).then(setTrailerId)
    }
  }, [movieData])

  if (!movieData) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="m-4 sm:m-6 md:m-9 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-4 rounded-3xl shadow-2xl shadow-gray-900/50">
        <div className="flex flex-col items-center justify-center">
          <Link href="/Dashboard/" className="text-base text-blue-500 hover:text-blue-700 my-4">
            ← Back to Dashboard
          </Link>
        </div>

  
        {trailerId ? (
          <div className="relative w-full pb-[56.25%] rounded-lg shadow-lg overflow-hidden my-4">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${trailerId}?rel=0&modestbranding=1`}
              title="YouTube Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className="text-center text-red-400">Trailer not available </p>
        )}

        <p className="text-lg font-semibold text-red-500 mb-2 text-center">{movieData.Title}</p>
        <div className="text-center mb-6">
          <Link
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movieData.Title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 underline"
          >
            Click here to watch full movie on YouTube
          </Link>
        </div>

        {/* Movie Details */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl text-gray-300 font-bold mb-2">Overview</h2>
            <p className="text-gray-400 mb-2">{movieData.Plot}</p>
            <p className="text-gray-400 mb-1">🎬 <strong>Release:</strong> {movieData.Released}</p>
            <p className="text-gray-400 mb-1">🎥 <strong>Director:</strong> {movieData.Director}</p>
            <p className="text-gray-400 mb-1">⭐ <strong>Actors:</strong> {movieData.Actors}</p>
            <p className="text-gray-400 mb-1">📚 <strong>Genre:</strong> {movieData.Genre}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
