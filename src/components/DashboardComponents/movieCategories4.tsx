import { useEffect } from "react";
import useMovieStore from "@/app/store/movieDataStore";
import Link from "next/link";
import Image from "next/image";

export default function Movie2() {
  const movieData = useMovieStore((state) => state.movieData4);
  const fetchData = useMovieStore((state) => state.fetchMovieData4);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main className="m-4 sm:m-6 md:m-9 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] p-4 sm:p-6 rounded-3xl shadow-2xl">
      <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 sm:mb-6 text-center">
        🎬Wrestling
      </h1>

      <div className="relative overflow-hidden">
        {movieData.length > 0 ? (
          <div className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto hide-scrollbar px-1 py-3 sm:px-2 sm:py-4">
            {movieData.map((movie) => (
              <div
                key={movie.imdbID}
                className="min-w-[160px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[240px] bg-white/5 rounded-xl shadow-md backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <Link
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                    movie.Title 
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-full h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px] relative">
                    <Image
                      src={
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "/placeholder.png"
                      }
                      alt={movie.Title}
                         width={300}
                        height={300}
                      fill
                      className="rounded-t-xl object-cover"
                    />
                  </div>
                  <div className="p-2 sm:p-3 text-center">
                    <h2 className="text-white text-xs sm:text-sm font-semibold truncate">
                      {movie.Title}
                    </h2>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white bg-black/40 backdrop-blur-md w-full flex justify-center py-4 rounded-lg">
            No movies found 🎥
          </p>
        )}
      </div>
    </main>
  );
}
