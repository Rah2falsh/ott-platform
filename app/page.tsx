'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Categories from '@/components/Categories';
import SliderNavigation from '@/components/SliderNavigation';
import FreeTrialBanner from '@/components/FreeTrialBanner';



export default function Home() {
const [openFaq, setOpenFaq] = useState<number | null>(0);
const [isYearly, setIsYearly] = useState(false);
const [openIndex, setOpenIndex] = useState<number | null>(0);

const [moviePosters, setMoviePosters] = useState<string[]>([
"https://image.tmdb.org/t/p/w500/q6y0Go1tsGEmtA3P9A46S599K3f.jpg",
"https://image.tmdb.org/t/p/w500/1E5baAaEse26fej3uH4A9P3A2C.jpg",
"https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
"https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv3ioR1ks.jpg",
"https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
]);

useEffect(() => {
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (API_KEY) {
fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
.then((res) => res.json())
.then((data) => {
if (data.results && data.results.length > 0) {
const shuffled = [...data.results].sort(() => 0.5 - Math.random());
const posters = shuffled
.filter((m: any) => m.poster_path)
.map((m: any) => `https://image.tmdb.org/t/p/w500${m.poster_path}`);
setMoviePosters(posters);
}
})
.catch((err) => console.error("Error fetching from TMDB:", err));
}
}, []);

const backdropGrid = [...moviePosters, ...moviePosters, ...moviePosters, ...moviePosters];

const faqs = [
{ id: 0, q: "What is MovieBox?", a: "MovieBox is a streaming service that allows you to watch movies and shows on demand." },
{ id: 1, q: "How much does MovieBox cost?", a: "Plans start at $9.99/month for Basic, $12.99/month for Standard, and $14.99/month for Premium." },
{ id: 2, q: "What content is available on MovieBox?", a: "MovieBox offers a wide library of movies, TV series, documentaries, and exclusive originals." },
{ id: 3, q: "How can I watch MovieBox?", a: "You can watch on Smart TVs, Laptops, Smartphones, Tablets, Gaming Consoles, and VR Headsets." },
{ id: 4, q: "How do I sign up for MovieBox?", a: "Simply click on 'Start Your Free Trial' button and select your preferred subscription plan." },
{ id: 5, q: "What is the MovieBox free trial?", a: "We offer a 7-day free trial for new members to explore all features risk-free." },
{ id: 6, q: "How do I contact MovieBox customer support?", a: "You can reach out via our Support tab or email our 24/7 help desk." },
{ id: 7, q: "What are the MovieBox payment methods?", a: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay." },
];

const devices = [
{
title: "Smartphones",
desc: "MovieBox is optimized for both Android and iOS smartphones. Download our app from Google Play or Apple App Store.",
icon: (
<svg className="w-6 h-6 text-[#E50000]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
<line x1="11" y1="18" x2="13" y2="18" />
</svg>
)
},
{
title: "Tablet",
desc: "MovieBox is optimized for both Android and iOS tablets. Stream seamlessly on larger screens.",
icon: (
<svg className="w-6 h-6 text-[#E50000]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
<line x1="11" y1="18" x2="13" y2="18" />
</svg>
)
},
{
title: "Smart TV",
desc: "Enjoy big-screen entertainment on Samsung, LG, Android TV, Apple TV, and Roku devices.",
icon: (
<svg className="w-6 h-6 text-[#E50000]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<rect x="2" y="4" width="20" height="13" rx="2" />
<path d="M8 21h8m-4-4v4" />
</svg>
)
},
{
title: "Laptops",
desc: "Watch directly from your favorite browser on macOS, Windows, or ChromeOS with full HD quality.",
icon: (
<svg className="w-6 h-6 text-[#E50000]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M20 16V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10m16 0H4m16 0a2 2 0 0 1 2 2v1H2v-1a2 2 0 0 1 2-2" />
</svg>
)
},
{
title: "Gaming Consoles",
desc: "Stream on PlayStation 4, PlayStation 5, Xbox One, and Xbox Series X/S.",
icon: (
<svg className="w-6 h-6 text-[#E50000]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<line x1="6" y1="12" x2="10" y2="12" />
<line x1="8" y1="10" x2="8" y2="14" />
<circle cx="15" cy="11" r="1" fill="currentColor" />
<circle cx="17" cy="13" r="1" fill="currentColor" />
<path d="M17.8 20a2 2 0 0 0 2-1.6l1-8a2 2 0 0 0-1.8-2.3C18.2 8 16 9 12 9s-6.2-1-7-1A2 2 0 0 0 3.2 10.4l1 8A2 2 0 0 0 6.2 20c1.5 0 2.2-1.5 3.3-1.5h5c1 0 1.8 1.5 3.3 1.5z" />
</svg>
)
},
{
title: "VR Headsets",
desc: "Experience immersive cinema viewing on Meta Quest and Apple Vision Pro.",
icon: (
<svg className="w-6 h-6 text-[#E50000]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
<path d="M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-4.2a2 2 0 0 0-1.6.8l-1.4 1.8a1 1 0 0 1-1.6 0l-1.4-1.8a2 2 0 0 0-1.6-.8H4a2 2 0 0 1-2-2v-6z" />
<circle cx="7" cy="13" r="2" />
<circle cx="17" cy="13" r="2" />
</svg>
)
},
];

return (
  <div className="min-h-screen bg-[#141414] text-slate-100 font-sans selection:bg-[#E50000] selection:text-white relative">
    
    <Navbar />
    
{/* HERO SECTION */}
<section className="relative w-full h-[85vh] min-h-[600px] max-h-[850px] bg-[#0F0F0F] flex flex-col items-center justify-between text-center px-4 py-8 border-b border-[#1F1F1F] overflow-hidden">
<div className="absolute inset-0 w-full h-full grid grid-cols-3 lg:grid-cols-9 gap-[10px] p-3 pointer-events-none overflow-hidden items-center justify-center">
{backdropGrid.slice(0, 36).map((src, i) => (
<div
key={i}
className="w-full h-[200px] rounded-[12px] overflow-hidden relative"
>
<Image
src={src}
alt={`Movie Poster ${i}`}
fill
className="object-cover"
sizes="(max-width: 1024px) 669px, 991px"
/>
</div>
))}
</div>
<div className="absolute inset-0 bg-[#141414]/50 pointer-events-none z-[1]" />


<div
className="absolute top-0 inset-x-0 h-[35%] pointer-events-none z-[2]"
style={{
background: 'linear-gradient(to bottom, #141414 0%, rgba(20, 20, 20, 0) 100%)'
}}
/>

<div
className="absolute bottom-0 inset-x-0 h-[45%] pointer-events-none z-[2]"
style={{
background: 'linear-gradient(to top, #141414 0%, rgba(20, 20, 20, 0) 100%)'
}}
        />


<div className="relative z-10 w-72 h-72 sm:w-96 sm:h-96 md:w-[480px] md:h-[480px] mt-32 flex items-center justify-center filter drop-shadow-[0_0_80px_rgba(229,0,0,0.7)]">
          <Image 
            src="/MovieBox.png" 
            alt="MovieBox Main Logo" 
            fill 
            className="object-contain" 
            priority
          />
        </div>
      </section>

{/* SECTIONS */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">

<div className="text-center mx-auto space-y-3 -mt-12 relative z-20 overflow-visible">
  <h1 className="text-[60px] font-normal text-white tracking-tight leading-[120%] whitespace-nowrap">
    The Best Streaming Experience
  </h1>


  <p 
  className="text-[14px] leading-[150%] max-w-4xl mx-auto font-normal text-center"
  style={{ color: '#999999' }}
>
  MovieBox is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With MovieBox, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.
</p>
          <div className="pt-2">
            <button className="bg-[#E50000] hover:bg-red-700 text-white font-bold px-[24px] py-[18px] rounded-[8px] shadow-lg shadow-red-600/30 transition hover:scale-105 flex items-center gap-[4px] mx-auto text-sm">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              <span>Start Watching Now</span>
            </button>
          </div>
        </div>
</main>

{/* MAIN SECTIONS */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">


{/* CATEGORIES SECTION */}
<section className="space-y-8">
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
    <div className="space-y-2 w-full max-w-[994px]">
      <h2 className="text-[28px] leading-[150%] font-bold text-white w-full">
        Explore our wide variety of categories
      </h2>
      <p className="text-[16px] leading-[150%] font-normal text-slate-400 w-full">
        Whether you're looking for a comedy, drama, or documentary.
      </p>
    </div>
    
 <SliderNavigation />
  </div>
<Categories moviePosters={moviePosters} />
</section>


{/* DEVICES SECTION */}
<section className="space-y-12">
          <div className="space-y-2 w-full max-w-[1129px]">
            <h2 className="text-[28px] leading-[150%] font-bold text-white w-full">
              We Provide you streaming experience across various devices.
            </h2>
            <p className="text-[16px] leading-[150%] font-normal text-slate-400 w-full">
              With MovieBox, you can enjoy your favorite movies and TV shows anytime, anywhere.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {devices.map((dev, idx) => (
              <div 
                key={idx} 
                className="bg-[#0F0F0F] border-[1px] border-[#1F1F1F] p-[40px] rounded-[10px] space-y-[24px] hover:border-red-600/50 transition relative overflow-hidden flex flex-col justify-between"
                style={{
                  backgroundImage: 'radial-gradient(circle at top right, rgba(229, 0, 0, 0.12) 0%, transparent 50%), linear-gradient(#0F0F0F, #0F0F0F)'
                }}
              >
                <div className="flex items-center gap-[24px]">
                  <div className="w-[54px] h-[54px] bg-[#1F1F1F] border-[1px] border-[#262626] rounded-[10px] p-[12px] flex items-center justify-center flex-shrink-0 text-[#E50000] [&>svg]:fill-current [&>svg]:stroke-none">
                    {dev.icon}
                  </div>
                  
                  <h3 className="text-[20px] leading-[150%] font-semibold text-white w-[267px]">
                    {dev.title}
                  </h3>
                </div>

          
                <p className="text-[16px] leading-[150%] font-normal text-slate-400 w-[333px]">
                  {dev.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

{/* FAQ SECTION */}
<section className="space-y-16 py-12 max-w-7xl mx-auto px-4">
        
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 w-full max-w-[1060px]">
              <h2 className="text-[28px] leading-[150%] font-bold text-white w-full">
                Frequently Asked Questions
              </h2>
              <p className="text-[16px] leading-[150%] font-normal text-slate-400">
                Got questions? We've got answers! Check out our FAQ section to find answers to the most common questions about MovieBox.
              </p>
            </div>
            <button className="bg-[#E50000] hover:bg-red-700 text-white font-semibold text-[14px] px-[20px] py-[14px] rounded-[6px] transition self-start md:self-auto flex items-center justify-center gap-[10px] flex-shrink-0 h-[49px] whitespace-nowrap">
              Ask a Question
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {[
           
              [
                { id: 0, num: '01', q: 'What is MovieBox?', a: 'MovieBox is a streaming service that allows you to watch movies and shows on demand.' },
                { id: 1, num: '02', q: 'How much does MovieBox cost?', a: 'MovieBox offers flexible subscription plans tailored to your entertainment needs.' },
                { id: 2, num: '03', q: 'What content is available on MovieBox?', a: 'MovieBox provides a wide variety of categories including action, comedy, drama, and documentaries.' },
                { id: 3, num: '04', q: 'How can I watch MovieBox?', a: 'You can watch MovieBox across various devices including smart TVs, smartphones, tablets, and gaming consoles.' }
              ],
           
              [
                { id: 4, num: '05', q: 'How do I sign up for MovieBox?', a: 'Simply click on the start watching button or register via our app stores to create your account.' },
                { id: 5, num: '06', q: 'What is the MovieBox free trial?', a: 'We offer a special trial period for new users to explore our extensive library of movies and shows.' },
                { id: 6, num: '07', q: 'How do I contact MovieBox customer support?', a: 'You can reach out to our support team anytime through the help section on our platform.' },
                { id: 7, num: '08', q: 'What are the MovieBox payment methods?', a: 'We support multiple secure payment gateways including major credit cards and digital wallets.' }
              ]
            ].map((column, colIdx) => (
              <div key={colIdx} className="space-y-6">
                {column.map((item) => {
                  const isOpen = openIndex === item.id;

                  return (
                    <div key={item.id} className="relative pb-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-6">
                 
                          <div className="w-[52px] h-[54px] bg-[#1A1A1A] border border-[#262626] rounded-[8px] p-[16px] flex items-center justify-center text-white font-semibold text-lg flex-shrink-0 box-border">
                            {item.num}
                          </div>
                 
                          <h3 className="text-[20px] leading-[150%] font-medium text-white w-full md:w-[466px]">
                            {item.q}
                          </h3>
                        </div>

                        <button 
                          onClick={() => setOpenIndex(isOpen ? null : item.id)}
                          className="w-[24px] h-[24px] text-white flex items-center justify-center flex-shrink-0 text-xl font-light hover:text-red-500 transition mt-3"
                        >
                          {isOpen ? '−' : '+'}
                        </button>
                      </div>

                      {isOpen && (
                        <p className="text-slate-400 text-[16px] leading-[150%] pl-[76px] pt-4">
                          {item.a}
                        </p>
                      )}

                      <div 
                        className="absolute bottom-0 left-0 w-full h-[1px]" 
                        style={{
                          background: 'linear-gradient(90deg, rgba(229, 0, 0, 0) 0%, rgba(229, 0, 0, 0.8) 50%, rgba(229, 0, 0, 0) 100%)'
                        }} 
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </section>

{/* PRICING SECTION */}
<section className="space-y-16">

  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <div className="space-y-2 w-full max-w-[1010px]">
      <h2 className="text-[28px] leading-[150%] font-bold text-white w-full">
        Choose the plan that's right for you
      </h2>
      <p className="text-[16px] leading-[150%] font-normal text-slate-400 w-full">
        Join MovieBox and select from our flexible subscription options.
      </p>
    </div>


    <div className="bg-[#0F0F0F] border border-[#1F1F1F] p-[8px] rounded-[8px] flex items-center w-[190px] h-[61px] flex-shrink-0">
      <button
        onClick={() => setIsYearly(false)}
        className={`w-[85px] h-[45px] rounded-[6px] transition flex items-center justify-center text-[14px] leading-[150%] font-medium ${!isYearly ? 'bg-[#1F1F1F] text-white' : 'text-slate-400'}`}
      >
        Monthly
      </button>
      <button
        onClick={() => setIsYearly(true)}
        className={`w-[85px] h-[45px] rounded-[6px] transition flex items-center justify-center text-[14px] leading-[150%] font-medium ${isYearly ? 'bg-[#1F1F1F] text-white' : 'text-slate-400'}`}
      >
        Yearly
      </button>
    </div>
  </div>


  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      {
        name: 'Basic Plan',
        desc: 'Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.',
        priceMonthly: '$9.99',
        priceYearly: '$99.99',
      },
      {
        name: 'Standard Plan',
        desc: 'Access to a wider selection of movies and shows in HD, ideal for families and multi-device streaming.',
        priceMonthly: '$12.99',
        priceYearly: '$129.99',
      },
      {
        name: 'Premium Plan',
        desc: 'Access to a widest selection of movies and shows in 4K Ultra HD. The ultimate cinema experience.',
        priceMonthly: '$14.99',
        priceYearly: '$149.99',
      }
    ].map((plan, idx) => (
      <div 
        key={idx} 
        className="bg-[#1A1A1A] border border-[#262626] rounded-[10px] p-[40px] flex flex-col justify-between space-y-[40px]"
        style={{ width: '100%', maxWidth: '413.33px' }}
      >

        <div className="space-y-4">
          <h3 className="text-[20px] leading-[150%] font-bold text-white">
            {plan.name}
          </h3>
          <p className="text-[16px] leading-[150%] font-normal text-slate-400">
            {plan.desc}
          </p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-[30px] font-semibold text-white tracking-tight">
            {isYearly ? plan.priceYearly : plan.priceMonthly}
          </span>
          <span className="text-slate-400 text-sm">
            {isYearly ? '/year' : '/month'}
          </span>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <button className="flex-1 bg-[#141414] border border-[#262626] hover:bg-[#202020] text-white font-semibold text-sm py-3 px-4 rounded-lg transition text-center">
            Start Free Trial
          </button>
          <button className="flex-1 bg-[#E50000] hover:bg-red-700 text-white font-semibold text-sm py-3 px-4 rounded-lg transition text-center">
            Choose Plan
          </button>
        </div>
      </div>
    ))}
  </div>
</section>

{/* BANNER SECTION */}
<FreeTrialBanner backdropGrid={backdropGrid} />

</main>
<Footer />

</div>
);
}