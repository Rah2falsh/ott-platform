'use client';
import Link from "next/link";
import React, { useRef } from 'react';
import Image from 'next/image';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  runtime?: number;
}

interface TrendingProps {
  movies?: Movie[];
  contentType: "movies" | "shows";
}

export default function Trending({ movies = [], contentType }: TrendingProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Temporary display data for views
  // TMDB does not provide real view counts in the trending response.
  const viewCounts = ['2K', '1.5K', '1.8K', '3K', '5K'];

  // Convert runtime from minutes to "1h 30min"
  const formatRuntime = (runtime?: number) => {
    if (!runtime) return 'N/A';

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    if (hours === 0) return `${minutes}min`;
    if (minutes === 0) return `${hours}h`;

    return `${hours}h ${minutes}min`;
  };

  return (
    <div
      id="trending-scroll"
      ref={scrollRef}
      className="flex items-center gap-[20px] overflow-x-auto scrollbar-none pb-2 pt-1 w-full"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {movies.map((movie, index) => (
        <Link key={movie.id} href={`/${contentType}/${movie.id}`}>
    <div className="bg-[#1A1A1A] border border-[#262626] rounded-[10px] hover:border-slate-700 transition group cursor-pointer flex flex-col shrink-0"
      style={{
        width: '224px',
        height: '308px',
        padding: '16px',
        gap: '16px',
      }}
    >
          {/* Poster */}
          <div
            className="relative w-full rounded-[10px] overflow-hidden bg-[#1F1F1F]"
            style={{
              height: '232px',
            }}
          >
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name || 'Movie poster'}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
                sizes="192px"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-xs text-gray-500">
                No Image
              </div>
            )}
          </div>

          {/* Bottom Information */}
          <div className="flex items-center justify-between w-full">

{/* Runtime */}
<div
  className="flex items-center bg-[#141414] border border-[#262626] rounded-[51px] text-[#999999]"
  style={{
    width: '84px',
    height: '28px',
    padding: '4px 8px 4px 4px',
    gap: '2px',
  }}
>
  <div className="w-[20px] h-[20px] rounded-full bg-[#999999] flex items-center justify-center shrink-0">
    <svg
      className="w-[16px] h-[16px] text-[#141414]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 7 12 12 15 14" />
    </svg>
  </div>

  <span className="text-[12px] whitespace-nowrap">
    {formatRuntime(movie.runtime)}
  </span>
</div>

{/* Views */}
<div
  className="flex items-center bg-[#141414] border border-[#262626] rounded-[51px] text-[#999999]"
  style={{
    width: '51px',
    height: '28px',
    padding: '4px 8px 4px 4px',
    gap: '4px',
  }}
>
  <div className="w-[20px] h-[20px] flex items-center justify-center shrink-0">
    <svg
      className="w-[16px] h-[16px]"
      fill="none"
      stroke="#999999"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  </div>

  <span className="text-[12px] whitespace-nowrap">
    {viewCounts[index % viewCounts.length]}
  </span>
</div>

          </div>
        </div>
        </Link>  
      ))}
    </div>
  );
}