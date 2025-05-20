// store/movieDataStore.tsx
import { create } from "zustand";
import axios from "axios";



export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export interface User {
  Id: string;
  username: string;
  email: string;
}

export interface MovieType {
  movieData: Movie[];
  movieData2: Movie[];
  movieData3: Movie[];
  movieData4: Movie[];
  fetchData: (searchTerm: string) => Promise<void>;
  fetchMovieData2: () => Promise<void>;
  fetchMovieData3: () => Promise<void>;
  fetchMovieData4: () => Promise<void>;
  user: User | null;
  token: string | null;
  logout: () => void;
}

const useMovieStore = create<MovieType>((set) => ({
  movieData: [],
  movieData2: [],
  movieData3: [],
  movieData4: [],
  user: null,
  token: null,

  fetchData: async (searchTerm) => {
    try {
      const response = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: "86278648",
          s: searchTerm,
        },
      });
      if (response.data.Response === "True") {
        set({ movieData: response.data.Search });
      } else {
        set({ movieData: [] });
        console.error("Error fetching movies:", response.data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  },

  fetchMovieData2: async () => {
    try {
      const res = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: "86278648",
          s: "Avatar",
        },
      });
      if (res.data.Response === "True") {
        set({ movieData2: res.data.Search });
      } else {
        set({ movieData2: [] });
        console.error("Error fetching movies (Merlin):", res.data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies :", error);
    }
  },

  fetchMovieData3: async () => {
    try {
      const res = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: "86278648",
          s: "Avenge",
        },
      });
      if (res.data.Response === "True") {
        set({ movieData3: res.data.Search });
      } else {
        set({ movieData3: [] });
        console.error("Error fetching movies (superman):", res.data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies (superman):", error);
    }
  },

  fetchMovieData4: async () => {
    try {
      const res = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: "86278648",
          s: "WWE",
        },
      });
      if (res.data.Response === "True") {
        set({ movieData4: res.data.Search });
      } else {
        set({ movieData4: [] });
        console.error("Error fetching movies (lord of the rings):", res.data.Error);
      }
    } catch (error) {
      console.error("Error fetching movies (lord of the rings):", error);
    }
  },

  logout: () => {
    set({ user: null, token: null });
  },
}));

export default useMovieStore;
