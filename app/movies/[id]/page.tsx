'use client';

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import FreeTrialBanner from '@/components/FreeTrialBanner';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  spoken_languages: {
    iso_639_1: string;
    english_name: string;
  }[];
}

export default function Page({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    Promise.resolve(params).then(p => {
      setResolvedParams(p);
    });
  }, [params]);

  const id = resolvedParams?.id;

  const [movie, setMovie] = useState<Movie | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [heroMovies, setHeroMovies] = useState<any[]>([]);
  const [cast, setCast] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);

  const [director, setDirector] = useState<any>(null);
  const [composer, setComposer] = useState<any>(null);


  const renderStars = (rating: number = 0) => {
    const stars = Math.round(rating / 2);
  
    return Array.from({ length: 5 }).map((_, i) => (
      <span 
        key={i}
        className={i < stars ? "text-[#E50914]" : "text-[#555555]"}
      >
        {i < stars ? "★" : "☆"}
      </span>
    ));
  };

  useEffect(() => {
    async function fetchExtras() {
      const creditsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=8f5e24fc60071c7126030efdc18a2e6d`
      );

      const reviewsRes = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=8f5e24fc60071c7126030efdc18a2e6d`
      );

      const credits = await creditsRes.json();
      const reviewsData = await reviewsRes.json();

      setCast(credits.cast?.slice(0, 10) || []);
      setReviews(reviewsData.results?.slice(0, 4) || []);

      const directorData = credits.crew?.find(
        (person: any) => person.job === "Director"
      );

      setDirector(directorData || null);

      const composerData = credits.crew?.find(
        (person: any) =>
          person.job === "Original Music Composer" ||
          person.department === "Sound"
      );

      setComposer(composerData || null);
    }

    fetchExtras();
  }, [id]);

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=8f5e24fc60071c7126030efdc18a2e6d`
      );

      const data = await res.json();
      setMovie(data);
    }

    fetchMovie();
  }, [id]);


  useEffect(() => {
    async function fetchHeroMovies() {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=8f5e24fc60071c7126030efdc18a2e6d`
      );

      const data = await res.json();
      setHeroMovies(data.results || []);
    }

    fetchHeroMovies();
  }, []);

  const currentMovie = {
    title: movie?.title || "Loading...",
    description: movie?.overview || "No description available.",
    image: movie?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : "fallback-image",
  };

  const handleNext = () => {
    if (heroMovies.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }
  };

  const handlePrev = () => {
    if (heroMovies.length > 0) {
      setCurrentIndex((prev) =>
        (prev - 1 + heroMovies.length) % heroMovies.length
      );
    }
  };
  if (!id || !movie) return <div className="text-white p-10 bg-[#141414] min-h-screen">Loading...</div>;
  
  const rawPosters = [
    movie?.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
    movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
  ].filter(Boolean) as string[];

  const basePosters = rawPosters.length > 0 ? rawPosters : ["/fallback.jpg"];
  const moviePosters = [...basePosters, ...basePosters, ...basePosters, ...basePosters];
  const backdropGrid = [...moviePosters, ...moviePosters, ...moviePosters, ...moviePosters];
  return (
    <div className="min-h-screen bg-[#141414] text-white font-['Manrope'] overflow-x-hidden">
      
      <Navbar />


      {/* MAIN CONTENT */}
      <main className="pt-[168px] pb-20 flex flex-col items-center gap-8">
        
        {/* HERO BANNER SECTION */}
        <div className="w-full flex flex-col items-center gap-6">
          <div 
            className="relative rounded-[12px] overflow-hidden border border-[#262626] flex flex-col justify-end box-border shadow-xl"
            style={{
              width: '1280px',
              maxWidth: 'calc(100% - 40px)',
              height: '709px',
              paddingTop: '40px',
              paddingRight: '12px',
              paddingBottom: '24px',
              paddingLeft: '12px',
            }}
          >
            <div className="absolute inset-0 z-0">
              <img 
                src={currentMovie.image} 
                alt={currentMovie.title} 
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center w-full mx-auto pb-2">

{/* Movie */}
<h1 className="text-white font-bold text-[28px] md:text-[36px] leading-[150%] mb-2">
  {currentMovie.title}
</h1>
<p className="text-[#999999] text-[14px] md:text-[16px] leading-[150%] max-w-[900px] mb-6 px-4">
  {currentMovie.description}
</p>

<div className="flex items-center justify-center gap-2 mb-10">

  <button 
    className="bg-[#E50914] hover:bg-[#b00710] text-white rounded-[8px] flex items-center justify-center font-semibold transition shadow-md cursor-pointer"
    style={{
      width: '136px',
      height: '52px',
      padding: '14px 20px',
      gap: '6px'
    }}
  >
    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>

    <span className="text-[14px]">
      Play Now
    </span>
  </button>

  <button 
    aria-label="Add to Watchlist"
    className="w-[52px] h-[52px] bg-[#0F0F0F]/90 border border-[#262626] rounded-[8px] flex items-center justify-center text-white hover:bg-[#202020] transition cursor-pointer"
  >
    <svg 
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </button>

  <button 
    aria-label="Like"
    className="w-[52px] h-[52px] bg-[#0F0F0F]/90 border border-[#262626] rounded-[8px] flex items-center justify-center text-white hover:bg-[#202020] transition cursor-pointer"
  >
    <svg 
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M7 10v10H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3z" />
      <path d="M7 10l3-7a2 2 0 0 1 4 1v6h5.5a2 2 0 0 1 2 2.3l-1 6A2 2 0 0 1 18.5 20H7" />
    </svg>
  </button>

  <button 
    aria-label="Volume"
    className="w-[52px] h-[52px] bg-[#0F0F0F]/90 border border-[#262626] rounded-[8px] flex items-center justify-center text-white hover:bg-[#202020] transition cursor-pointer"
  >
    <svg 
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  </button>

</div>
</div>
</div>
</div>


      {/* ================= DETAILS ================= */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[1284px] mx-auto px-4 items-start">

{/* LEFT SIDE */}
<div className="flex flex-col gap-6 flex-1 min-w-0">

<div className="bg-[#1A1A1A] border border-[#262626] rounded-[12px] p-[50px] flex flex-col gap-[14px] w-full">  <h2 className="text-[#999999] text-[16px] font-medium leading-[150%] w-full">
  Description
</h2>
<p className="text-white text-sm leading-[150%]">
    {movie?.overview}
  </p>
</div>

<div className="bg-[#1A1A1A] border border-[#262626] rounded-[10px] p-[40px] flex flex-col gap-[10px] w-full max-w-[850px] relative">
  
<h2 className="text-[#999999] text-[16px] font-medium leading-[150%] w-full">
  Cast
</h2>
  <div id="castScroll" className="flex gap-4 overflow-x-auto">

    {cast?.map((actor: any) => (
      <div
        key={actor.id}
        className="w-[87.5px] h-[89px] rounded-[10px] overflow-hidden flex-shrink-0"
      >
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
              : "/no-image.png"
          }
          className="w-full h-full object-cover"
        />
      </div>
    ))}

  </div>

  <div className="absolute top-[40px] right-[40px] flex gap-[10px]">

    <button
      onClick={() => {
        document
          .querySelector('#castScroll')
          ?.scrollBy({ left: -200, behavior: 'smooth' });
      }}
      className="w-[32px] h-[32px] rounded-full bg-[#0F0F0F] flex items-center justify-center border border-[#262626]"
    >
      <svg className="w-3 h-3" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>
    <button
      onClick={() => {
        document
          .querySelector('#castScroll')
          ?.scrollBy({ left: 200, behavior: 'smooth' });
      }}
      className="w-[32px] h-[32px] rounded-full bg-[#0F0F0F] flex items-center justify-center border border-[#262626]"
    >
      <svg className="w-3 h-3" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>

  </div>

</div>

<div className="bg-[#1A1A1A] border border-[#262626] rounded-[10px] p-[40px] flex flex-col gap-[30px] w-full max-w-[850px] relative">

  <div className="flex items-center justify-between">
    <h2 className="text-[#999999] text-[16px] font-medium leading-[150%]">
      Reviews
    </h2>

    <button className="flex items-center gap-[4px] px-[12px] py-[12px] border border-[#262626] bg-[#141414] rounded-[6px] text-white text-sm">
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
  Add Your Review
</button>
  </div>

  <div id="reviewsScroll" className="flex gap-6 overflow-x-auto">

    {reviews?.map((review: any) => {
      const rating = review.author_details?.rating || 0;
      const stars = Math.round(rating / 2); 

      return (
        <div
          key={review.id}
          className="w-[377px] h-[223px] bg-[#0F0F0F] border border-[#262626] rounded-[12px] p-[30px] flex flex-col justify-between flex-shrink-0"
        >
          <div className="flex flex-col gap-[10px]">
            <h3 className="text-white text-sm font-medium">
              {review.author}
            </h3>

            <p className="text-gray-400 text-[14px] leading-[150%] line-clamp-4 overflow-hidden">
              {review.content}
            </p>
          </div>
          <div className="flex items-center gap-[2px] border border-[#262626] rounded-[51px] px-[8px] py-[4px] w-fit">
            {Array.from({ length: 5 }).map((_, i) => (
         <span 
         key={i} 
         className={i < stars ? "text-[#E50914] text-sm" : "text-[#555555] text-sm"}
       >
         {i < stars ? "★" : "☆"}
       </span>
            ))}
          </div>
        </div>
      );
    })}
  </div>

<div className="flex items-center justify-center gap-[20px] mt-[20px]">
  <button
    onClick={() => {
      document
        .querySelector('#reviewsScroll')
        ?.scrollBy({ left: -400, behavior: 'smooth' });
    }}
    className="w-[48px] h-[48px] rounded-full bg-[#0F0F0F] border border-[#262626] flex items-center justify-center"
  >
    <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </button>

  <div className="flex items-center gap-[6px]">
    <span className="w-[24px] h-[4px] bg-red-500 rounded-full"></span>
    <span className="w-[16px] h-[4px] bg-[#262626] rounded-full"></span>
    <span className="w-[16px] h-[4px] bg-[#262626] rounded-full"></span>
    <span className="w-[16px] h-[4px] bg-[#262626] rounded-full"></span>
  </div>

     <button
    onClick={() => {
      document
        .querySelector('#reviewsScroll')
        ?.scrollBy({ left: 400, behavior: 'smooth' });
    }}
    className="w-[48px] h-[48px] rounded-full bg-[#0F0F0F] border border-[#262626] flex items-center justify-center"
  >
    <svg className="w-4 h-4" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </button>
  </div>
</div>
</div>


{/* RIGHT SIDE */}
<div className="w-full lg:w-[416px] border border-[#262626] bg-[#1A1A1A] rounded-[10px] p-6 md:p-[40px] flex flex-col gap-[30px]">
  
  <div className="flex flex-col gap-2">
    <p className="text-[#999] text-sm flex items-center gap-2">

      <svg 
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
      Released Year
    </p>

    <h3 className="text-white text-xl font-semibold">
      {movie?.release_date?.split("-")[0] || "N/A"}
    </h3>
  </div>
  
  <div className="flex flex-col gap-3">
    <p className="text-[#999] text-sm flex items-center gap-2">
      <svg 
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15 15 0 0 1 0 20"/>
        <path d="M12 2a15 15 0 0 0 0 20"/>
      </svg>
      Available Languages
    </p>

    <div className="flex flex-wrap gap-3">
      {movie?.spoken_languages?.length > 0 ? (
        movie.spoken_languages.map((lang: any) => (
          <span
            key={lang.iso_639_1}
            className="border border-[#262626] bg-[#141414] px-4 py-2 rounded-[8px] text-sm text-white"
          >
            {lang.english_name}
          </span>
        ))
      ) : (
        <span className="text-gray-500 text-sm">N/A</span>
      )}
    </div>
  </div>


  <div className="flex flex-col gap-3">
  <p className="text-[#999] text-sm flex items-center gap-2">

<svg 
className="w-4 h-4"
fill="none"
stroke="currentColor"
strokeWidth="2"
viewBox="0 0 24 24"
>
<polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5 12 2"/>
</svg>
Ratings
</p>

    <div className="flex gap-4">
      <div className="flex-1 border border-[#262626] bg-[#141414] rounded-[10px] p-[16px] flex flex-col gap-2">
        <p className="text-white text-sm">IMDb</p>

        <div className="flex items-center gap-2">
          <div className="flex text-sm">
            {renderStars(movie?.vote_average)}
          </div>

          <span className="text-white text-sm">
            {movie?.vote_average?.toFixed(1) || "N/A"}
          </span>
        </div>
      </div>

      <div className="flex-1 border border-[#262626] bg-[#141414] rounded-[10px] p-[16px] flex flex-col gap-2">
        <p className="text-white text-sm">MovieBox</p>

        <div className="flex items-center gap-2">
          <div className="flex text-sm">
            {renderStars(movie?.vote_average - 1)}
          </div>

          <span className="text-white text-sm">
            {movie?.vote_average
              ? (movie.vote_average - 1).toFixed(1)
              : "N/A"}
          </span>
        </div>
      </div>

    </div>
  </div>
  <div className="flex flex-col gap-3">
  <p className="text-[#999] text-sm flex items-center gap-2">

<svg 
className="w-4 h-4"
fill="none"
stroke="currentColor"
strokeWidth="2"
viewBox="0 0 24 24"
>
<rect x="3" y="4" width="18" height="16" rx="2"/>
<line x1="8" y1="9" x2="16" y2="9"/>
<line x1="8" y1="13" x2="16" y2="13"/>
</svg>

Genres
</p>

    <div className="flex flex-wrap gap-3">
      {movie?.genres?.map((g: any) => (
        <span
          key={g.id}
          className="border border-[#262626] bg-[#141414] px-4 py-2 rounded-[8px] text-sm text-white"
        >
          {g.name}
        </span>
      ))}
    </div>
  </div>
  <div className="flex flex-col gap-3">
  <p className="text-[#999] text-sm flex items-center gap-2">

<svg 
className="w-4 h-4"
fill="none"
stroke="currentColor"
strokeWidth="2"
viewBox="0 0 24 24"
>
<path d="M12 2L15 8H21L16 12L18 18L12 14L6 18L8 12L3 8H9Z"/>
</svg>

Director
</p>

    <div className="border border-[#262626] bg-[#141414] p-4 rounded-[10px] flex items-center gap-3">
      {director?.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
          className="w-12 h-12 rounded-[8px] object-cover"
        />
      )}

      <div>
        <p className="text-white text-sm">
          {director?.name || "N/A"}
        </p>
        <p className="text-gray-400 text-xs">From TMDB</p>
      </div>
    </div>
  </div>

  <div className="flex flex-col gap-3">
  <p className="text-[#999] text-sm flex items-center gap-2">

<svg 
className="w-4 h-4"
fill="none"
stroke="currentColor"
strokeWidth="2"
viewBox="0 0 24 24"
>
<path d="M9 18V5l12-2v13"/>
<circle cx="6" cy="18" r="3"/>
<circle cx="18" cy="16" r="3"/>
</svg>

Music
</p>

    <div className="border border-[#262626] bg-[#141414] p-4 rounded-[10px] flex items-center gap-3">
      {composer?.profile_path && (
        <img
          src={`https://image.tmdb.org/t/p/w200${composer.profile_path}`}
          className="w-12 h-12 rounded-[8px] object-cover"
        />
      )}

      <div>
        <p className="text-white text-sm">
          {composer?.name || "N/A"}
        </p>
        <p className="text-gray-400 text-xs">Composer</p>
        </div>
    </div>
  </div> 
</div> 
</div> 
</main>
      <FreeTrialBanner backdropGrid={backdropGrid} />

<Footer />
    </div>
  );
}