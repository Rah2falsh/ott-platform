interface SliderNavigationProps {
    onPrev?: () => void;
    onNext?: () => void;
  }
  
  export default function SliderNavigation({ onPrev, onNext }: SliderNavigationProps) {
    return (
      <div className="flex items-center justify-between bg-[#0F0F0F] border-[1px] border-[#1F1F1F] px-[12px] rounded-[10px] w-[205px] h-[68px] self-start md:self-auto box-border flex-shrink-0">
   
        <button 
          onClick={onPrev}
          className="w-[44px] h-[44px] bg-[#1F1F1F] border border-[#262626] rounded-[6px] text-white hover:bg-[#262626] transition flex items-center justify-center flex-shrink-0 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
  
        <div className="flex items-center gap-[4px]">
          <span className="w-[12px] h-[3px] bg-[#E50000] rounded-sm"/>
          <span className="w-[6px] h-[3px] bg-[#262626] rounded-sm"/>
          <span className="w-[6px] h-[3px] bg-[#262626] rounded-sm"/>
          <span className="w-[6px] h-[3px] bg-[#262626] rounded-sm"/>
        </div>
  
 
        <button 
          onClick={onNext}
          className="w-[44px] h-[44px] bg-[#1F1F1F] border border-[#262626] rounded-[6px] text-white hover:bg-[#262626] transition flex items-center justify-center flex-shrink-0 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    );
  }