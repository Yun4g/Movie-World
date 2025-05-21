import { useRouter } from "next/router";
import {useState, useEffect} from "react"
import axios from "axios"
import Loading from "../loading";
import { Movie } from "../store/movieDataStore";






export default function MovieId  (){
    const router = useRouter();
    const  {id} = router.query
   const [movieData , setMovieData] = useState<Movie | null>(null)



      const getMovieId = async ()=>{
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
   useEffect(()=>{
     getMovieId()
   },[id])

    if(!movieData){
       return(
         <div>
             <Loading/>
         </div>
       )
    }


     const SearchForTrailerOnYoutube = `https://www.youtube.com/results?search_query=${encodeURIComponent(movieData.Title + " trailer")}`


      return (
        <div className="">


             
        </div>
      )
}