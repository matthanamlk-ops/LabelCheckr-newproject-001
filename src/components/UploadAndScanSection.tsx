import React, { useState, useRef } from 'react';
import { 
  Camera, 
  UploadCloud, 
  BookOpen, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  FileCheck,
  FileText,
  AlertCircle,
  Scan,
  ScanLine,
  Zap,
  Check,
  Activity,
  Layers,
  Award,
  Eye
} from 'lucide-react';
import { UserProfile, AuditReport } from '../types';
import { getOrCreateAuditForFdaNumber, DEFAULT_CORN_SNACK_AUDIT } from '../data/fdaDatabase';
import { saveAuditToFirestore } from '../lib/firebase';
import { HeroScanIllustration } from './HeroScanIllustration';

interface Props {
  user: UserProfile | null;
  onOpenCamera: () => void;
  onAuditComplete: (report: AuditReport) => void;
  onNavigateToExamples: () => void;
}

export const UploadAndScanSection: React.FC<Props> = ({
  user,
  onOpenCamera,
  onAuditComplete,
  onNavigateToExamples
}) => {
  const [manualFdaInput, setManualFdaInput] = useState('13-1-02964-6-0089');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quick preset food labels from official Thai FDA database
  const SAMPLE_PRODUCTS = [
    {
      fda: '13-1-02964-6-0089',
      title: 'ขนมอบกรอบและสแน็ค (ลำดับ 10.8)',
      badge: 'GDA หวาน มัน เค็ม (ฉบับ 394)',
      category: 'ขนมอบกรอบ',
      image: '/fda-labels/10.8-snack-ready-to-eat_1.png'
    },
    {
      fda: '10-1-04741-1-0023',
      title: 'เครื่องดื่ม ชนิดเข้มข้น (ลำดับ 1.1)',
      badge: 'เครื่องดื่มปิดสนิท (ฉบับ 356)',
      category: 'เครื่องดื่ม',
      image: '/fda-labels/1.1-beverage_1.png'
    },
    {
      fda: '14-2-00142-1-0035',
      title: 'อาหารกึ่งสำเร็จรูป ก๋วยเตี๋ยว (ลำดับ 7.1)',
      badge: 'ตรวจสัดส่วนโซเดียม (ฉบับ 212)',
      category: 'อาหารกึ่งสำเร็จรูป',
      image: '/fda-labels/7.1-instant-noodle_1.png'
    },
    {
      fda: '10-1-01949-1-0198',
      title: 'ผลิตภัณฑ์เสริมอาหาร (ลำดับ 3.1)',
      badge: 'กรอบเตือนสีแดง (ฉบับ 293)',
      category: 'เสริมอาหาร',
      image: '/fda-labels/3.1-supplement_1.png'
    }
  ];

  // Perform full audit
  const runAuditWithFda = async (fdaNum: string, customImage?: string) => {
    setIsAnalyzing(true);
    // Simulate AI vision + FDA API cross-check
    await new Promise((resolve) => setTimeout(resolve, 900));

    let report = getOrCreateAuditForFdaNumber(fdaNum);
    if (customImage) {
      report = {
        ...report,
        imageUrl: customImage
      };
    }

    // Save report to Firebase and local storage
    await saveAuditToFirestore(report, user);

    setIsAnalyzing(false);
    onAuditComplete(report);
  };

  // Handle file drop or selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      processSelectedFile(files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      // Default to the corn snack FDA number or extract
      runAuditWithFda(manualFdaInput || '13-1-02964-6-0089', dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a192f] via-[#0f284e] to-[#151c38] text-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-blue-700/40">
        
        {/* Background ambient lighting effects */}
        <div className="absolute -right-16 -top-16 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-20 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 top-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Heading, description, and 3 modern action buttons (6 cols) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/25 via-cyan-500/20 to-indigo-500/25 border border-cyan-400/40 text-xs font-semibold text-cyan-200 backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
              <span className="tracking-wide">ระบบปัญญาประดิษฐ์ตรวจสอบฉลากอาหาร • ตาม พ.ร.บ. อาหาร พ.ศ. 2522</span>
            </div>

            {/* Main Headline - Exactly 2 lines */}
            <h1 className="text-xl sm:text-2xl md:text-[1.75rem] lg:text-[1.85rem] xl:text-[2.1rem] font-extrabold tracking-tight text-white leading-tight lg:leading-[1.25]">
              <span className="block">ตรวจสอบความถูกต้องของฉลากอาหาร</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-200 to-indigo-100 mt-1 sm:mt-1.5">
                เทียบกับฐานข้อมูล อย. ทันที
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm text-blue-100/85 max-w-xl leading-relaxed font-normal">
              ถ่ายภาพหรืออัปโหลดภาพฉลากอาหาร เพื่อดึงเลข อย. 13 หลัก ตรวจสอบชื่อสถานที่ผลิต
              ลำดับส่วนประกอบ วันหมดอายุ คำเตือนสารก่อภูมิแพ้ และตารางโภชนาการแบบ GDA
              ตามเกณฑ์มาตรฐานประกาศกระทรวงสาธารณสุข
            </p>

            {/* 3 Core Action Buttons with distinctive, interactive styling */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              
              {/* 1. ปุ่มกด "ถ่ายภาพฉลากอาหาร" - Primary Vibrant AI Camera */}
              <button
                onClick={onOpenCamera}
                className="group relative overflow-hidden px-4.5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:via-indigo-500 hover:to-cyan-400 text-white font-bold text-sm flex items-center gap-3 shadow-lg shadow-blue-600/35 hover:shadow-cyan-500/40 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer border border-cyan-300/40"
              >
                {/* Glossy light sweep reflection on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-white/30 transition-all shadow-inner shrink-0">
                  <Camera className="w-5 h-5 text-cyan-200 group-hover:text-white transition-colors" />
                </div>
                
                <div className="text-left pr-1">
                  <div className="text-[10px] font-bold text-cyan-200 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                    กล้องสแกนสด AI
                  </div>
                  <span className="text-sm font-bold text-white block">
                    ถ่ายภาพฉลากอาหาร
                  </span>
                </div>
              </button>

              {/* 2. ปุ่มกด "อัปโหลดไฟล์ฉลาก / อาร์ตเวิร์ก" - Frosted Glass Cyan Glow */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="group relative overflow-hidden px-4.5 py-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 hover:border-cyan-400/70 text-white font-bold text-sm flex items-center gap-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-md shadow-slate-950/40 hover:shadow-cyan-500/20 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 group-hover:scale-105 group-hover:bg-cyan-500/25 transition-all shrink-0">
                  <UploadCloud className="w-5 h-5 text-cyan-300" />
                </div>
                
                <div className="text-left pr-1">
                  <div className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
                    รองรับ PDF / JPG / PNG
                  </div>
                  <span className="text-sm font-bold text-white block">
                    อัปโหลดไฟล์ฉลาก / อาร์ตเวิร์ก
                  </span>
                </div>
              </button>

              {/* 3. ปุ่มกด "ดูตัวอย่างฉลากแยกตามชนิดอาหาร" - Warm Sunset Amber Gold */}
              <button
                onClick={onNavigateToExamples}
                className="group relative overflow-hidden px-4.5 py-3 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-amber-600/20 hover:from-amber-500/25 hover:via-orange-500/25 hover:to-amber-600/35 border border-amber-400/40 hover:border-amber-300/80 text-amber-100 font-semibold text-sm flex items-center gap-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-md shadow-amber-950/20 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-105 group-hover:bg-amber-500/30 transition-all shrink-0">
                  <BookOpen className="w-5 h-5 text-amber-300" />
                </div>
                
                <div className="text-left pr-1">
                  <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="px-1.5 py-0.2 rounded bg-amber-400/30 text-amber-200 text-[9px] font-bold">11 หมวด</span>
                    43 แบบมาตรฐาน อย.
                  </div>
                  <span className="text-sm font-bold text-amber-100 block">
                    ดูตัวอย่างฉลากแยกตามชนิดอาหาร
                  </span>
                </div>
                
                <ArrowRight className="w-4 h-4 text-amber-300/80 group-hover:text-amber-200 group-hover:translate-x-1 transition-all ml-0.5 shrink-0" />
              </button>

            </div>

            {/* Quick stats micro pills */}
            <div className="pt-2 flex items-center gap-4 text-[11px] text-blue-200/70 flex-wrap">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>ตรวจสอบเลข อย. 13 หลักแบบเรียลไทม์</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>ตรวจฉลาก GDA หวาน มัน เค็ม</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                <span>ตรวจสารก่อภูมิแพ้และคำเตือนบังคับ</span>
              </span>
            </div>
          </div>

          {/* Right Column: High-Impact Phone & Mango Juice Label Scan Illustration (Replacing Image 2 with Image 1) */}
          <div className="lg:col-span-6 relative flex items-center justify-center pt-4 lg:pt-0">
            <HeroScanIllustration
              onInspectSample={(sampleFda) => {
                const sampleAudit = getOrCreateAuditForFdaNumber(sampleFda);
                onAuditComplete(sampleAudit);
              }}
            />
          </div>

        </div>

      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Upload Zone & Manual 13-digit FDA Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Drag & Drop Area (7 Cols) */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`lg:col-span-7 rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[260px] ${
            dragActive
              ? 'border-blue-500 bg-blue-50/80 scale-[1.01]'
              : 'border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50/70 shadow-xs'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
            <UploadCloud className="w-7 h-7" />
          </div>

          <h3 className="text-base font-bold text-slate-900">
            ลากและวางไฟล์ภาพฉลากอาหารที่นี่ หรือคลิกเพื่อเลือกไฟล์
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md">
            รองรับไฟล์ภาพ JPG, PNG, WEBP และ PDF อาร์ตเวิร์กบรรจุภัณฑ์ ระบบจะสแกนหาเลขสารบบและตรวจโภชนาการอัตโนมัติ
          </p>

          <div className="mt-5 flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              เช็คชื่ออาหารและโรงงาน
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ตรวจสอบ GDA หวานมันเค็ม
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              สารก่อภูมิแพ้
            </span>
          </div>
        </div>

        {/* Right: Direct 13-Digit FDA Search Box (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-blue-600" />
                <span>ตรวจสอบด้วยเลขสารบบอาหาร 13 หลัก</span>
              </h3>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                FDA porta lookup
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              พิมพ์หรือวางเลข อย. 13 หลัก เพื่อดึงข้อมูลเทียบกับฐานข้อมูลอิเล็กทรอนิกส์ อย. (porta.fda.moph.go.th)
            </p>

            {/* Input field */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                เลขสารบบอาหาร (FDA Serial Number):
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={manualFdaInput}
                  onChange={(e) => setManualFdaInput(e.target.value)}
                  placeholder="เช่น 13-1-02964-6-0089"
                  className="w-full text-sm font-mono font-bold px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <button
              onClick={() => runAuditWithFda(manualFdaInput)}
              disabled={isAnalyzing}
              className="w-full py-3 px-4 rounded-xl bg-[#0f2444] hover:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>กำลังดึงข้อมูลและประมวลผลการประเมิน...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                  <span>เริ่มตรวจสอบและเปรียบเทียบมาตรฐาน อย.</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Quick Testing Samples (One-Click Audit) */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>ตัวอย่างฉลากผลิตภัณฑ์ทดสอบความแม่นยำ (คลิกเพื่อทดสอบผลตรวจทันที)</span>
          </h2>
          <span className="text-xs text-blue-600 font-medium hidden sm:inline">
            4 หมวดหมู่อาหารยอดนิยม
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {SAMPLE_PRODUCTS.map((prod) => (
            <div
              key={prod.fda}
              onClick={() => {
                setManualFdaInput(prod.fda);
                runAuditWithFda(prod.fda, prod.image);
              }}
              className="bg-white rounded-2xl border border-slate-200 p-3.5 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold bg-slate-900/80 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                    {prod.category}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {prod.title}
                </h4>

                <div className="text-[11px] font-mono text-slate-500 mt-1">
                  เลข อย. {prod.fda}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  {prod.badge}
                </span>
                <span className="text-[11px] text-blue-600 font-semibold group-hover:underline flex items-center gap-0.5">
                  ตรวจ <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
