import Image from 'next/image';

interface FreeTrialBannerProps {
  backdropGrid: string[];
}

export default function FreeTrialBanner({ backdropGrid }: FreeTrialBannerProps) {
  return (
    <section 
    className="relative border border-[#262626] rounded-2xl px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden mx-auto w-full max-w-7xl h-auto md:h-[250px] py-8 md:py-0"
  >
   
      <div 
        className="absolute inset-0 grid grid-cols-9 p-4 opacity-40 pointer-events-none scale-105"
        style={{ 
          gridTemplateRows: 'repeat(4, 73.75px)',
          columnGap: '20px',
          rowGap: '20px' 
        }}
      >
        {backdropGrid.slice(0, 36).map((src, i) => (
          <div 
            key={i} 
            className="overflow-hidden relative rounded-none"
            style={{ width: '124.56px', height: '73.75px' }}
          >
            <Image src={src} alt="Poster" fill className="object-cover" />
          </div>
        ))}
      </div>


      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, #0F0F0F 0%, rgba(20, 15, 15, 0.92) 40%, rgba(40, 15, 15, 0.70) 70%, rgba(229, 0, 0, 0.50) 100%)'
        }}
      />

      
      <div className="space-y-2 text-center md:text-left z-10 w-full max-w-xl">
        <h2 className="text-[28px] leading-[150%] font-bold text-white w-full">
          Start your free trial today!
        </h2>
        <p className="text-[16px] leading-[150%] font-normal text-slate-300 w-full">
          This is a clear and concise call to action that encourages users to sign up for a free trial of MovieBox.
        </p>
      </div>

   
      <button 
        className="bg-[#E50000] hover:bg-red-700 text-white font-semibold text-[14px] rounded-[8px] z-10 transition whitespace-nowrap flex items-center justify-center gap-[10px]"
        style={{ width: '149px', height: '49px', padding: '14px 20px' }}
      >
        Start a Free Trial
      </button>
    </section>
  );
}