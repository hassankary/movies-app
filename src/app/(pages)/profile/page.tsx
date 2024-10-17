"use client";
import { useEffect, useState } from "react";
import { authorizations as KEY } from "@/app/libs/authorization";
import { Card } from "@/app/components/Card";
import { FaUserCircle } from "react-icons/fa";

interface DataMovies {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function Profile() {
  const [popular, setPopular] = useState<DataMovies[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [likedMovies, setLikedMovies] = useState<number[]>([]);

  const fetchPopularMovies = async () => {
    const fetchMovies = async (page: number) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${KEY}`,
          },
        }
      );
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return (await res.json()).results;
    };

    try {
      const movies = await Promise.all([
        fetchMovies(1),
        fetchMovies(2),
        fetchMovies(3),
      ]);
      setPopular(movies.flat());
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
    const savedLikes = JSON.parse(localStorage.getItem("likedMovies") || "[]");
    setLikedMovies(savedLikes);
  }, []);

  const toggleLike = (id: number) => {
    setLikedMovies((prev) => {
      const updatedLikes = prev.includes(id)
        ? prev.filter((likeId) => likeId !== id)
        : [...prev, id];
      localStorage.setItem("likedMovies", JSON.stringify(updatedLikes));
      return updatedLikes;
    });
  };

  const filteredMovies = popular?.filter((d) => likedMovies.includes(d.id));

  return (
    <div className="container profile-container flex flex-col mx-auto px-4 xl:max-w-7xl">
      <div className="h-full flex flex-col flex-grow">
        <div className="flex items-center py-2 gap-x-4 mt-5 sm:mt-8">
          <FaUserCircle className=" w-[85px] h-[85px] sm:w-24 sm:h-24 animate-fade-up animate-duration-500" />
          <h1 className=" text-xl sm:text-3xl font-bold animate-fade-right animate-duration-500">
            Guest
          </h1>
        </div>
        <div className="mt-5 sm:mt-8 px-3 py-2 text-lg font-semibold border-l-4 border-[#E50914] overflow-hidden">
          <h1 className="animate-fade-right animate-duration-500">
            My Favorite Movies
          </h1>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-4 gap-4 sm:gap-x-6 sm:gap-y-8">
          {isLoading
            ? ["", "", "", "", "", ""].map((d, i) => (
                <div
                  key={i}
                  className={` flex aspect-[4/6] bg-[#212121] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out animate-pulse`}
                >
                  {d}
                </div>
              ))
            : filteredMovies.length !== 0
            ? filteredMovies.map((d, i) => (
                <Card
                  key={d.id + i}
                  src={`https://image.tmdb.org/t/p/w500${d.poster_path}`}
                  alt={d.original_title}
                  title={d.title}
                  release={d.release_date.substring(0, 4)}
                  rating={parseFloat(d.vote_average.toFixed(1))}
                  toggleLike={() => toggleLike(d.id)}
                  likedMovies={likedMovies.includes(d.id)}
                />
              ))
            : null}
        </div>
        {!isLoading && filteredMovies.length === 0 ? (
          <div className="h-full flex flex-grow justify-center items-center font-semibold">
            <h1 className="animate-fade-up animate-duration-500">Not Found</h1>
          </div>
        ) : null}
      </div>
    </div>
  );
}
