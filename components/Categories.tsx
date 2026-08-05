import Image from 'next/image';

interface CategoriesProps {
  moviePosters: string[];
}

export default function Categories({ moviePosters }: CategoriesProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {['Action', 'Adventure', 'Comedy', 'Drama', 'Horror'].map((cat, idx) => {
        const categoryPosters = moviePosters.slice(idx * 4, (idx * 4) + 4);
        
        return (
          <div 
            key={idx} 
            className="bg-[#1A1A1A] border-[1px] border-[#1F1F1F] p-[24px] rounded-[10px] hover:border-slate-700 transition group cursor-pointer flex flex-col justify-between"
          >
            <div className="grid grid-cols-2 gap-2 bg-[#1A1A1A] p-1 rounded-xl mb-3 aspect-square relative overflow-hidden">
              {categoryPosters.map((img, i) => (
                <div key={i} className="relative w-full h-full rounded-lg overflow-hidden scale-105">
                  <Image src={img} alt={`${cat} ${i}`} fill className="object-cover" sizes="120px" />
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-[16px] leading-[150%] font-semibold text-white w-full">
              <span className="w-[167.8px] truncate">{cat}</span>
              <svg className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}