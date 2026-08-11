'use client';

import { FormEvent, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FreeTrialBanner from "@/components/FreeTrialBanner";

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [backdropGrid, setBackdropGrid] = useState<string[]>([]);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "What is StreamVibe?",
      answer: "StreamVibe is a streaming service that allows you to watch movies and shows on demand.",
    },
    {
      id: 2,
      question: "How much does StreamVibe cost?",
      answer: "StreamVibe provides multiple subscription plans designed for different viewing needs.",
    },
    {
      id: 3,
      question: "What content is available on StreamVibe?",
      answer: "You can explore a wide collection of movies, shows, trending releases, and popular content.",
    },
    {
      id: 4,
      question: "How can I watch StreamVibe?",
      answer: "You can watch StreamVibe from supported browsers, smart televisions, tablets, and mobile devices.",
    },
    {
      id: 5,
      question: "How do I sign up for StreamVibe?",
      answer: "Create an account, select your preferred subscription plan, and complete the registration process.",
    },
    {
      id: 6,
      question: "What is the StreamVibe free trial?",
      answer: "The free trial allows new users to explore StreamVibe before starting a paid subscription.",
    },
    {
      id: 7,
      question: "How do I contact StreamVibe customer support?",
      answer: "You can contact our customer support team using the support form available at the top of this page.",
    },
    {
      id: 8,
      question: "What are the StreamVibe payment methods?",
      answer: "StreamVibe supports multiple secure payment methods, including major debit and credit cards.",
    },
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!acceptedTerms) {
      return;
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const data = await res.json();

      setMovies(data.results);

      const images = data.results
        .filter((movie: any) => movie.backdrop_path)
        .map(
          (movie: any) =>
            `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
        );
const filledImages = Array.from({ length: 36 }, (_, i) => {
  return images[i % images.length];
});
      setBackdropGrid(filledImages);
    };

    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#141414] font-['Manrope'] text-white">
      <Navbar />

  {/* ================= SUPPORT FORM SECTION ================= */}
      <main className="pt-[168px] pb-[120px]">
        <section
          id="support-form"
          className="
            mx-auto grid w-full max-w-[1280px]
            grid-cols-1 items-start gap-[50px]
            px-[20px]
            lg:grid-cols-[420px_minmax(0,1fr)]
            lg:gap-[60px]
          "
        >
          {/* LEFT SIDE */}
          <div className="flex w-full flex-col">
            <h1
              className="
                max-w-[420px]
                text-[32px] font-bold leading-[150%]
                text-white
                md:text-[38px]
              "
            >
              Welcome to our
              <br />
              support page!
            </h1>

            <p
              className="
                mt-[10px] max-w-[420px]
                text-[14px] leading-[150%]
                text-[#999999]
              "
            >
              We&apos;re here to help you with any problems you may be having
              with our product.
            </p>

{/* MOVIES IMAGE */}
<div
  className="
    relative mt-[40px]
    w-full max-w-[429px] h-[380px]
    rounded-[6px]
    bg-[#0F0F0F]
    p-[20px]
    overflow-hidden
    shadow-[0_0_0_6px_#262626]
  "
>
  <div className="grid grid-cols-4 gap-[20px] -mt-[35px]">
    {movies.slice(0, 16).map((movie) => (
    <img
    key={movie.id}
    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
    alt={movie.title}
    className="w-full h-[120px] rounded-[12px] object-cover"
  />
    ))}

  </div>
</div>
</div>


          {/* RIGHT SIDE - FORM */}
          <form
  onSubmit={handleSubmit}
  className="
    w-full max-w-[800px]
    h-auto min-h-[592px]
    rounded-[10px]
    border border-[#262626]
    bg-[#0F0F0F]
    p-[20px] sm:p-[40px]
    flex flex-col gap-[30px] sm:gap-[40px]
  "
>
            <div className="grid grid-cols-1 gap-x-[30px] gap-y-[30px] md:grid-cols-2">
              {/* FIRST NAME */}
              <div className="flex flex-col gap-[14px]">
                <label
                  htmlFor="firstName"
                  className="text-[16px] font-semibold leading-[150%] text-white"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  className="
                    h-[53px] w-full rounded-[6px]
                    border border-[#262626]
                    bg-[#141414]
                    px-[16px]
                    text-[14px] text-white
                    outline-none
                    transition
                    placeholder:text-[#ffffff]
                    focus:border-[#E50000]
                  "
                />
              </div>

              {/* LAST NAME */}
              <div className="flex flex-col gap-[14px]">
                <label
                  htmlFor="lastName"
                  className="text-[16px] font-semibold leading-[150%] text-white"
                >
                  Last Name
                </label>

                <input
                  id="LastName"
                  name="LastName"
                  type="text"
                  placeholder="Enter Last Name"
                  className="
                    h-[53px] w-full rounded-[6px]
                    border border-[#262626]
                    bg-[#141414]
                    px-[16px]
                    text-[14px] text-white
                    outline-none
                    transition
                    placeholder:text-[#ffffff]
                    focus:border-[#E50000]
                  "
                />
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-[14px]">
                <label
                  htmlFor="email"
                  className="text-[16px] font-semibold leading-[150%] text-white"
                >
                  Email
                </label>

                <input
                  id="Email"
                  name="Email"
                  type="text"
                  placeholder="Enter Your Email"
                  className="
                    h-[53px] w-full rounded-[6px]
                    border border-[#262626]
                    bg-[#141414]
                    px-[16px]
                    text-[14px] text-white
                    outline-none
                    transition
                    placeholder:text-[#ffffff]
                    focus:border-[#E50000]
                  "
                />
              </div>

              {/* PHONE NUMBER */}
              <div className="flex flex-col gap-[14px]">
                <label
                  htmlFor="phoneNumber"
                  className="text-[16px] font-semibold leading-[150%] text-white"
                >
                  Phone Number
                </label>

                <div className="flex h-[58px] gap-[10px]">
                  <button
                    type="button"
                    aria-label="Select country"
                    className="
                      flex h-full w-[82px] flex-shrink-0
                      items-center justify-center gap-[8px]
                      rounded-[8px]
                      border border-[#262626]
                      bg-[#141414]
                    "
                  >
                    <span className="text-[20px]">🇸🇦</span>

                    <svg
                      className="h-[14px] w-[14px] text-[#ffffff]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="Enter Phone Number"
                    className="
                      h-full min-w-0 flex-1 rounded-[8px]
                      border border-[#262626]
                      bg-[#141414]
                      px-[20px]
                      text-[14px] text-white
                      outline-none
                      transition
                      placeholder:text-[#595959]
                      focus:border-[#E50000]
                    "
                  />
                </div>
              </div>
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col gap-[14px]">
              <label
                htmlFor="message"
                className="text-[16px] font-semibold leading-[150%] text-white"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                placeholder="Enter your Message"
                className="
                  h-[129px] w-full resize-none
                  rounded-[6px]
                  border border-[#262626]
                  bg-[#141414]
                  p-[16px]
                  text-[14px] leading-[150%]
                  text-white
                  outline-none
                  transition
                  placeholder:text-[#595959]
                  focus:border-[#E50000]
                "
              />
            </div>

            {/* FORM BOTTOM */}
            <div
              className="
                flex flex-col
                gap-[24px]
                sm:flex-row sm:items-center sm:justify-between
              "
            >
              <label className="flex cursor-pointer items-center gap-[10px]">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) => setAcceptedTerms(event.target.checked)}
                  className="peer sr-only"
                />

                <span
                  className="
                    flex h-[24px] w-[24px] flex-shrink-0
                    items-center justify-center
                    rounded-[4px]
                    border border-[#262626]
                    bg-[#141414]
                    transition
                    peer-checked:border-[#E50000]
                    peer-checked:bg-[#E50000]
                  "
                >
                  {acceptedTerms && (
                    <svg
                      className="h-[15px] w-[15px] text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </span>

                <span className="text-[14px] leading-[150%] text-[#999999]">
                  I agree with Terms of Use and Privacy Policy
                </span>
              </label>

              <button
                type="submit"
                className="
                  flex h-[49px] min-w-[138px]
                  items-center justify-center
                  rounded-[6px]
                  bg-[#E50000]
                  px-[20px]
                  text-[14px] font-semibold text-white
                  transition
                  hover:bg-[#B8070F]
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
                disabled={!acceptedTerms}
              >
                Send Message
              </button>
            </div>
          </form>
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
                 
                          <h3 className="text-[18px] sm:text-[20px] leading-[150%] font-medium text-white flex-1">
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
        {/* BANNER SECTION */}
        <FreeTrialBanner backdropGrid={backdropGrid} />
      </main>
      <Footer />
    </div>
  );
}