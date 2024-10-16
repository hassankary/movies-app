"use client";
import { useEffect, useState } from "react";
import { NowPlayingSection } from "./components/NowPlayingSection";
import { PopularSection } from "./components/PopularSection";

export default function Home() {
  const [likedMovies, setLikedMovies] = useState<number[]>([]);

  useEffect(() => {
    const savedLikes = JSON.parse(localStorage.getItem("likedMovies") || "[]");
    setLikedMovies(savedLikes);
  }, []);

  return (
    <div className="container mx-auto px-4 xl:max-w-7xl ">
      <main className="flex flex-col">
        <NowPlayingSection
          likedMovies={likedMovies}
          setLikedMovies={setLikedMovies}
        />
        <PopularSection
          likedMovies={likedMovies}
          setLikedMovies={setLikedMovies}
        />
      </main>
    </div>
  );
}
