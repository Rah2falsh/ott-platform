'use client';

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import FreeTrialBanner from '@/components/FreeTrialBanner';

interface Show {
  id: number;
  name: string;
  title?: string; 
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
  genres: { id: number; name: string }[];
  spoken_languages?: {
    iso_639_1: string;
    english_name: string;
  }[];
  seasons?: {
    id: number;
    name: string;
    episode_count: number;
    poster_path: string;
    season_number: number;
  }[];
}

export default function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  console.log("ID:", id);

  const [show, setShow] = useState<Show | null>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const languages = show?.spoken_languages ?? [];
  const [expandedSeasonId, setExpandedSeasonId] = useState<number | null>(null);
  const [director, setDirector] = useState<any>(null);
  const [composer, setComposer] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);

const rawPosters = [
  show?.backdrop_path ? `https://image.tmdb.org/t/p/original${show.backdrop_path}` : null,
  show?.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : null,
].filter(Boolean) as string[];

const basePosters = rawPosters.length > 0 ? rawPosters : ["/fallback.jpg"];
const moviePosters = [...basePosters, ...basePosters, ...basePosters, ...basePosters];

const backdropGrid = [...moviePosters, ...moviePosters, ...moviePosters, ...moviePosters];

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
    if (!id) return;
  
    async function fetchShowData() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=8f5e24fc60071c7126030efdc18a2e6d`
        );
        const data = await res.json();
  
        if (data.success === false) {

          const movieRes = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=8f5e24fc60071c7126030efdc18a2e6d`
          );
          const movieData = await movieRes.json();
  
          setShow(movieData);
        } else {
          setShow(data);
        }
      } catch (error) {
        console.error("Error fetching show:", error);
      }
    }

    fetchShowData();
  }, [id]);
  const fetchEpisodes = async (seasonNumber: number) => {
    if (expandedSeasonId === seasonNumber) {
      setExpandedSeasonId(null);
      setEpisodes([]);
    } else {
      setExpandedSeasonId(seasonNumber);
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=8f5e24fc60071c7126030efdc18a2e6d`
        );
        const data = await res.json();
        setEpisodes(data.episodes || []);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    }
  };
  useEffect(() => {
    if (!id) return;

    async function fetchExtras() {
      try {
        let credits;
        let reviewsData;

        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=8f5e24fc60071c7126030efdc18a2e6d`
        );
        const creditsJson = await creditsRes.json();

        if (creditsJson.success === false) {
          const movieCreditsRes = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=8f5e24fc60071c7126030efdc18a2e6d`
          );
          credits = await movieCreditsRes.json();

          const movieReviewsRes = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=8f5e24fc60071c7126030efdc18a2e6d`
          );
          reviewsData = await movieReviewsRes.json();
        } else {
          credits = creditsJson;

          const reviewsRes = await fetch(
            `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=8f5e24fc60071c7126030efdc18a2e6d`
          );
          reviewsData = await reviewsRes.json();
        }

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
      } catch (error) {
        console.error("Error fetching extras:", error);
      }
    }

    fetchExtras();
  }, [id]);

  const currentShow = {
    title: show?.name || show?.title || "Loading...",
    description: show?.overview || "No description available.",
    image: show?.backdrop_path
      ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
      : "fallback-image",
  };

  if (!show) return <div className="text-white p-10">Loading...</div>;

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
                src={currentShow.image} 
                alt={currentShow.title} 
                className="w-full h-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center w-full mx-auto pb-2">
              <h1 className="text-white font-bold text-[28px] md:text-[36px] leading-[150%] mb-2">
                {currentShow.title}
              </h1>

              <p className="text-[#999999] text-[14px] md:text-[16px] leading-[150%] max-w-[900px] mb-6 px-4">
                {currentShow.description}
              </p>

              <div className="flex items-center justify-center gap-2 mb-10">
                <button 
                  className="bg-[#E50914] hover:bg-[#b00710] text-white rounded-[8px] flex items-center justify-center font-semibold transition shadow-md cursor-pointer"
                  style={{ width: '136px', height: '52px', padding: '14px 20px', gap: '6px' }}
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span className="text-[14px]">Play Now</span>
                </button>

                <button aria-label="Add to Watchlist" className="w-[52px] h-[52px] bg-[#0F0F0F]/90 border border-[#262626] rounded-[8px] flex items-center justify-center text-white hover:bg-[#202020] transition cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                <button aria-label="Like" className="w-[52px] h-[52px] bg-[#0F0F0F]/90 border border-[#262626] rounded-[8px] flex items-center justify-center text-white hover:bg-[#202020] transition cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M7 10v10H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h3z" />
                    <path d="M7 10l3-7a2 2 0 0 1 4 1v6h5.5a2 2 0 0 1 2 2.3l-1 6A2 2 0 0 1 18.5 20H7" />
                  </svg>
                </button>

                <button aria-label="Volume" className="w-[52px] h-[52px] bg-[#0F0F0F]/90 border border-[#262626] rounded-[8px] flex items-center justify-center text-white hover:bg-[#202020] transition cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
<div className="flex flex-row gap-6 w-full max-w-[1284px] items-start mt-[30px]">

  {/* LEFT SIDE */}
  <div className="flex flex-col gap-6 flex-1 min-w-0">

    {/* ================= Seasons and Episodes Container ================= */}
    <div className="w-full max-w-[850px] max-h-[800px] overflow-y-auto bg-[#1A1A1A] rounded-[12px] p-[30px] flex flex-col gap-[30px] custom-scrollbar">
      
      {/* Header */}
      <h2 className="text-white text-[20px] font-semibold">
        Seasons and Episodes
      </h2>

      {/* ================= Seasons ================= */}
      {show?.seasons?.map((season) => (
        <div key={season.id} className="flex flex-col gap-[15px] w-full">
          
          {/* Season Card */}
          <div
            onClick={() => fetchEpisodes(season.season_number)}
            className="w-full max-w-[790px] h-[84px] bg-[#0F0F0F] border border-[#262626] rounded-[10px] px-[40px] py-[20px] cursor-pointer flex items-center justify-between hover:bg-[#1a1a1a] transition flex-shrink-0"
          >
            <div className="flex items-center gap-[10px]">
              <h3 className="text-white text-[20px] font-medium">
                {season.name}
              </h3>
              <span className="text-[#999] text-[14px]">
                {season.episode_count} Episodes
              </span>
            </div>

            <div className="w-[32px] h-[32px] rounded-full bg-[#262626 flex items-center justify-center text-[#999]">
              {expandedSeasonId === season.season_number ? "↑" : "↓"}
            </div>
          </div>

          {/* ================= EPISODES (Inside Container) ================= */}
          {expandedSeasonId === season.season_number && episodes.length > 0 && (
            <div className="flex flex-col gap-[15px] pl-[10px] w-full max-w-[790px]">
              {episodes.map((ep: any, index: number) => (
                <div
                  key={ep.id}
                  className="bg-[#0F0F0F border border-[#262626] rounded-[10px] p-[15px] flex items-start gap-[15px] w-full"
                >
                  <span className="text-[#999] text-[16px] font-medium min-w-[24px]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="relative w-[160px] h-[90px] flex-shrink-0">
                    <img
                      src={
                        ep.still_path
                          ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
                          : "/fallback.jpg"
                      }
                      alt={ep.name}
                      className="w-full h-full object-cover rounded-[8px]"
                    />
                  </div>

                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                      <h4 className="text-white text-[15px] font-medium">
                        {ep.name}
                      </h4>
                      {ep.runtime && (
                        <span className="text-[#999] text-[12px]">
                          {ep.runtime} min
                        </span>
                      )}
                    </div>

                    <p className="text-[#999] text-[12px] line-clamp-2 mt-[6px]">
                      {ep.overview || "No description"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      ))}

    </div>
    <div className="bg-[#1A1A1A] border border-[#262626] rounded-[12px] p-[50px] flex flex-col gap-[14px] w-full max-w-[850px]">  
      <h2 className="text-[#999999] text-[16px] font-medium leading-[150%] w-full">
        Description
      </h2>
      <p className="text-white text-sm leading-[150%]">
        {show?.overview}
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
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            <div key={review.id} className="w-[377px] h-[223px] bg-[#0F0F0F] border border-[#262626] rounded-[12px] p-[30px] flex flex-col justify-between flex-shrink-0">
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-white text-sm font-medium">{review.author}</h3>
                <p className="text-gray-400 text-[14px] leading-[150%] line-clamp-4 overflow-hidden">{review.content}</p>
              </div>
              <div className="flex items-center gap-[2px] border border-[#262626] rounded-[51px] px-[8px] py-[4px] w-fit">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < stars ? "text-[#E50914] text-sm" : "text-[#555555] text-sm"}>
                    {i < stars ? "★" : "☆"}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>

  </div>


  {/* RIGHT SIDE (SIDEBAR) */}
  <div className="w-[416px] border border-[#262626] bg-[#1A1A1A] rounded-[10px] p-[40px] flex flex-col gap-[30px] flex-shrink-0">
    <div className="flex flex-col gap-2">
      <p className="text-[#999] text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        Released Year
      </p>
      <h3 className="text-white text-xl font-semibold">
        {show?.first_air_date?.split("-")[0] || "N/A"}
      </h3>
    </div>

    <div className="flex flex-col gap-3">
      <p className="text-[#999] text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15 15 0 0 1 0 20"/>
          <path d="M12 2a15 15 0 0 0 0 20"/>
        </svg>
        Available Languages
      </p>
      <div className="flex flex-wrap gap-2">
        {languages.length > 0 ? (
          languages.map((lang: any) => (
            <span key={lang.iso_639_1} className="text-sm bg-[#141414] border border-[#262626] px-3 py-1 rounded-md">
              {lang.english_name}
            </span>
          ))
        ) : (
          <span className="text-sm text-gray-400">No languages available</span>
        )}
      </div>
    </div>

    <div className="flex flex-col gap-3">
      <p className="text-[#999] text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polygon points="12 2 15 8.5 22 9.3 17 14 18.5 21 12 17.5 5.5 21 7 14 2 9.3 9 8.5 12 2"/>
        </svg>
        Ratings
      </p>
      <div className="flex gap-4">
        <div className="flex-1 border border-[#262626] bg-[#141414] rounded-[10px] p-[16px] flex flex-col gap-2">
          <p className="text-white text-sm">IMDb</p>
          <div className="flex items-center gap-2">
            <div className="flex text-sm">{renderStars(show?.vote_average)}</div>
            <span className="text-white text-sm">{show?.vote_average?.toFixed(1) || "N/A"}</span>
          </div>
        </div>

        <div className="flex-1 border border-[#262626] bg-[#141414] rounded-[10px] p-[16px] flex flex-col gap-2">
          <p className="text-white text-sm">MovieBox</p>
          <div className="flex items-center gap-2">
            <div className="flex text-sm">{renderStars((show?.vote_average || 0) - 1)}</div>
            <span className="text-white text-sm">{show?.vote_average ? (show.vote_average - 1).toFixed(1) : "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-[#999] text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="16" rx="2"/>
          <line x1="8" y1="9" x2="16" y2="9"/>
          <line x1="8" y1="13" x2="16" y2="13"/>
        </svg>
        Genres
      </p>
      <div className="flex flex-wrap gap-3">
        {show?.genres?.map((g: any) => (
          <span key={g.id} className="border border-[#262626] bg-[#141414] px-4 py-2 rounded-[8px] text-sm text-white">
            {g.name}
          </span>
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-[#999] text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 2L15 8H21L16 12L18 18L12 14L6 18L8 12L3 8H9Z"/>
        </svg>
        Director
      </p>
      <div className="border border-[#262626] bg-[#141414] p-4 rounded-[10px] flex items-center gap-3">
        {director?.profile_path && (
          <img src={`https://image.tmdb.org/t/p/w200${director.profile_path}`} className="w-12 h-12 rounded-[8px] object-cover" alt={director?.name} />
        )}
        <div>
          <p className="text-white text-sm">{director?.name || "N/A"}</p>
          <p className="text-gray-400 text-xs">From TMDB</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <p className="text-[#999] text-sm flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 18V5l12-2v13"/>
          <circle cx="6" cy="18" r="3"/>
          <circle cx="18" cy="16" r="3"/>
        </svg>
        Music
      </p>
      <div className="border border-[#262626] bg-[#141414] p-4 rounded-[10px] flex items-center gap-3">
        {composer?.profile_path && (
          <img src={`https://image.tmdb.org/t/p/w200${composer.profile_path}`} className="w-12 h-12 rounded-[8px] object-cover" alt={composer?.name} />
        )}
        <div>
          <p className="text-white text-sm">{composer?.name || "N/A"}</p>
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