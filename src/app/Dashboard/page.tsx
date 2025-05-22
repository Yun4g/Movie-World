'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useMovieStore from '../store/movieDataStore';
import Movie2 from '@/components/DashboardComponents/movieCategory2';
import Movie3 from '@/components/DashboardComponents/movieCategories3';
import Movie4 from '@/components/DashboardComponents/movieCategories4';

function MovieDashBoard() {
  const movieData = useMovieStore((state) => state.movieData);
  const fetchData = useMovieStore((state) => state.fetchData);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');


  const bgImages = ['/imageMovie1.jpg', '/imageMovie2.jpg'];
  const [backgroundImage, setBackgroundImage] = useState<string>(bgImages[0]);

  useEffect(() => {
 
    fetchData(searchTerm).then(() => {
    
      setSelectedYear(null);
    });
  }, [fetchData, searchTerm]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * bgImages.length);
      setBackgroundImage(bgImages[randomIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredMovies = selectedYear
    ? movieData.filter((movie) => parseInt(movie.Year, 10) === selectedYear)
    : movieData;

  return (
    <main className="flex w-full  h-full flex-col  justify-between ">
      <section
        className="relative w-full h-[300px] p-4 flex flex-col items-center justify-center transition-all duration-500 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        
        <div className="absolute inset-0 bg-black/40 z-0" />

      
        <div className="relative z-10 w-[310px] md:w-[510px] mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies..."
            className="px-4 py-2 outline-none rounded-full text-gray-200 font-bold border-2 bg-gray-500/50 text-base border-gray-400 w-full"
          />
        </div>

        {filteredMovies.length > 0 ? (
          <div className="relative z-10 bg-black/40 backdrop-blur-md w-[310px] md:w-[510px] hide-scrollbar rounded-lg p-4 max-h-[400px] overflow-y-auto">
            {filteredMovies.map((movie) => (
              <div key={movie.imdbID}>
                <Link
                  href={`/Dashboard/${movie.imdbID}`}>       
                  <h3 className="text-sm mx-2 mt-2 px-2 break-words text-blue-300">
                    {movie.Title}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="relative z-10 text-white bg-black/40 backdrop-blur-md w-[310px] md:w-[510px] flex justify-center py-4">
            search for movies above
          </p>
        )}
      </section>


      <section>
        <Movie2 />
      </section>

      <section>
         <Movie3/>
      </section>

     <section>
       <Movie4/>
     </section>
    </main>
  );
}

export default MovieDashBoard;
