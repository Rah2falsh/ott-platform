'use client';
import Link from "next/link";
import React, { useRef } from 'react';
import Image from 'next/image';

interface Item {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  first_air_date?: string; // للمسلسلات
}

interface NewReleasesProps {
  movies?: Item[];
  contentType?: "movies" | "shows"; // استقبال النوع ديناميكياً
}

export default function NewReleases({ movies = [], contentType = "movies" }: NewReleasesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const formatReleaseDate = (date?: string) => {
    if (!date) return 'Release date unavailable';

    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return `Released at ${formattedDate}`;
  };

  return (
    <div className="flex flex-col w-full gap-[30px] mx-auto max-w-[1280px]">

      {/* Cards */}
      <div
        id="new-releases-scroll"
        ref={scrollRef}
        className="flex items-center gap-[20px] overflow-x-auto scrollbar-none pb-2 pt-1 w-full"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {movies.map((item) => {
          // تحديد المسار الصحيح ديناميكياً بناءً على ما إذا كان يحتوي على title (فيلم) أو name (مسلسل) أو حسب الـ contentType الممرر
          const isTvShow = contentType === "shows" || item.name;
          const linkPath = isTvShow ? `/shows/${item.id}` : `/movies/${item.id}`;
          const dateToFormat = item.release_date || item.first_air_date;

          return (
            <Link key={item.id} href={linkPath}>
              <div
                className="bg-[#1A1A1A] border border-[#262626] rounded-[10px] hover:border-slate-700 transition group cursor-pointer flex flex-col shrink-0"
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
                    width: '192px',
                    height: '232px',
                  }}
                >
                  {item.poster_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || item.name || 'Poster'}
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

                {/* Release Date */}
                <div
                  className="flex items-center justify-center bg-[#141414] border border-[#262626] rounded-[51px] text-[#999999] shrink-0"
                  style={{
                    width: '167px',
                    height: '30px',
                    padding: '6px 14px',
                    gap: '10px',
                  }}
                >
                  <span
                    className="text-[12px] font-medium leading-[150%] tracking-[0%] text-center whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    {formatReleaseDate(dateToFormat)}
                  </span>
                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}