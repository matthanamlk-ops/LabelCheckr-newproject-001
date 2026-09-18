import React, { useState, useMemo } from 'react';
import { 
  OFFICIAL_FDA_LABEL_SAMPLES, 
  OFFICIAL_FOOD_CATEGORIES, 
  OfficialFdaLabelSample,
  FoodCategoryGroup 
} from '../data/officialFdaLabelDatabase';
import { 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  FileText, 
  ArrowRight,
  ShieldCheck, 
  AlertCircle,
  Eye,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Coffee,
  Droplets,
  Utensils,
  Package,
  Flame,
  Snowflake,
  Filter,
  Check,
  Share2
} from 'lucide-react';
import { AuditReport } from '../types';
import { getOrCreateAuditForFdaNumber } from '../data/fdaDatabase';

interface Props {
  onSelectSampleForAudit: (report: AuditReport) => void;
}

// Icon mapper for categories
const getCategoryIcon = (categoryNumber: number) => {
  switch (categoryNumber) {
    case 1:
      return <Coffee className="w-4 h-4 text-blue-600" />;
    case 2:
      return <Package className="w-4 h-4 text-amber-600" />;
    case 3:
      return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
    case 4:
      return <Sparkles className="w-4 h-4 text-pink-600" />;
    case 5:
      return <Coffee className="w-4 h-4 text-amber-800" />;
    case 6:
      return <Droplets className="w-4 h-4 text-sky-600" />;
    case 7:
      return <Utensils className="w-4 h-4 text-orange-600" />;
    case 8:
      return <Flame className="w-4 h-4 text-red-600" />;
    case 9:
      return <Droplets className="w-4 h-4 text-cyan-600" />;
    case 10:
      return <Package className="w-4 h-4 text-indigo-600" />;
    case 11:
      return <Snowflake className="w-4 h-4 text-blue-400" />;
    default:
      return <FileText className="w-4 h-4 text-slate-600" />;
  }
};

export const LabelExamplesView: React.FC<Props> = ({ onSelectSampleForAudit }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalSample, setActiveModalSample] = useState<OfficialFdaLabelSample | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filtered samples
  const filteredSamples = useMemo(() => {
    return OFFICIAL_FDA_LABEL_SAMPLES.filter((sample) => {
      const matchesCategory = selectedCategory === 'all' || sample.categoryNumber === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const matchesSearch = 
        sample.itemCode.toLowerCase().includes(q) ||
        sample.itemName.toLowerCase().includes(q) ||
        sample.categoryName.toLowerCase().includes(q) ||
        sample.badge.toLowerCase().includes(q) ||
        sample.lawReference.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Active category info
  const currentCategoryInfo = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return OFFICIAL_FOOD_CATEGORIES.find((c) => c.categoryNumber === selectedCategory) || null;
  }, [selectedCategory]);

  const handleOpenModal = (sample: OfficialFdaLabelSample) => {
    setActiveModalSample(sample);
    setZoomLevel(1);
  };

  const handleAuditSample = (sample: OfficialFdaLabelSample) => {
    const report = getOrCreateAuditForFdaNumber(sample.sampleFdaNumber);
    onSelectSampleForAudit({
      ...report,
      productNameTh: sample.itemName,
      imageUrl: sample.primaryImageUrl || report.imageUrl
    });
  };

  const handleShareLink = (sample: OfficialFdaLabelSample) => {
    navigator.clipboard.writeText(sample.pdfUrl);
    setCopiedId(sample.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner with official FDA context */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0f2444] to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-blue-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 backdrop-blur-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>คลังตัวอย่างฉลากอาหารทางการ • สำนักงานคณะกรรมการอาหารและยา (อย.)</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              ตัวอย่างฉลากอาหารที่ถูกต้อง แยกตามชนิดอาหาร
            </h1>
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              รวบรวมตัวอย่างการแสดงฉลากตามพระราชบัญญัติอาหาร พ.ศ. 2522 และประกาศกระทรวงสาธารณสุขครบทั้ง 11 หมวดหมู่ 
              รวม 43 รูปแบบตัวอย่าง สามารถคลิกดูภาพร่าง (Blueprint) และองค์ประกอบภาคบังคับตามกฎหมายได้อย่างละเอียด
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
            <a
              href="https://food.fda.moph.go.th/food-law/food-label"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 border border-white/15 transition-all shadow-xs"
            >
              <span>คู่มือเกณฑ์ฉลาก อย.</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
            </a>
            <a
              href="https://food.fda.moph.go.th/food-law/nutrition-label"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>เกณฑ์ฉลาก GDA</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Quick stat counters */}
        <div className="mt-6 pt-5 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">หมวดหมู่อาหารควบคุม</span>
            <span className="text-lg font-bold text-white">11 หมวดหมู่</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">แบบฉลากมาตรฐาน อย.</span>
            <span className="text-lg font-bold text-blue-400">43 รูปแบบตัวอย่าง</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">มาตรฐานภาพประกอบ</span>
            <span className="text-lg font-bold text-emerald-400">พิมพ์เขียวคมชัดสูง (HD)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">แหล่งข้อมูลอ้างอิง</span>
            <span className="text-lg font-bold text-amber-300">food.fda.moph.go.th</span>
          </div>
        </div>
      </div>

      {/* Category Selection Tabs & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <h2 className="text-sm font-bold text-slate-800">
              เลือกดูตัวอย่างตามชนิดอาหาร ({OFFICIAL_FOOD_CATEGORIES.length} หมวดหมู่):
            </h2>
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาชื่ออาหาร, รหัส (เช่น 1.1, 5.3) หรือคำค้น..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ล้าง
              </button>
            )}
          </div>
        </div>

        {/* Scrollable category pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCategory === 'all'
                ? 'bg-[#0f2444] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
            }`}
          >
            <span>ทั้งหมด</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {OFFICIAL_FDA_LABEL_SAMPLES.length}
            </span>
          </button>

          {OFFICIAL_FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat.categoryNumber}
              onClick={() => setSelectedCategory(cat.categoryNumber)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.categoryNumber
                  ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-600/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              {getCategoryIcon(cat.categoryNumber)}
              <span>{cat.categoryNumber}. {cat.categoryName}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                selectedCategory === cat.categoryNumber ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {cat.itemCount}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Category Highlights Banner */}
      {currentCategoryInfo && (
        <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white text-[11px] font-bold">
                หมวดที่ {currentCategoryInfo.categoryNumber}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {currentCategoryInfo.categoryName}
              </h3>
              <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                {currentCategoryInfo.badge}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {currentCategoryInfo.description}
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              📜 <strong>กฎหมายอ้างอิง:</strong> {currentCategoryInfo.lawReference}
            </div>
          </div>

          <button
            onClick={() => setSelectedCategory('all')}
            className="text-xs text-blue-700 hover:text-blue-900 font-bold underline shrink-0 cursor-pointer self-start sm:self-center"
          >
            แสดงทุกหมวดหมู่
          </button>
        </div>
      )}

      {/* Result Count Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          พบตัวอย่างฉลาก <strong>{filteredSamples.length}</strong> รายการ
          {selectedCategory !== 'all' && ` ในหมวดหมู่ที่ ${selectedCategory}`}
          {searchQuery && ` ที่ตรงกับคำค้นหา "${searchQuery}"`}
        </span>
        <span className="text-[11px]">
          คลิกที่ภาพเพื่อดูรายละเอียดภาพฉลากขนาดใหญ่
        </span>
      </div>

      {/* Samples Grid */}
      {filteredSamples.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">ไม่พบตัวอย่างฉลากตามเงื่อนไขที่ค้นหา</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            กรุณาลองเปลี่ยนคำค้นหา หรือเลือกหมวดหมู่อื่นจากแถบเมนูด้านบน
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition cursor-pointer"
          >
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSamples.map((sample) => (
            <div
              key={sample.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Top header */}
                <div className="p-4 pb-3 border-b border-slate-100 flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-bold font-mono px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100">
                        ลำดับ {sample.itemCode}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 truncate max-w-[160px]">
                        หมวด {sample.categoryNumber}: {sample.categoryName}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1.5 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {sample.itemName}
                    </h3>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 shrink-0 border border-slate-200">
                    {sample.badge}
                  </span>
                </div>

                {/* Actual Official FDA Label Image Preview */}
                <div 
                  onClick={() => handleOpenModal(sample)}
                  className="relative aspect-16/10 bg-slate-900/5 overflow-hidden cursor-pointer border-b border-slate-100 group/img"
                >
                  <img
                    src={sample.primaryImageUrl}
                    alt={sample.itemName}
                    loading="lazy"
                    className="w-full h-full object-contain p-2 group-hover/img:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="px-3.5 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5 text-blue-600" />
                      <span>ดูภาพฉลากขยายเต็มจอ</span>
                    </button>
                  </div>

                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-900/70 text-white text-[10px] font-mono backdrop-blur-xs flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    <span>ภาพทางการ อย.</span>
                  </div>
                </div>

                {/* Requirements checklist preview */}
                <div className="p-4 space-y-2.5">
                  <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>องค์ประกอบฉลากสำคัญตามเกณฑ์ อย.:</span>
                  </div>

                  <div className="space-y-1.5">
                    {sample.mandatoryRequirements.slice(0, 3).map((req, rIdx) => (
                      <div key={rIdx} className="text-xs flex items-start gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <div>
                          <span className="font-semibold text-slate-800 text-[11px] block">{req.label}</span>
                          <span className="text-[10px] text-slate-500 leading-tight block">{req.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Law snippet */}
                  <div className="pt-1 text-[10px] text-slate-500 flex items-center gap-1 truncate">
                    <span>📜</span>
                    <span className="truncate">{sample.lawReference}</span>
                  </div>
                </div>
              </div>

              {/* Card Action footer */}
              <div className="p-4 pt-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <a
                    href={sample.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="เปิดไฟล์ PDF ต้นฉบับจาก อย."
                    className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors flex items-center gap-1 text-[11px] font-medium"
                  >
                    <FileText className="w-3.5 h-3.5 text-red-500" />
                    <span className="hidden sm:inline">PDF</span>
                  </a>

                  <button
                    onClick={() => handleShareLink(sample)}
                    title="คัดลอกลิงก์ไฟล์ PDF"
                    className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors"
                  >
                    {copiedId === sample.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenModal(sample)}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>ดูภาพฉลาก</span>
                  </button>

                  <button
                    onClick={() => handleAuditSample(sample)}
                    className="px-3 py-1.5 rounded-lg bg-[#0f2444] hover:bg-slate-900 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>ทดสอบตรวจ</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Interactive High-Resolution Label Viewer */}
      {activeModalSample && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveModalSample(null)}
        >
          <div 
            className="bg-white w-full max-w-5xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-700 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between gap-4 border-b border-slate-800 shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[11px] font-bold font-mono">
                    {activeModalSample.itemCode}
                  </span>
                  <span className="text-xs text-blue-300 font-medium">
                    หมวด {activeModalSample.categoryNumber}: {activeModalSample.categoryName}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] border border-slate-700">
                    {activeModalSample.badge}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {activeModalSample.itemName}
                </h2>
              </div>

              {/* Control buttons */}
              <div className="flex items-center gap-2">
                <a
                  href={activeModalSample.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/90 hover:bg-blue-600 text-white text-xs font-semibold transition"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>เปิด PDF อย.</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={activeModalSample.primaryImageUrl}
                  download={`${activeModalSample.id}.png`}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
                  title="ดาวน์โหลดภาพฉลาก (PNG)"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setActiveModalSample(null)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-red-900/50 hover:text-red-300 text-slate-300 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Image Viewport + Zoom Controls */}
            <div className="flex-1 overflow-auto bg-slate-950/95 flex flex-col relative min-h-[350px]">
              
              {/* Zoom toolbar */}
              <div className="absolute top-4 right-4 z-10 bg-slate-900/90 backdrop-blur-md rounded-xl p-1.5 border border-slate-700/80 flex items-center gap-1 shadow-lg">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition cursor-pointer"
                  title="ย่อขนาด"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-[11px] font-mono text-slate-300 px-1 min-w-[45px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 transition cursor-pointer"
                  title="ขยายขนาด"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="px-2 py-1 text-[10px] font-semibold rounded-lg hover:bg-slate-800 text-slate-300 transition cursor-pointer border-l border-slate-700 ml-1"
                >
                  รีเซ็ต
                </button>
              </div>

              {/* Notice pill */}
              <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur-xs rounded-lg px-2.5 py-1 text-[11px] text-slate-300 border border-slate-700">
                🔍 ภาพร่างตัวอย่างการแสดงฉลากอาหารจากเอกสาร อย.
              </div>

              {/* Image Viewport */}
              <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
                <img
                  src={activeModalSample.primaryImageUrl}
                  alt={activeModalSample.itemName}
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
                  className="max-h-[60vh] object-contain transition-transform duration-150 drop-shadow-2xl rounded-sm"
                />
              </div>
            </div>

            {/* Modal Footer: Detailed Law & Action */}
            <div className="p-5 bg-white border-t border-slate-200 shrink-0 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>เกณฑ์ทางกฎหมายและข้อบังคับเฉพาะ:</span>
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {activeModalSample.description}
                  </p>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    📜 {activeModalSample.lawReference}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>จุดตรวจสอบสำคัญบนฉลากนี้:</span>
                  </h4>
                  <ul className="text-slate-600 space-y-1">
                    {activeModalSample.mandatoryRequirements.slice(0, 2).map((req, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span><strong>{req.label}:</strong> {req.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <a
                  href={activeModalSample.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>ดูไฟล์เอกสารต้นฉบับ PDF ทางการจากระบบ อย. (food.fda.moph.go.th)</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalSample(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                  >
                    ปิดหน้าต่าง
                  </button>

                  <button
                    onClick={() => {
                      handleAuditSample(activeModalSample);
                      setActiveModalSample(null);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#0f2444] hover:bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
                  >
                    <span>นำตัวอย่างภาพนี้ไปตรวจในระบบ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FDA Classification Reference Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-1">
          สรุปการจัดหมวดหมู่อาหารควบคุมและการแสดงฉลากตามกฎหมาย อย.
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          อาหารทั้ง 11 หมวดหมู่ได้รับการควบคุมตามพระราชบัญญัติอาหาร พ.ศ. 2522 และประกาศกระทรวงสาธารณสุขฉบับที่เกี่ยวข้อง
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {OFFICIAL_FOOD_CATEGORIES.map((cat) => (
            <div 
              key={cat.categoryNumber}
              onClick={() => setSelectedCategory(cat.categoryNumber)}
              className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-blue-50/50 hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                  หมวดที่ {cat.categoryNumber}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {cat.itemCount} รูปแบบ
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {cat.categoryName}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-2 text-[10px] text-blue-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <span>ดูตัวอย่างในหมวดนี้</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
