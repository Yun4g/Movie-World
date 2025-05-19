
import LandingPage from "@/components/LandingPage/landing";
import Navbar from "@/components/navbar";



export default function Home() {



  return (
    <main>    
      <header className="fixed top-0 left-0 w-full z-[1000] backdrop-blur-sm">
         <Navbar/>
     </header> 
       <LandingPage/>
    </main>
  );
};
