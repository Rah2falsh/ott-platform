'use client';
import Link from "next/link";
import React, { useRef } from 'react';
import Image from 'next/image';

interface Item {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  vote_average?: number;
  runtime?: number;
}

interface MustWatchProps {
  movies?: Item[];
  contentType?: "movies" | "shows"; // دعم تحديد النوع ديناميكياً
}

function formatRuntime(minutes?: number) {
  if (!minutes) return 'N/A';

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;

  return `${hours}h ${mins}min`;
}

export default function MustWatch({ movies = [], contentType = "movies" }: MustWatchProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id="must-watch-scroll"
      ref={scrollRef}
      className="flex items-center gap-[24px] overflow-x-auto scrollbar-none pb-2 pt-1 w-full"
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {movies.map((item) => {
        // تحديد المسار الذكي بناءً على نوع المحتوى أو اسم العنصر
        const isTvShow = contentType === "shows" || item.name;
        const linkPath = isTvShow ? `/shows/${item.id}` : `/movies/${item.id}`;

        return (
          <Link key={item.id} href={linkPath}>
            <div
              className="bg-[#1A1A1A] border border-[#262626] rounded-[10px] hover:border-slate-700 transition group cursor-pointer flex flex-col shrink-0"
              style={{
                width: '285px',
                height: '404px',
                padding: '16px',
                gap: '16px',
              }}
            >
              {/* Poster */}
              <div
                className="relative w-full rounded-[10px] overflow-hidden bg-[#1F1F1F]"
                style={{
                  width: '253px',
                  height: '324px',
                }}
              >
                {item.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name || 'Poster'}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                    sizes="253px"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </div>

              {/* Bottom Info */}
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
                      className="w-[12px] h-[12px] text-[#141414]"
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
                    {formatRuntime(item.runtime)}
                  </span>
                </div>

                {/* Rating */}
                <div
                  className="flex items-center bg-[#141414] border border-[#262626] rounded-[51px] text-[#999999]"
                  style={{
                    width: '120.72px',
                    height: '30px',
                    padding: '6px 10px',
                    gap: '4px',
                  }}
                >
                  <div className="flex items-center gap-[2px] text-[#E50914]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="w-[14px] h-[14px] fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <span className="text-[12px] whitespace-nowrap">
                    {item.vote_average
                      ? `${(item.vote_average * 2).toFixed(1)}K`
                      : '20K'}
                  </span>
                </div>

              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}