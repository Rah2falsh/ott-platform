export default function Footer() {
    return (
        
<footer
        className="bg-[#0F0F0F] mx-auto flex flex-col justify-between overflow-hidden" 
        style={{ 
          width: '1440px', 
          maxWidth: '100%', 
          minHeight: '414px', 
          padding: '80px 80px 40px 80px', 
          gap: '80px' 
        }}
      >
        <div className="max-w-7xl w-full mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">
   
          <div className="space-y-[15px]" style={{ width: '100%', maxWidth: '196.67px' }}>
            <h4 className="text-white text-[18px] leading-[150%] font-semibold">Home</h4>
            <div className="space-y-[12px]">
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Categories</p>
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Devices</p>
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Pricing</p>
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">FAQ</p>
            </div>
          </div>

    
          <div className="space-y-[15px]" style={{ width: '100%', maxWidth: '196.67px' }}>
            <h4 className="text-white text-[18px] leading-[150%] font-semibold">Movies</h4>
            <div className="space-y-[12px]">
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Genders</p>
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Trending</p>
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">New Release</p>
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Popular</p>
            </div>
          </div>

        
          <div className="space-y-[15px]" style={{ width: '100%', maxWidth: '196.67px' }}>
            <h4 className="text-white text-[18px] leading-[150%] font-semibold">Shows</h4>
            <div className="space-y-[12px]">
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Genders</p>
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Popular</p>
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Upcoming</p>
            </div>
          </div>


          <div className="space-y-[15px]" style={{ width: '100%', maxWidth: '196.67px' }}>
            <h4 className="text-white text-[18px] leading-[150%] font-semibold">Support</h4>
            <div className="space-y-[12px]">
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Contact Us</p>
            </div>
          </div>


          <div className="space-y-[15px]" style={{ width: '100%', maxWidth: '196.67px' }}>
            <h4 className="text-white text-[18px] leading-[150%] font-semibold">Subscription</h4>
            <div className="space-y-[12px]">
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Plans</p>
              <p className="text-[#999999] text-[16px] leading-[150%] font-medium hover:text-white cursor-pointer transition">Features</p>
            </div>
          </div>


          <div className="space-y-[15px]" style={{ width: '100%', maxWidth: '196.67px' }}>
            <h4 className="text-white text-[18px] leading-[150%] font-semibold">Connect With Us</h4>
            <div className="flex items-center gap-[10px] pt-1">
              {/* Facebook Icon Box */}
              <div 
                className="bg-[#141414] border border-[#262626] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#202020] text-white transition box-border"
                style={{ width: '44px', height: '44px', padding: '12px' }}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>

              {/* X (Twitter) Icon Box */}
              <div 
                className="bg-[#141414] border border-[#262626] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#202020] text-white transition box-border"
                style={{ width: '44px', height: '44px', padding: '12px' }}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>

              {/* Instagram Icon Box */}
              <div 
                className="bg-[#141414] border border-[#262626] rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#202020] text-white transition box-border"
                style={{ width: '44px', height: '44px', padding: '12px' }}
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>


        <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row items-center justify-between border-t border-[#1F1F1F] pt-8 text-[14px] leading-[150%] font-normal text-[#999999] gap-4">
          <p>©2026 MovieBox. All Rights Reserved</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">Terms of Use</span>
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Cookie Policy</span>
          </div>
        </div>
        </footer>
);
}