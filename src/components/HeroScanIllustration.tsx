import React from 'react';
import { Check, ShieldCheck, ChevronRight, Sparkles } from 'lucide-react';

interface Props {
  onInspectSample?: (fdaNumber: string) => void;
}

export const HeroScanIllustration: React.FC<Props> = ({ onInspectSample }) => {
  const verifiedItems = [
    'ชื่ออาหาร / ชื่อตรา',
    'ส่วนประกอบที่สำคัญ',
    'เลขสารบบอาหาร',
    'วัตถุเจือปนอาหาร',
    'ปริมาตรสุทธิ',
    'ชื่อ/ที่ตั้งสถานที่ผลิต',
    'หมดอายุ',
    'และข้อมูลอื่น ๆ ตามกฎหมาย'
  ];

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInspectSample) {
      onInspectSample('12-3-04567-1-0001');
    }
  };

  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none">
      {/* Background Soft Lighting & Decorative Leaves / Juice Bottle Glow */}
      <div className="absolute -top-10 -right-8 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-6 w-60 h-60 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />

      {/* Main Composition Container */}
      <div className="relative flex items-center justify-center lg:justify-end">
        
        {/* ============================================================ */}
        {/* Background Mango Juice Bottle with Green Leaves (from Image 1) */}
        {/* ============================================================ */}
        <div className="absolute right-12 sm:right-24 -top-8 bottom-0 w-44 sm:w-56 pointer-events-none z-0 opacity-90 sm:opacity-100 transform translate-x-4">
          {/* Fresh Green Tea / Mango Leaves in background */}
          <div className="absolute -top-6 right-2 w-32 h-32 opacity-90 rotate-12">
            <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
              <path
                d="M30,90 Q40,30 90,20 Q100,60 50,95 Z"
                fill="#4ade80"
                opacity="0.85"
              />
              <path
                d="M40,35 Q70,55 90,20"
                stroke="#16a34a"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M10,80 Q20,30 65,30 Q60,70 20,85 Z"
                fill="#22c55e"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Realistic Mango Juice Bottle */}
          <div className="relative w-36 sm:w-44 mx-auto mt-4 rounded-t-[2.5rem] rounded-b-[2rem] bg-gradient-to-b from-amber-400 via-yellow-400 to-amber-500 shadow-2xl border-2 border-amber-200/40 overflow-hidden">
            {/* Green Screw Cap with Ribbed Texture */}
            <div className="w-18 h-9 mx-auto bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 rounded-t-lg shadow-md border-b border-emerald-800 flex items-center justify-around px-1">
              <div className="w-0.5 h-6 bg-emerald-400/40 rounded-full" />
              <div className="w-0.5 h-6 bg-emerald-400/40 rounded-full" />
              <div className="w-0.5 h-6 bg-emerald-400/40 rounded-full" />
              <div className="w-0.5 h-6 bg-emerald-400/40 rounded-full" />
              <div className="w-0.5 h-6 bg-emerald-400/40 rounded-full" />
            </div>

            {/* Bottle Neck Rim */}
            <div className="w-22 h-4 mx-auto bg-amber-400/80 border-b border-amber-500/50" />

            {/* Juice Fluid & Bottle Label */}
            <div className="relative h-72 sm:h-80 bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 p-2 flex flex-col justify-center">
              {/* Glossy highlight streak */}
              <div className="absolute top-0 bottom-0 left-3 w-3 bg-gradient-to-r from-white/40 to-transparent rounded-full pointer-events-none" />
              
              {/* Authentic Bottle Label - "น้ำมะม่วง เข้มข้น กลิ่นกุหลาบ" */}
              <div className="mx-1 my-auto bg-white/95 rounded-2xl p-2.5 shadow-lg border border-amber-100 text-center">
                <div className="inline-block px-1.5 py-0.5 rounded bg-amber-500/15 text-[9px] font-bold text-amber-800 mb-0.5">
                  เครื่องดื่มแท้ 100%
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                  น้ำมะม่วง
                </h4>
                <p className="text-[10px] font-bold text-amber-900">
                  เข้มข้น กลิ่นกุหลาบ
                </p>
                {/* Mango Slice & Rose Floral Icon Graphic */}
                <div className="my-1.5 flex items-center justify-center gap-1.5">
                  <span className="text-lg">🥭</span>
                  <span className="text-xs">🌹</span>
                </div>
                <div className="text-[8px] text-slate-400">
                  ปริมาตรสุทธิ 250 มล.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Left / Foreground: Modern Smartphone with AR Food Label Scan */}
        {/* ============================================================ */}
        <div className="relative z-10 w-[240px] sm:w-[265px] shrink-0 transition-transform duration-300 hover:scale-[1.01]">
          {/* Phone Frame - Dark Titanium Bezel */}
          <div className="relative rounded-[2.8rem] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 p-2 sm:p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-2 border-slate-700/80 ring-1 ring-white/15">
            
            {/* Glossy phone edge reflection */}
            <div className="absolute -left-0.5 top-12 bottom-12 w-1 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent rounded-l pointer-events-none" />
            <div className="absolute -right-0.5 top-20 bottom-20 w-1 bg-gradient-to-b from-transparent via-blue-400/40 to-transparent rounded-r pointer-events-none" />

            {/* Phone Screen Glass */}
            <div className="relative rounded-[2.3rem] overflow-hidden bg-gradient-to-b from-amber-200 via-yellow-100 to-amber-300 aspect-[9/18.5] flex flex-col justify-between border border-slate-900/50 shadow-inner">
              
              {/* Dynamic Island / Top Camera Speaker Pill */}
              <div className="absolute top-2.5 inset-x-0 z-30 flex justify-center pointer-events-none">
                <div className="w-20 h-4.5 bg-slate-950 rounded-full flex items-center justify-between px-2 shadow-md">
                  <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900/80" />
                </div>
              </div>

              {/* Viewfinder Background: Golden Mango Juice & Label */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-amber-300/90 via-yellow-200/95 to-amber-400/90 opacity-95">
                {/* Mango background graphic silhouette */}
                <div className="absolute top-10 right-2 w-28 h-28 bg-amber-500/20 rounded-full blur-xl" />
                <div className="absolute bottom-20 left-2 w-24 h-24 bg-yellow-400/25 rounded-full blur-lg" />
              </div>

              {/* ============================================================ */}
              {/* AR Scanning Reticle with Food Label (Matching Image 1) */}
              {/* ============================================================ */}
              <div className="relative z-10 mt-9 mx-2.5 p-2 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-white text-[9.5px] leading-tight text-slate-800 font-sans">
                
                {/* Neon Green AR Target Corners */}
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-[2.5px] border-l-[2.5px] border-emerald-500 rounded-tl-sm pointer-events-none shadow-[0_0_8px_#10b981]" />
                <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-emerald-500 rounded-tr-sm pointer-events-none shadow-[0_0_8px_#10b981]" />
                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-[2.5px] border-l-[2.5px] border-emerald-500 rounded-bl-sm pointer-events-none shadow-[0_0_8px_#10b981]" />
                <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-[2.5px] border-r-[2.5px] border-emerald-500 rounded-br-sm pointer-events-none shadow-[0_0_8px_#10b981]" />

                {/* Animated Green Laser Sweep Line */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_10px_#10b981] animate-pulse top-1/3 pointer-events-none" />

                {/* Scanned Label Header: ส่วนประกอบที่สำคัญ */}
                <div className="bg-slate-900 text-white px-2 py-0.5 rounded text-[9px] font-bold text-center mb-1.5 flex items-center justify-between">
                  <span>ส่วนประกอบที่สำคัญ</span>
                  <span className="text-[7.5px] text-emerald-400 font-mono">OCR LIVE</span>
                </div>

                {/* Ingredients Table */}
                <div className="space-y-0.5 text-[8.5px] text-slate-700 font-medium px-0.5">
                  <div className="flex justify-between">
                    <span>น้ำตาลทราย</span>
                    <span className="font-bold text-slate-900">50 %</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>วัตถุดิบ บี</span>
                    <span>xx %</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>วัตถุดิบ ซี</span>
                    <span>xx %</span>
                  </div>
                  <div className="flex justify-between font-semibold text-amber-900">
                    <span>น้ำมะม่วงเข้มข้น</span>
                    <span className="font-bold text-emerald-700">9.3 %</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>วัตถุดิบ อี</span>
                    <span>xx %</span>
                  </div>
                  <div className="text-[7.5px] text-slate-500 pt-0.5">
                    แต่งกลิ่นสังเคราะห์, วัตถุเจือปนอาหาร (INS296, INS202)
                  </div>
                </div>

                <div className="my-1 border-t border-slate-200" />

                {/* Manufacturer Information */}
                <div className="text-[8px] text-slate-700 leading-tight">
                  <div className="font-bold text-slate-900">ผลิตโดย บริษัทเข้มข้นจัง จำกัด</div>
                  <div className="text-slate-500 truncate">บ้านเลขที่ 1 ต.ตลาดขวัญ อ.เมือง จ.นนทบุรี</div>
                </div>

                {/* Net Content */}
                <div className="mt-1 flex items-center justify-between text-[8.5px]">
                  <span className="font-bold text-slate-900">ปริมาตรสุทธิ</span>
                  <span className="font-bold text-blue-900">250 มิลลิลิตร</span>
                </div>

                {/* Barcode Graphic */}
                <div className="mt-1.5 flex items-center justify-center">
                  <div className="text-center">
                    {/* Barcode Bars */}
                    <div className="h-4 flex items-end justify-center gap-[1.5px] px-1 bg-white">
                      <div className="w-[1.5px] h-full bg-slate-900" />
                      <div className="w-[1px] h-full bg-slate-900" />
                      <div className="w-[2px] h-3 bg-slate-900" />
                      <div className="w-[1px] h-full bg-slate-900" />
                      <div className="w-[2.5px] h-full bg-slate-900" />
                      <div className="w-[1px] h-2.5 bg-slate-900" />
                      <div className="w-[2px] h-full bg-slate-900" />
                      <div className="w-[1.5px] h-full bg-slate-900" />
                      <div className="w-[1px] h-3.5 bg-slate-900" />
                      <div className="w-[2px] h-full bg-slate-900" />
                    </div>
                    <div className="text-[7px] font-mono tracking-wider text-slate-600">
                      8 859999 999999
                    </div>
                  </div>
                </div>

                {/* Official FDA Registration Frame (เลขสารบบอาหาร) */}
                <div className="mt-1 p-0.5 rounded border border-slate-400/80 bg-slate-50 flex items-center justify-center gap-1">
                  <div className="w-2.5 h-2.5 rounded-full border border-slate-600 flex items-center justify-center text-[6px] font-bold">
                    อย
                  </div>
                  <div className="text-[7.5px] font-mono font-bold text-slate-800">
                    เลขสารบบอาหาร 12-3-04567-1-0001
                  </div>
                </div>

                {/* Expiry Date */}
                <div className="mt-1 text-center text-[7.5px] font-bold text-rose-700 bg-rose-50/80 py-0.5 rounded">
                  หมดอายุ 31/12/2026
                </div>

              </div>

              {/* ============================================================ */}
              {/* Bottom Inspection Result Card - "ผ่านเกณฑ์" (Matching Image 1) */}
              {/* ============================================================ */}
              <div className="relative z-20 m-2 mt-auto p-2 sm:p-2.5 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-white/80 text-center">
                <div className="flex items-center gap-2 text-left">
                  {/* Glowing Green Verified Check Badge */}
                  <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 shrink-0">
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span className="absolute inset-0 rounded-full animate-ping bg-emerald-400/30 pointer-events-none" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-[9.5px] font-medium text-slate-600 leading-none">
                      ผลการตรวจสอบ
                    </div>
                    <div className="text-sm font-extrabold text-emerald-600 tracking-tight leading-tight mt-0.5">
                      ผ่านเกณฑ์
                    </div>
                    <div className="text-[8px] text-slate-500 leading-tight truncate">
                      ข้อมูลฉลากถูกต้องตามกฎหมาย
                    </div>
                  </div>
                </div>

                {/* Action Button: "ดูรายละเอียดเพิ่มเติม >" */}
                <button
                  onClick={handleDetailsClick}
                  className="mt-2 w-full py-1.5 px-3 rounded-full border border-blue-400/80 bg-blue-50/70 hover:bg-blue-100/90 text-blue-700 font-bold text-[9.5px] flex items-center justify-center gap-1 transition-all cursor-pointer group shadow-xs active:scale-[0.98]"
                >
                  <span>ดูรายละเอียดเพิ่มเติม</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform text-blue-600" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* Right Floating Card: "ตรวจสอบครบทุกข้อมูลสำคัญ" (From Image 1) */}
        {/* ============================================================ */}
        <div className="relative z-20 -ml-4 sm:-ml-6 my-auto w-[185px] sm:w-[220px] rounded-2xl bg-white/95 backdrop-blur-xl p-3.5 sm:p-4 shadow-2xl border border-white/80 text-slate-800 transition-all duration-300 hover:shadow-cyan-500/10">
          
          {/* Header */}
          <div className="pb-2.5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-extrabold text-blue-950 tracking-tight">
              ตรวจสอบครบทุกข้อมูลสำคัญ
            </h3>
            <Sparkles className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
          </div>

          {/* 8 Mandatory Checklist Items with Green Check Circles */}
          <ul className="mt-2.5 space-y-1.5 sm:space-y-2 text-[10.5px] sm:text-xs font-semibold text-slate-700">
            {verifiedItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2 group">
                <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0 group-hover:scale-110 transition-transform">
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[3]" />
                </div>
                <span className="group-hover:text-blue-900 transition-colors truncate">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Bottom Floating Soft Blue Shield Badge (from Image 1 bottom right) */}
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="text-[9px] text-slate-600 font-medium">
              มาตรฐาน อย. 11 หมวด
            </div>
            
            <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-500 shadow-inner">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
