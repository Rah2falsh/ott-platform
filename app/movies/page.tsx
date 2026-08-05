'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tmdbApi } from '@/services/tmdb';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import FreeTrialBanner from '@/components/FreeTrialBanner';
import PopularTop from '@/components/PopularTop';
import Trending from '@/components/Trending';
import NewReleases from '@/components/NewReleases';
import MustWatch from '@/components/MustWatch';
import SliderNavigation from '@/components/SliderNavigation';

interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
  runtime?: number;
}
const moviePosters = [
  "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  "https://image.tmdb.org/t/p/w500/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
  "https://image.tmdb.org/t/p/w500/8UlWj7pgJvZ8bfiyYQCKMVnL3M1.jpg",
  "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
  "https://image.tmdb.org/t/p/w500/wKiOkZTN9lUUUNZLmtnwubZYONg.jpg",
  "https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDMACzt7EBbYaAM.jpg",
  "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFv7V8vIBMUZB.jpg"
];

const categoriesList = [
  { name: "Action", id: 28 },
  { name: "Comedy", id: 35 },
  { name: "Drama", id: 18 },
  { name: "Horror", id: 27 },
  { name: "Adventure", id: 12 },
  { name: "Animation", id: 16 },
  { name: "Crime", id: 80 },
  { name: "Science Fiction", id: 878 },
  { name: "Thriller", id: 53 },
  { name: "Romance", id: 10749 },
  { name: "Mystery", id: 9648 },
  { name: "Fantasy", id: 14 }
];

export default function MoviesAndShowsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('Action'); 
  const [genreId, setGenreId] = useState(28);
  const [trendingShows, setTrendingShows] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingData] = useState<any[]>([]);
  const [heroMovies, setHeroMovies] = useState([]);
  const [genreMovies, setGenreMovies] = useState<Record<number, any[]>>({});
  const [popularMovies, setPopularMovies] = useState<Record<number, any[]>>({});
  const [mustWatchMovies, setMustWatchMovies] = useState<any[]>([]);
  const [backdropGrid, setBackdropGrid] = useState<string[]>([]);
  // New Releases
  const [newReleasesMovies, setNewReleasesMovies] = useState<any[]>([]);

  const handleSelectGenre = (catName: string, catId: number) => {
    setSelectedGenre(catName);
    setGenreId(catId);
  };

  useEffect(() => {
    if (heroMovies.length > 0) {
      const backdrops = heroMovies
        .filter((movie: any) => movie.backdrop_path)
        .slice(0, 20)
        .map(
          (movie: any) =>
            `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
        );
        const repeated = [...backdrops, ...backdrops, ...backdrops];
        setBackdropGrid(repeated);
    }
  }, [heroMovies]);
  useEffect(() => {
    async function fetchTrending() {
      const trendingData = await tmdbApi.getTrendingMovies();
      setTrendingData(trendingData);
    }
    fetchTrending();
  }, []);

  useEffect(() => {
    async function fetchHeroMovies() {
      const moviesData = await tmdbApi.getMoviesByGenre(genreId);
      setHeroMovies(moviesData);
      setCurrentIndex(0); 
    }
    fetchHeroMovies();
  }, [genreId]);

  useEffect(() => {
    async function fetchGenreMovies() {
      const results: Record<number, any[]> = {};
  
      for (const category of categoriesList) {
        const movies = await tmdbApi.getMoviesByGenre(category.id);
  
        results[category.id] = movies
          .filter((movie: any) => movie.poster_path)
          .slice(0, 4);
      }
  
      setGenreMovies(results);
    }
  
    fetchGenreMovies();
  }, []);

  useEffect(() => {
    async function fetchPopularMovies() {
      const results: Record<number, any[]> = {};
  
      for (const category of categoriesList) {
        const movies = await tmdbApi.getMoviesByGenre(category.id);
  
        results[category.id] = movies
          .filter((movie: any) => movie.poster_path)
          .sort(
            (a: any, b: any) =>
              (b.vote_average || 0) - (a.vote_average || 0)
          )
          .slice(0, 20);
      }
  
      setPopularMovies(results);
    }
  
    fetchPopularMovies();
  }, []);

  useEffect(() => {
    async function fetchNewReleases() {
      const data = await tmdbApi.getNewReleases();
      setNewReleasesMovies(data);
    }

    fetchNewReleases();
  }, []);
  useEffect(() => {
    async function fetchMustWatchMovies() {
      const movies = await tmdbApi.getMustWatchMovies();
      setMustWatchMovies(movies);
    }
  
    fetchMustWatchMovies();
  }, []);
  useEffect(() => {
    async function fetchShows() {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=8f5e24fc60071c7126030efdc18a2e6d`
      );
      const data = await res.json();
  
      setTrendingShows(data.results);
    }
  
    fetchShows();
  }, []);

  const rawMovie: any = heroMovies[currentIndex] || heroMovies[0] || {};

  const currentMovie = {
    title: rawMovie.title || rawMovie.name || "Loading...",
    description: rawMovie.overview || "No description available.",
    image: rawMovie.backdrop_path 
      ? `https://image.tmdb.org/t/p/original${rawMovie.backdrop_path}` 
      : moviePosters[0]
  };

  const handleNext = () => {
    if (heroMovies.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }
  };

  const handlePrev = () => {
    if (heroMovies.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white font-['Manrope'] overflow-x-hidden">
      
      <Navbar />
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

{/* Movie Title */}
<h1 className="text-white font-bold text-[28px] md:text-[36px] leading-[150%] mb-2">
  {currentMovie.title}
</h1>

{/* Movie Description */}
<p className="text-[#999999] text-[14px] md:text-[16px] leading-[150%] max-w-[900px] mb-6 px-4">
  {currentMovie.description}
</p>

{/* Action Buttons */}
<div className="flex items-center justify-center gap-2 mb-10">

  {/* Play Now */}
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

  {/* Icons of HERO */}
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

{/* Slider Navigation */}
<div 
  className="flex items-center justify-between w-full"
  style={{
    paddingLeft: '12px',
    paddingRight: '24px'
  }}
>

  <button 
    onClick={handlePrev}
    className="bg-[#0F0F0F]/90 border border-[#262626] rounded-[8px] flex items-center justify-center text-white hover:bg-[#202020] transition cursor-pointer shadow-lg"
    style={{
      width: '48px',
      height: '48px',
      padding: '12px'
    }}
  >
    <svg 
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  </button>

  <div className="flex items-center gap-2">
    {heroMovies.slice(0, 5).map((_, idx) => (
      <div 
        key={idx} 
        className={`h-[4px] rounded-full transition-all duration-300 ${
          idx === currentIndex 
            ? 'w-[24px] bg-[#E50914]' 
            : 'w-[16px] bg-[#333333]'
        }`}
      />
    ))}
  </div>

  <button 
    onClick={handleNext}
    className="bg-[#0F0F0F]/90 border border-[#262626] rounded-[8px] flex items-center justify-center text-white hover:bg-[#202020] transition cursor-pointer shadow-lg"
    style={{
      width: '48px',
      height: '48px',
      padding: '12px'
    }}
  >
    <svg 
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  </button>

</div>
   </div>
       </div>
           </div>
        <div className="w-full max-w-[1280px] mx-auto rounded-[16px] border border-[#262626] bg-[#141414] p-6 md:p-12 space-y-12 shadow-2xl">
          <div className="relative">
            <div className="absolute -top-[55px] left-0 md:left-2 flex items-center justify-center bg-[#E50914] text-white font-bold rounded-[8px] px-[24px] py-[10px] gap-[10px] w-fit h-[50px] shadow-lg">
              <span className="text-[16px]">Movies</span>
            </div>
          </div>
       
{/* Our Genres */}
<section className="space-y-8 flex flex-col items-start text-left w-full">

  {/* Section Header */}
  <div className="flex items-center justify-between w-full">

    <h2 className="text-[28px] md:text-[30px] leading-[150%] font-bold text-white">
      Our Genres
    </h2>

    <SliderNavigation
      onPrev={() => {
        const container = document.getElementById('genres-scroll');

        if (container) {
          container.scrollBy({
            left: -500,
            behavior: 'smooth'
          });
        }
      }}
      onNext={() => {
        const container = document.getElementById('genres-scroll');

        if (container) {
          container.scrollBy({
            left: 500,
            behavior: 'smooth'
          });
        }
      }}
    />

  </div>

  {/* Genres Slider */}
  <div
    id="genres-scroll"
    className="flex gap-6 overflow-x-auto scroll-smooth w-full"
  >

    {categoriesList.map((cat) => (

      <div
        key={cat.id}
        onClick={() => handleSelectGenre(cat.name, cat.id)}
        className="flex-shrink-0 w-[220px] bg-[#1A1A1A] border border-[#262626] rounded-[10px] flex flex-col justify-start text-left cursor-pointer hover:border-[#E50914] transition group p-6 gap-4"
      >

        {/* Posters */}
        <div className="grid grid-cols-2 gap-2 w-full">

          {(genreMovies[cat.id] || []).map((movie: any) => (

            <div
              key={movie.id}
              className="relative h-[75px] rounded-[6px] overflow-hidden bg-[#262626]"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
    ))}
        </div>

        {/* Genre Name */}
        <div className="flex items-center justify-between w-full mt-auto">

          <span className="text-[16px] font-bold text-white">
            {cat.name}
          </span>
             <svg
            className="w-5 h-5 text-slate-400 group-hover:text-[#E50914] transition"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          </div>
         </div>
   ))}
  </div>
</section>

{/* Popular Top Section */}
<div className="flex flex-col w-full gap-[40px]">

  <div className="flex items-center justify-between w-full">
    <h2 className="text-[30px] font-bold font-['Manrope'] leading-[150%] text-white">
      Popular Top 10 In Genres
    </h2>

    <SliderNavigation
      onPrev={() => {
        const container = document.getElementById('popular-top-scroll');

        if (container) {
          container.scrollBy({
            left: -320,
            behavior: 'smooth',
          });
        }
      }}
      onNext={() => {
        const container = document.getElementById('popular-top-scroll');

        if (container) {
          container.scrollBy({
            left: 320,
            behavior: 'smooth',
          });
        }
      }}
    />
  </div>

  {/* Cards */}
  <PopularTop popularMovies={popularMovies} />

</div>

     {/* Trending Section */}
<div className="flex flex-col w-full gap-[30px]">

<div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
  <h2 className="text-[30px] font-bold font-['Manrope'] leading-[150%] text-white">
    Trending Now
  </h2>

  <SliderNavigation 
    onPrev={() => {
      const container = document.getElementById('trending-scroll');
      if (container) {
        container.scrollBy({
          left: -320,
          behavior: 'smooth'
        });
      }
    }}
    onNext={() => {
      const container = document.getElementById('trending-scroll');
      if (container) {
        container.scrollBy({
          left: 320,
          behavior: 'smooth'
        });
      }
    }}
  />
</div>
<Trending movies={trendingMovies} contentType="movies" />
</div>

          {/* New Releases Section */}
          <div className="flex flex-col w-full gap-[30px]">
            <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
              <h2 className="text-[30px] font-bold font-['Manrope'] leading-[150%] text-white">
                New Releases
                </h2>
                <SliderNavigation 
    onPrev={() => {
      const container = document.getElementById('new-releases-scroll');
      if (container) {
        container.scrollBy({
          left: -320,
          behavior: 'smooth'
        });
      }
    }}
    onNext={() => {
      const container = document.getElementById('new-releases-scroll');
      if (container) {
        container.scrollBy({
          left: 320,
          behavior: 'smooth'
        });
      }
    }}
  />
</div>
            <NewReleases movies={newReleasesMovies} />
          </div>

   {/* Must Watch Movies Section */}
<div className="flex flex-col w-full gap-[30px]">

<div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
  
  <h2 className="text-[30px] font-bold font-['Manrope'] leading-[150%] text-white">
    Must - Watch Movies
  </h2>

  <SliderNavigation
    onPrev={() => {
      const container = document.getElementById('must-watch-scroll');

      if (container) {
        container.scrollBy({
          left: -320,
          behavior: 'smooth',
        });
      }
    }}
    onNext={() => {
      const container = document.getElementById('must-watch-scroll');

      if (container) {
        container.scrollBy({
          left: 320,
          behavior: 'smooth',
        });
      }
    }}
  />

</div>

<MustWatch movies={mustWatchMovies} />

</div>
</div>


 {/* Shows Cards */}

        <div className="w-full max-w-[1280px] mx-auto rounded-[16px] border border-[#262626] bg-[#141414] p-6 md:p-12 space-y-12 shadow-2xl">
          <div className="relative">
            <div className="absolute -top-[55px] left-0 md:left-2 flex items-center justify-center bg-[#E50914] text-white font-bold rounded-[8px] px-[24px] py-[10px] gap-[10px] w-fit h-[50px] shadow-lg">
              <span className="text-[16px]">Shows</span>
            </div>
          </div>
       
          
{/* Our Genres */}
<section className="space-y-8 flex flex-col items-start text-left w-full">

  {/* Section Header */}
  <div className="flex items-center justify-between w-full">

    <h2 className="text-[28px] md:text-[30px] leading-[150%] font-bold text-white">
      Our Genres
    </h2>

    <SliderNavigation
      onPrev={() => {
        const container = document.getElementById('genres-scroll');

        if (container) {
          container.scrollBy({
            left: -500,
            behavior: 'smooth'
          });
        }
      }}
      onNext={() => {
        const container = document.getElementById('genres-scroll');

        if (container) {
          container.scrollBy({
            left: 500,
            behavior: 'smooth'
          });
        }
      }}
    />

  </div>

  {/* Genres Slider */}
  <div
    id="genres-scroll"
    className="flex gap-6 overflow-x-auto scroll-smooth w-full"
  >

    {categoriesList.map((cat) => (

      <div
        key={cat.id}
        onClick={() => handleSelectGenre(cat.name, cat.id)}
        className="flex-shrink-0 w-[220px] bg-[#1A1A1A] border border-[#262626] rounded-[10px] flex flex-col justify-start text-left cursor-pointer hover:border-[#E50914] transition group p-6 gap-4"
      >

        {/* Posters */}
        <div className="grid grid-cols-2 gap-2 w-full">

          {(genreMovies[cat.id] || []).map((movie: any) => (

            <div
              key={movie.id}
              className="relative h-[75px] rounded-[6px] overflow-hidden bg-[#262626]"
            >

              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
          ))} 
        </div>

        {/* Genre Name */}
        <div className="flex items-center justify-between w-full mt-auto">

          <span className="text-[16px] font-bold text-white">
            {cat.name}
          </span>

          <svg
            className="w-5 h-5 text-slate-400 group-hover:text-[#E50914] transition"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Popular Top Section */}
<div className="flex flex-col w-full gap-[40px]">

  <div className="flex items-center justify-between w-full">
    <h2 className="text-[30px] font-bold font-['Manrope'] leading-[150%] text-white">
      Popular Top 10 In Genres
    </h2>

    <SliderNavigation
      onPrev={() => {
        const container = document.getElementById('popular-top-scroll');

        if (container) {
          container.scrollBy({
            left: -320,
            behavior: 'smooth',
          });
        }
      }}
      onNext={() => {
        const container = document.getElementById('popular-top-scroll');

        if (container) {
          container.scrollBy({
            left: 320,
            behavior: 'smooth',
          });
        }
      }}
    />
  </div>
  <PopularTop popularMovies={popularMovies} />
</div>

     {/* Trending Section */}
<div className="flex flex-col w-full gap-[30px]">

<div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
  <h2 className="text-[30px] font-bold font-['Manrope'] leading-[150%] text-white">
    Trending Shows Now
  </h2>

  <SliderNavigation 
    onPrev={() => {
      const container = document.getElementById('trending-scroll');
      if (container) {
        container.scrollBy({
          left: -320,
          behavior: 'smooth'
        });
      }
    }}
    onNext={() => {
      const container = document.getElementById('trending-scroll');
      if (container) {
        container.scrollBy({
          left: 320,
          behavior: 'smooth'
        });
      }
    }}
  />
</div>
<Trending movies={trendingShows} contentType="shows" />
</div>

          {/* New Releases Section */}
          <div className="flex flex-col w-full gap-[30px]">
            <div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
              <h2 className="text-[30px] font-bold font-['Manrope'] leading-[150%] text-white">
                New Released Shows
                </h2>
                <SliderNavigation 
    onPrev={() => {
      const container = document.getElementById('new-releases-scroll');
      if (container) {
        container.scrollBy({
          left: -320,
          behavior: 'smooth'
        });
      }
    }}
    onNext={() => {
      const container = document.getElementById('new-releases-scroll');
      if (container) {
        container.scrollBy({
          left: 320,
          behavior: 'smooth'
        });
      }
    }}
  />
      </div>
        <NewReleases movies={newReleasesMovies} contentType="shows"/>
          </div>

   {/* Must Watch Movies Section */}
<div className="flex flex-col w-full gap-[30px]">

<div className="flex items-center justify-between w-full max-w-[1280px] mx-auto">
  
  <h2 className="text-[30px] font-bold font-['Manrope'] leading-[150%] text-white">
    Must - Watch Shows
  </h2>

  <SliderNavigation
    onPrev={() => {
      const container = document.getElementById('must-watch-scroll');

      if (container) {
        container.scrollBy({
          left: -320,
          behavior: 'smooth',
        });
      }
    }}
    onNext={() => {
      const container = document.getElementById('must-watch-scroll');

      if (container) {
        container.scrollBy({
          left: 320,
          behavior: 'smooth',
        });
      }
    }}
  />

</div>

<MustWatch movies={mustWatchMovies} contentType="shows" />

</div>
</div>
 <FreeTrialBanner backdropGrid={backdropGrid} />
      </main>
      <Footer />
    </div>
  );
}