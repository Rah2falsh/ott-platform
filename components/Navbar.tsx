'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50 -mt-6 px-6 md:px-12 pt-0 pb-0 flex items-center justify-between bg-transparent">
      
      {/* اللوجو */}
      <Link href="/" className="flex items-center z-10 pl-0">
        <div className="relative w-60 h-[200px] md:w-80 md:h-[260px]">
          <Image 
            src="/MovieBox.png" 
            alt="MovieBox Logo" 
            fill 
            className="object-contain" 
            priority
          />
        </div>
      </Link>

      {/* NAV LINKS */}
      <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 flex-row items-center bg-[#0F0F0F] rounded-[10px] border-[3px] border-[#1F1F1F] pt-[12px] pb-[12px] pl-[12px] pr-[24px] gap-[10px] font-['Manrope'] text-[14px] leading-[150%] font-normal text-white">
        
        <Link
          href="/"
          className={`px-4 py-2.5 rounded-[7px] transition ${
            pathname === '/'
              ? 'bg-[#1F1F1F] text-white font-semibold shadow'
              : 'text-white hover:text-slate-200'
          }`}
        >
          Home
        </Link>

        <Link
          href="/movies"
          className={`px-2 py-2.5 rounded-[7px] transition ${
            pathname.startsWith('/movies')
              ? 'bg-[#1F1F1F] text-white font-semibold shadow'
              : 'text-white hover:text-slate-200'
          }`}
        >
          Movies & Shows
        </Link>

        <Link
  href="/support"
  className={`px-2 py-2.5 rounded-[7px] transition ${
    pathname.startsWith('/support')
      ? 'bg-[#1F1F1F] text-white font-semibold shadow'
      : 'text-white hover:text-slate-200'
  }`}
>
  Support
</Link>

<Link
  href="/subscriptions"
  className={`px-2 py-2.5 rounded-[7px] transition ${
    pathname.startsWith('/subscriptions')
      ? 'bg-[#1F1F1F] text-white font-semibold shadow'
      : 'text-white hover:text-slate-200'
  }`}
>
Subscriptions
</Link>

      </nav>

  {/* ICONS & MOBILE MENU */}
  <div className="flex items-center gap-3 text-white z-10">
        
        {/* Search */}
        <button className="p-2 hover:text-slate-300 transition" aria-label="Search">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Notifications */}
        <button className="p-2 hover:text-slate-300 transition" aria-label="Notifications">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        {/* زر المنيو للجوال (المربع بالمواصفات المطلوبة) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center bg-[#0F0F0F] rounded-[6px] border-[3px] border-[#1F1F1F] p-[12px] gap-[10px] text-white hover:border-slate-700 transition"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* القائمة المنسدلة الجانبية للجوال */}
      {isOpen && (
        <div className="absolute top-full left-6 right-6 mt-2 bg-[#0F0F0F] border-[3px] border-[#1F1F1F] rounded-[10px] p-4 flex flex-col gap-2 md:hidden shadow-2xl z-50">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2.5 rounded-[7px] text-white transition ${pathname === '/' ? 'bg-[#1F1F1F] font-semibold' : 'hover:bg-[#1F1F1F]/50'}`}
          >
            Home
          </Link>
          <Link
            href="/movies"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2.5 rounded-[7px] text-white transition ${pathname.startsWith('/movies') ? 'bg-[#1F1F1F] font-semibold' : 'hover:bg-[#1F1F1F]/50'}`}
          >
            Movies & Shows
          </Link>
          <Link
            href="/support"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2.5 rounded-[7px] text-white transition ${pathname.startsWith('/support') ? 'bg-[#1F1F1F] font-semibold' : 'hover:bg-[#1F1F1F]/50'}`}
          >
            Support
          </Link>
          <Link
            href="/subscriptions"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-2.5 rounded-[7px] text-white transition ${pathname.startsWith('/subscriptions') ? 'bg-[#1F1F1F] font-semibold' : 'hover:bg-[#1F1F1F]/50'}`}
          >
            Subscriptions
          </Link>
        </div>
      )}

    </header>
  );
}