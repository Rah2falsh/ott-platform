'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import SliderNavigation from '@/components/SliderNavigation';

interface PopularTopProps {
  popularMovies: Record<number, any[]>;
}

const categoriesList = [
  { name: 'Action', id: 28 },
  { name: 'Comedy', id: 35 },
  { name: 'Drama', id: 18 },
  { name: 'Horror', id: 27 },
  { name: 'Adventure', id: 12 },
  { name: 'Animation', id: 16 },
  { name: 'Crime', id: 80 },
  { name: 'Science Fiction', id: 878 },
  { name: 'Thriller', id: 53 },
  { name: 'Romance', id: 10749 },
  { name: 'Mystery', id: 9648 },
  { name: 'Fantasy', id: 14 },
];

export default function PopularTop({ popularMovies }: PopularTopProps) {

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -320 : 320,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col w-full gap-[30px] mx-auto max-w-[1280px]">

      {/* Cards */}
      <div
  id="popular-top-scroll"
  ref={scrollRef}
        className="flex items-center gap-[30px] overflow-x-auto scrollbar-none pb-2 pt-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >

        {categoriesList.map((cat) => {

          const movies = popularMovies[cat.id] || [];

          return (
            <div
            key={cat.id}
            className="bg-[#1A1A1A] border-[1px] border-[#262626] rounded-[12px] hover:border-slate-700 transition group cursor-pointer flex flex-col justify-between shrink-0"
            style={{
              width: '285px',
              height: '317px',
              padding: '30px',
            }}
          >

{/* Posters */}
<div className="grid grid-cols-2 gap-2 w-full">

  {movies.slice(0, 4).map((movie: any, i: number) => (

    <div
      key={movie.id || i}
      className="relative overflow-hidden rounded-[4px] bg-[#262626]"
      style={{
        width: '107.5px',
        height: '98px',
      }}
    >

      {movie.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || `${cat.name} ${i + 1}`}
          fill
          className="object-cover"
          sizes="108px"
        />
      )}

    </div>

  ))}

</div>

              {/* Bottom */}
              <div className="flex items-center justify-between w-full mt-4">

                <div className="flex flex-col gap-1">

                  <span className="bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded-[4px] w-fit">
                    Top 10 In
                  </span>

                  <span className="text-[18px] leading-[150%] font-semibold text-white truncate max-w-[160px]">
                    {cat.name}
                  </span>

                </div>

                <div className="w-10 h-10 rounded-[8px] bg-[#1F1F1F] border border-[#262626] flex items-center justify-center group-hover:bg-[#2A2A2A] transition">

                  <svg
                    className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}