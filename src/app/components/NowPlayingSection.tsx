"use client";
import { useEffect, useState } from "react";
import { Card } from "./Card";
import { authorizations } from "../libs/authorization";

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

export const NowPlayingSection: React.FC<SectionProps> = (props) => {
  const [nowPlaying, setNowPlaying] = useState<DataMovies[]>([]);
  const { likedMovies, setLikedMovies } = props;

  const getNowPlaying = async (): Promise<void> => {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: authorizations,
          },
        }
      );
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const { results } = await res.json();
      setNowPlaying(results.slice(0, 6));
    } catch (error) {
      console.error("Error fetching Now Playing Movies:", error);
    }
  };

  useEffect(() => {
    getNowPlaying();
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
    <div className="flex flex-col">
      <div className="mt-8 px-3 py-2 text-lg font-semibold border-l-4 border-[#E50914] overflow-hidden">
        <h1 className="animate-fade-right animate-duration-500">Now Playing</h1>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 my-4 gap-4 sm:gap-x-6 sm:gap-y-8">
        {nowPlaying.length === 0
          ? ["", "", "", "", "", ""].map((d, i) => (
              <div
                key={i}
                className={` flex aspect-[4/6] bg-[#212121] rounded-2xl overflow-hidden transition-all duration-300 ease-in-out animate-pulse`}
              >
                {d}
              </div>
            ))
          : nowPlaying.map((d, i) => (
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
    </div>
  );
};
