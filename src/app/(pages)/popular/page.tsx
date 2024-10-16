"use client";
import { useEffect, useState } from "react";
import { authorizations } from "@/app/libs/authorization";
import { Card } from "@/app/components/Card";

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

export default function Popular() {
  const [popular, setPopular] = useState<DataMovies[]>([]);
  const [more, setMore] = useState(6);
  const [likedMovies, setLikedMovies] = useState<number[]>([]);

  const fetchPopularMovies = async () => {
    const fetchMovies = async (page: number) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: authorizations,
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

  return (
    <div className="container mx-auto px-4 xl:max-w-7xl">
      <div className="flex flex-col">
        <div className="mt-8 px-3 py-2 text-lg font-semibold border-l-4 border-[#E50914] overflow-hidden">
          <h1 className="animate-fade-right animate-duration-500">
            All Popular Movies
          </h1>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-4 gap-4 sm:gap-x-6 sm:gap-y-8">
          {popular.length === 0
            ? ["", "", "", "", "", ""].map((d, i) => (
                <div
                  key={i}
                  className={` flex aspect-[4/6] bg-[#212121] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out animate-pulse`}
                >
                  {d}
                </div>
              ))
            : popular
                .slice(0, more)
                .map((d, i) => (
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
                ))}
        </div>
        {more < popular.length ? (
          <div className="flex justify-center my-4">
            <button
              onClick={() => setMore(more + 6)}
              className={`h-10 px-4 py-2 bg-[#121212] active:bg-[#121212]/70 md:hover:bg-[#121212]/80 font-medium text-xs rounded-md active:scale-95 transition-all duration-300 ease-out`}
            >
              See More
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
