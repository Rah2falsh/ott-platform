'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FreeTrialBanner from '@/components/FreeTrialBanner';

export default function Subscriptions() {
  const [isYearly, setIsYearly] = useState(false);
  const backdropGrid: string[] = []; 

  return (
    <div className="min-h-screen bg-[#141414] text-slate-100 font-sans">
      <Navbar />
      <main className="pt-[180px] pb-20">

        <section className="space-y-16 max-w-7xl mx-auto px-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

            <div className="space-y-2 w-full max-w-[1010px]">

              <h2 className="text-[28px] leading-[150%] font-bold text-white">
                Choose the plan that's right for you
              </h2>

              <p className="text-[16px] leading-[150%] text-slate-400">
                Join MovieBox and select from our flexible subscription options.
              </p>

            </div>
            <div className="bg-[#0F0F0F] border border-[#1F1F1F] p-[8px] rounded-[8px] flex items-center w-[190px] h-[61px]">

              <button
                onClick={() => setIsYearly(false)}
                className={`w-[85px] h-[45px] rounded-[6px] transition flex items-center justify-center text-[14px]
                ${!isYearly ? 'bg-[#1F1F1F] text-white' : 'text-slate-400'}`}
              >
                Monthly
              </button>


              <button
                onClick={() => setIsYearly(true)}
                className={`w-[85px] h-[45px] rounded-[6px] transition flex items-center justify-center text-[14px]
                ${isYearly ? 'bg-[#1F1F1F] text-white' : 'text-slate-400'}`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* PLANS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


            {[
              {
                name:'Basic Plan',
                desc:'Enjoy an extensive library of movies and shows, featuring a range of content, including recently released titles.',
                priceMonthly:'$9.99',
                priceYearly:'$99.99'
              },

              {
                name:'Standard Plan',
                desc:'Access to a wider selection of movies and shows in HD, ideal for families and multi-device streaming.',
                priceMonthly:'$12.99',
                priceYearly:'$129.99'
              },

              {
                name:'Premium Plan',
                desc:'Access to a widest selection of movies and shows in 4K Ultra HD. The ultimate cinema experience.',
                priceMonthly:'$14.99',
                priceYearly:'$149.99'
              }

            ].map((plan,index)=>(


              <div
                key={index}
                className="
                bg-[#1A1A1A]
                border border-[#262626]
                rounded-[10px]
                p-[40px]
                flex flex-col
                justify-between
                space-y-[40px]
                "
              >
                {/* TEXT */}
                <div className="space-y-4">
                  <h3 className="text-[20px] font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-[16px] text-slate-400 leading-[150%]">
                    {plan.desc}
                  </p>

                </div>
                {/* PRICE */}
                <div className="flex items-baseline gap-1">

                  <span className="text-[30px] font-semibold text-white">
                    {isYearly 
                    ? plan.priceYearly 
                    : plan.priceMonthly}
                  </span>


                  <span className="text-slate-400 text-sm">
                    {isYearly ? '/year' : '/month'}
                  </span>

                </div>
                {/* BUTTONS */}
                <div className="flex items-center gap-4">

                  <button
                  className="
                  flex-1
                  bg-[#141414]
                  border border-[#262626]
                  text-white
                  font-semibold
                  text-sm
                  py-3
                  rounded-lg
                  "
                  >
                    Start Free Trial
                  </button>



                  <button
                  className="
                  flex-1
                  bg-[#E50000]
                  text-white
                  font-semibold
                  text-sm
                  py-3
                  rounded-lg
                  "
                  >
                    Choose Plan
                  </button>


                </div>


              </div>


            ))}


          </div>


        </section>

{/* ================= COMPARISON TABLE ================= */}
<section className="w-full max-w-7xl px-5 mx-auto mt-24 mb-20">
              {/* Section Header */}
          <div className="mb-12">
          <h2 className="text-[24px] sm:text-[32px] md:text-[38px] font-bold text-white mb-3">
  Compare our plans and find the right one for you
</h2>
            <p className="text-slate-400 text-[16px]">
              StreamVibe offers three different plans to fit your needs: Basic, Standard, and Premium. Compare the features of each plan and choose the one that&apos;s right for you.
            </p>
          </div>

{/* Table Container */}
<div className="
              w-full
              bg-transparent
              border border-[#262626]
              rounded-[12px]
              overflow-x-auto
            ">
              
              <table className="w-full min-w-[700px] text-left border-collapse">
                          
              {/* Table Header */}
              <thead className="bg-[#0F0F0F]">
              <tr className="border-b border-[#262626] divide-x divide-[#262626]">
              <th className="
p-6
text-white
font-semibold
text-[18px]
w-1/4
border-r border-[#262626]
">Features</th>

<th className="
p-6
text-white
font-semibold
text-[18px]
w-1/4
border-r border-[#262626]
">Basic</th>

<th className="
p-6
text-white
font-semibold
text-[18px]
w-1/4
border-r border-[#262626]
">
   <div className="flex items-center gap-2">
Standard
<span className="
bg-[#E50000]
text-white
text-[14px]
font-medium
w-[71px]
h-[22px]
rounded-[2px]
px-[10px]
py-[6px]
flex
items-center
justify-center
gap-[10px]
">
Popular
</span>
                    </div>
                  </th>
                  <th className="
p-6
text-white
font-semibold
text-[18px]
w-1/4
">
Premium
</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="
              divide-y divide-[#262626]
              text-[#999999]
              text-[15px]
              ">
                
                <tr>
                <td className="p-6 text-white font-medium border-r border-[#262626]">Price</td>
                <td className="p-6 border-r border-[#262626]">$9.99/Month</td>
                <td className="p-6 border-r border-[#262626]">$12.99/Month</td>
                <td className="p-6 border-r border-[#262626]">$14.99/Month</td>    
                </tr>

                <tr>
                <td className="p-6 text-white font-medium border-r border-[#262626]">Content</td>
                  <td className="p-6 border-r border-[#262626]">Access to a wide selection of movies and shows, including some new releases.</td>
                  <td className="p-6 border-r border-[#262626]">Access to a wider selection of movies and shows, including most new releases and exclusive content</td>
                  <td className="p-6 border-r border-[#262626]">Access to a widest selection of movies and shows, including all new releases and Offline Viewing</td>
                </tr>

                <tr>
                <td className="p-6 text-white font-medium border-r border-[#262626]">Devices</td>
                  <td className="p-6 border-r border-[#262626]">Watch on one device simultaneously</td>
                  <td className="p-6 border-r border-[#262626]">Watch on Two device simultaneously</td>
                  <td className="p-6 border-r border-[#262626]">Watch on Four device simultaneously</td>
                </tr>

                <tr>
                <td className="p-6 text-white font-medium border-r border-[#262626]">Free Trail</td>
                  <td className="p-6 border-r border-[#262626]">7 Days</td>
                  <td className="p-6 border-r border-[#262626]">7 Days</td>
                  <td className="p-6 border-r border-[#262626]">7 Days</td>
                </tr>

                <tr>
                <td className="p-6 text-white font-medium border-r border-[#262626]">Cancel Anytime</td>
                  <td className="p-6 border-r border-[#262626]">Yes</td>
                  <td className="p-6 border-r border-[#262626]">Yes</td>
                  <td className="p-6 border-r border-[#262626]">Yes</td>
                </tr>

                <tr>
                <td className="p-6 text-white font-medium border-r border-[#262626]">HDR</td>
                  <td className="p-6 border-r border-[#262626]">No</td>
                  <td className="p-6 border-r border-[#262626]">Yes</td>
                  <td className="p-6 border-r border-[#262626]">Yes</td>
                </tr>

                <tr>
                <td className="p-6 text-white font-medium border-r border-[#262626]">Dolby Atmos</td>
                <td className="p-6 border-r border-[#262626]">No</td>
                <td className="p-6 border-r border-[#262626]">Yes</td>
                <td className="p-6 border-r border-[#262626]">Yes</td>
                </tr>

                <tr>
                <td className="p-6 text-white font-medium border-r border-[#262626]">Ad - Free</td>
                <td className="p-6 border-r border-[#262626]">No</td>
                <td className="p-6 border-r border-[#262626]">Yes</td>
                <td className="p-6 border-r border-[#262626]">Yes</td>
                </tr>

                <tr>
                <td className="p-6 text-white font-medium border-r border-[#262626]">Offline Viewing</td>
                <td className="p-6 border-r border-[#262626]">No</td>
                <td className="p-6 border-r border-[#262626]">Yes, for select titles.</td>
                <td className="p-6 border-r border-[#262626]">Yes, for all titles.</td>
                </tr>

                <tr>
                <td className="p-6 text-white font-medium border-r border-[#262626]">Family sharing</td>
                <td className="p-6 border-r border-[#262626]">No</td>
                <td className="p-6 border-r border-[#262626]">Yes, up to 5 family members.</td>
                <td className="p-6 border-r border-[#262626]">Yes, up to 6 family members.</td>
                </tr>

              </tbody>
            </table>
          </div>
        </section>
        <FreeTrialBanner backdropGrid={backdropGrid}/>
      </main>
      <Footer />
    </div>
  );
}