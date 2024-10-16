"use client";
import Image from "next/image";
import { MdOutlineFavorite } from "react-icons/md";
import { FaStar } from "react-icons/fa6";

interface CardProps {
  src: string;
  alt: string;
  title: string;
  release: string;
  rating: number;
  toggleLike: () => void;
  likedMovies: boolean;
}

export const Card: React.FC<CardProps> = (props) => {
  const { src, alt, title, release, rating, toggleLike, likedMovies } = props;

  return (
    <div className="hover:scale-105 transition-all duration-300 ease-out">
      <div
        className={`animate-fade-up animate-duration-500 group relative h-full w-full flex flex-col bg-[#212121] rounded-2xl overflow-hidden hover:ring-2 hover:ring-offset-2 hover:ring-offset-[#141414] hover:ring-[#E50914] transition-all duration-300 ease-in-out`}
      >
        <Image
          src={src}
          alt={alt}
          height={192}
          width={288}
          unoptimized
          className="object-cover aspect-[4/6]"
        />
        <div className="absolute h-full w-full bg-gradient-to-t from-transparent group-hover:from-[#141414] transition-all duration-300 ease-out"></div>
        <article className="absolute -bottom-10 group-hover:bottom-3 group-hover:sm:bottom-4 w-full flex flex-col px-3 sm:px-4 transition-all duration-300 ease-in-out">
          <h1 className="font-semibold text-[0.625rem] md:text-[1rem] truncate">
            {title}
          </h1>
          <p className="text-[0.625rem] md:text-xs truncate">{release}</p>
        </article>
        <div className="absolute top-0 left-0 mt-3 ml-2 flex items-center justify-center gap-1 font-normal text-[14px] text-yellow-400 truncate">
          <FaStar className="h-4 w-4 rounded-full" />
          <span className="font-semibold">{rating}</span>
        </div>
        <button
          onClick={toggleLike}
          className={`${
            likedMovies ? "text-[#E50914]" : "text-white"
          } absolute top-0 right-0 mt-2 mr-2`}
        >
          <MdOutlineFavorite className=" h-7 w-7 rounded-full bg-black p-1" />
        </button>
      </div>
    </div>
  );
};
