"use client";
import { useEffect, useState } from "react";
import { authorizations } from "../libs/authorization";
import { Card } from "./Card";

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

interface SectionProps {
  likedMovies: number[];
  setLikedMovies: React.Dispatch<React.SetStateAction<number[]>>;
}

export const PopularSection: React.FC<SectionProps> = (props) => {
  const [popular, setPopular] = useState<DataMovies[]>([]);
  const [more, setMore] = useState(6);
  const { likedMovies, setLikedMovies } = props;

  const getPopular = async (): Promise<void> => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: authorizations,
      },
    };

    try {
      const [res1, res2] = await Promise.all([
        fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        ),
        fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2",
          options
        ),
      ]);
      if (!res1.ok || !res2.ok) {
        throw new Error(`HTTP error! Status: ${res1.status} / ${res2.status}`);
      }
      const results1 = await res1.json();
      const results2 = await res2.json();

      const combinedResults = [...results1.results, ...results2.results];

      setPopular(combinedResults.slice(0, 30));
    } catch (error) {
      console.error("Error fetching Now Playing items:", error);
    }
  };

  useEffect(() => {
    getPopular();
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
    <>
      <div className="flex flex-col">
        <div className="mt-8 px-3 py-2 text-lg font-semibold border-l-4 border-[#E50914] overflow-hidden">
          <h1 className="animate-fade-right animate-duration-500">
            Popular Movies
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
    </>
  );
};
