
import React, { useState } from 'react';
import { SCENARIOS } from './constants';
import Header_ar from './components/Header_ar';
import { Section } from './components/DashboardComponents';
import { FadeInUp } from './components/AnimatedWrappers';
import { motion, AnimatePresence } from 'framer-motion';
import { BanknotesIcon, PlayCircleIcon } from './components/Icons';

const formatCurrency = (value: number) => {
    return `${Math.round(value).toLocaleString('ar-SA')} ريال`;
};

type CaseType = 'worst' | 'base' | 'best';

// --- Apple-Style Segmented Control (Unified White Pill Design RTL) ---
const SegmentedControl: React.FC<{
    name: string; // Unique ID for Framer Motion to track this specific pill
    options: { value: string | number; label: string }[];
    selected: string | number;
    onChange: (value: any) => void;
    dark?: boolean;
}> = ({ name, options, selected, onChange, dark = false }) => {
    
    // DESIGN RULE: Selected item is ALWAYS White Pill with Black Text.
    
    // Container Background:
    // Dark Mode: Translucent White (bg-white/10) to sit on black.
    // Light Mode: Light Gray (bg-[#E5E5EA]) to sit on white, providing contrast for the white pill.
    const containerClass = dark ? 'bg-white/10' : 'bg-[#E5E5EA]';
    
    // Active Pill: Always White
    const activePillClass = 'bg-white shadow-sm ring-1 ring-black/5';
    
    // Text Colors
    const activeTextClass = 'text-black'; // Always black text on the white pill
    const inactiveTextClass = dark ? 'text-white/60 hover:text-white' : 'text-[#8E8E93] hover:text-black';

    return (
        <div className={`p-1 sm:p-1.5 rounded-full flex relative flex-row-reverse w-full sm:w-auto overflow-hidden ${containerClass}`}>
            {options.map((option) => {
                const isActive = selected === option.value;
                return (
                    <button
                        key={option.value}
                        onClick={() => onChange(option.value)}
                        className={`relative z-10 flex-1 px-3 sm:px-6 py-2.5 sm:py-2 text-[13px] sm:text-sm font-bold transition-colors duration-200 rounded-full font-cairo whitespace-nowrap ${
                            isActive ? activeTextClass : inactiveTextClass
                        }`}
                        style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                        {isActive && (
                            <motion.div
                                layoutId={`pill-ar-${name}`}
                                className={`absolute inset-0 rounded-full ${activePillClass}`}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10">{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

const DigitalLedger: React.FC<{ 
    revenue: number; 
    items: { category: string; amount: number; color?: string; highlight?: boolean }[] 
}> = ({ revenue, items }) => {
    return (
        <div className="w-full space-y-6">
            <div className="flex justify-between items-end border-b border-white/10 pb-4 flex-row-reverse">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-0.5 block">إجمالي التدفقات</span>
                    <span className="text-xl sm:text-2xl font-bold text-white tracking-tight tabular-nums">{formatCurrency(revenue)}</span>
                </div>
                <div className="text-left">
                    <span className="text-[10px] font-medium text-white/40 bg-white/5 px-1.5 py-0.5 rounded">الإيرادات الإجمالية</span>
                </div>
            </div>
            <div className="space-y-4">
                {items.map((item, idx) => {
                    const percent = revenue > 0 ? Math.round((item.amount / revenue) * 100) : 0;
                    
                    if (item.highlight) {
                         return (
                            <motion.div 
                                key={idx}
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-500/20 to-emerald-900/10 border border-emerald-500/30 p-5 sm:p-6 shadow-[0_8px_32px_rgba(16,185,129,0.15)] text-right"
                            >
                                <div className="absolute top-0 left-0 p-4 opacity-20">
                                    <div className="w-16 h-16 bg-emerald-400 rounded-full blur-2xl"></div>
                                </div>
                                
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-2 flex-row-reverse">
                                        <div className="flex items-center gap-2 flex-row-reverse">
                                             <div className={`w-2 h-2 rounded-full ${item.color || 'bg-white'} shadow-[0_0_8px_currentColor] text-emerald-400`}></div>
                                             <span className="text-xs font-bold text-emerald-100 uppercase tracking-widest">{item.category}</span>
                                        </div>
                                        <span className="text-xs font-medium text-emerald-400/80 bg-emerald-400/10 px-2 py-0.5 rounded-full">{percent}٪</span>
                                    </div>
                                    
                                    <div className="flex items-baseline justify-end gap-2 mt-1">
                                        <span className="text-3xl sm:text-4xl font-black text-white tracking-tighter tabular-nums text-shadow-sm">{formatCurrency(item.amount)}</span>
                                    </div>

                                    {/* Progress Bar specific to highlight */}
                                    <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden mt-4 dir-rtl">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percent}%` }}
                                            transition={{ duration: 1.2, ease: "circOut" }}
                                            className={`h-full rounded-full ${item.color || 'bg-white'} shadow-[0_0_10px_currentColor]`}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    }

                    return (
                        <div key={idx} className="group px-1 opacity-80 hover:opacity-100 transition-opacity">
                            <div className="flex justify-between items-center mb-1.5 flex-row-reverse">
                                <div className="flex items-center gap-2 flex-row-reverse">
                                    <div className={`w-2 h-2 rounded-full ring-1 ring-white/10 ${item.color || 'bg-white'}`}></div>
                                    <span className="text-xs font-medium text-white/90 tracking-wide">{item.category}</span>
                                </div>
                                <div className="text-left">
                                    <span className="block text-sm font-bold text-white tabular-nums">{formatCurrency(item.amount)}</span>
                                </div>
                            </div>
                            <div className="w-full h-1.5 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm dir-rtl">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ duration: 1.2, ease: "circOut" }}
                                    className={`h-full rounded-full ${item.color || 'bg-white'} shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

const App_ar: React.FC<{ onToggleLanguage: () => void }> = ({ onToggleLanguage }) => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>(SCENARIOS[0].id);
  const [activeCase, setActiveCase] = useState<CaseType>('base');
  const [occupancyRate, setOccupancyRate] = useState<number>(1); // 1 = 100%
  const [mabaatPercentage, setMabaatPercentage] = useState<number>(0.30); // Default 30%

  const activeScenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0];
  const baseFinancials = activeScenario.financials[activeCase];

  // Dynamic Calculations - Rounded to nearest integer
  // Override occupancy for Hybrid to always be 1 (100% of the modeled scenario), as it has fixed mixed occupancy.
  const effectiveOccupancy = activeScenarioId === 'hybrid' ? 1 : occupancyRate;
  const effectiveRevenue = Math.round(baseFinancials.revenue * effectiveOccupancy);
  
  // STR Specifics: OTA Fee (15.5%)
  const isSTR = activeScenarioId === 'short_term';
  
  // Determine share of revenue subject to OTA fees
  // STR = 100%, Hybrid = 0% (as per CSV), LTR = 0%
  const revenueShareSubjectToOta = isSTR ? 1.0 : 0;
  const otaFeePercentage = 0.155;
  
  // 1. Calculate OTA Fee based on Revenue Share
  const effectiveOtaFee = Math.round(effectiveRevenue * revenueShareSubjectToOta * otaFeePercentage);

  // 2. Mabaat Share is calculated on the NET REVENUE (Gross - OTA)
  const netRevenueAfterOta = effectiveRevenue - effectiveOtaFee;
  const effectiveMabaat = Math.round(netRevenueAfterOta * mabaatPercentage);
  
  // 3. Owner Net Income
  const effectiveNetIncome = netRevenueAfterOta - effectiveMabaat;
  
  const translateScenarioName = (id: string) => {
      switch(id) {
          case 'hybrid': return 'هجين ذكي';
          case 'short_term': return 'تأجير يومي';
          case 'long_term': return 'تأجير سنوي';
          default: return id;
      }
  };

  const translateScenarioDesc = (id: string) => {
    switch(id) {
        case 'hybrid': return 'تشغيل الوحدات بنظام التأجير اليومي خلال موسم الذروة (ديسمبر - مارس) والتأجير السنوي لباقي السنة.';
        case 'short_term': return 'تعظيم العائد من خلال التأجير اليومي (عبر منصات مثل Airbnb) على مدار السنة، مستفيدين من معدل الدوران العالي.';
        case 'long_term': return 'تأجير الشقق الـ ٩ كوحدات سكنية قياسية مفروشة بعقود شهرية.';
        default: return '';
    }
  };
  
  const translateUnitLabel = (id: string) => id === 'long_term' ? 'شقة' : 'وحدة';
  const translateDuration = (label: string) => {
      if (label === '12 Months LTR (Adj.)') return 'تأجير سنوي ١٢ شهر'; // Removed "Adj." for dynamic view
      if (label === 'Daily Rentals') return 'تأجير يومي';
      if (label === 'STR (60%) + LTR (80%)') return 'يومي (٦٠٪) + سنوي (٨٠٪)';
      return 'يومي + سنوي';
  };

  const isMarketPriceScenario = activeScenarioId === 'short_term' || activeScenarioId === 'long_term';

  const caseOptions = isMarketPriceScenario ? [
      { value: 'worst', label: 'أقل سعر' },
      { value: 'base', label: 'متوسط السعر' },
      { value: 'best', label: 'أعلى سعر' },
  ] : [
      { value: 'worst', label: 'متحفظ' },
      { value: 'base', label: 'واقعي' },
      { value: 'best', label: 'متفائل' },
  ];

  const allOccupancyOptions = [
      { value: 0.4, label: '٤٠٪' },
      { value: 0.5, label: '٥٠٪' },
      { value: 0.6, label: '٦٠٪' },
      { value: 0.7, label: '٧٠٪' },
      { value: 0.8, label: '٨٠٪' },
      { value: 0.9, label: '٩٠٪' },
      { value: 1.0, label: '١٠٠٪' },
  ];

  // Restrict occupancy for LTR to start from 60%
  const occupancyOptions = activeScenarioId === 'long_term'
      ? allOccupancyOptions.filter(o => o.value >= 0.6)
      : allOccupancyOptions;

  const handleVideoClick = (e: React.MouseEvent, url?: string) => {
      e.preventDefault();
      if (!url || url === '#') {
          alert("فيديو جولة العقار قريباً.");
      } else {
          window.open(url, '_blank');
      }
  };
  
  // Build ledger items dynamically
  const ledgerItems: { category: string; amount: number; color?: string; highlight?: boolean }[] = [];
  
  if (effectiveOtaFee > 0) {
      const percentageLabel = '١٥.٥٪';
      ledgerItems.push({ category: `رسوم منصات الحجز (${percentageLabel})`, amount: effectiveOtaFee, color: 'bg-blue-400' });
  }

  ledgerItems.push({ category: `حصة مبات (${Math.round(mabaatPercentage * 100)}٪ من الصافي)`, amount: effectiveMabaat, color: 'bg-purple-400' });
  ledgerItems.push({ category: 'صافي الدخل (المالك)', amount: effectiveNetIncome, color: 'bg-emerald-400', highlight: true });

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-cairo overflow-x-hidden selection:bg-[#4A2C5A] selection:text-white">
      <Header_ar onToggleLanguage={onToggleLanguage} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        
        <FadeInUp>
          <div className="text-center pt-10 pb-8 sm:pt-16 sm:pb-8">
             <div className="inline-block mb-4 sm:mb-6 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">دراسة جدوى استراتيجية</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-[#1D1D1F] tracking-tighter mb-4 sm:mb-6 leading-[0.9]">
              مشروع النزهة<span className="text-[#4A2C5A]">.</span>
            </h1>
            <p className="text-lg sm:text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight px-4">
                تقييم الاستخدام الأمثل لمجمع الـ ٩ وحدات: <span className="text-[#4A2C5A]">هجين</span>, <span className="text-[#D4AF37]">يومي</span> و <span className="text-[#2A5B64]">سنوي</span>.
            </p>
          </div>
        </FadeInUp>

        {/* Section 2: Interactive Deep Dive */}
        <Section title="تحليل تفاعلي" className="!mt-0 !pt-0" titleColor="text-[#1D1D1F]">
            
            <div className="bg-[#000000] text-white rounded-3xl sm:rounded-[2rem] shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                
                <div className="bg-white/5 backdrop-blur-xl border-b border-white/5 p-4 sm:p-6 flex flex-col gap-4 sticky top-0 z-20">
                     <div className="flex flex-col sm:flex-row-reverse items-center justify-between gap-4">
                        <div className="w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
                            <div className="min-w-max">
                                <SegmentedControl 
                                    name="cockpit-scenario"
                                    selected={activeScenarioId} 
                                    onChange={(val) => {
                                        setActiveScenarioId(val);
                                        // Auto-adjust occupancy if switching to LTR and current is below 60%
                                        if (val === 'long_term' && occupancyRate < 0.6) {
                                            setOccupancyRate(0.6);
                                        }
                                    }}
                                    dark={true}
                                    options={SCENARIOS.map(s => ({ value: s.id, label: translateScenarioName(s.id) }))}
                                />
                            </div>
                         </div>

                        {/* Simulation Controls - Row - Sensitivity Hidden for Hybrid */}
                        {activeScenarioId !== 'hybrid' && (
                        <div className="w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 hide-scrollbar">
                            <div className="min-w-max">
                                <SegmentedControl 
                                    name="cockpit-case"
                                    selected={activeCase} 
                                    onChange={(val) => setActiveCase(val)}
                                    dark={true}
                                    options={caseOptions}
                                />
                            </div>
                        </div>
                        )}
                     </div>

                    {/* Simulation Controls - Row */}
                    <div className="w-full overflow-x-auto pb-1 sm:pb-0 hide-scrollbar border-t border-white/5 pt-3">
                         <div className="flex flex-col sm:flex-row items-center justify-center gap-4 min-w-max mx-auto">
                            
                            {/* Occupancy - Hide for Hybrid */}
                            {activeScenarioId !== 'hybrid' && (
                                <>
                                    <div className="flex items-center gap-3 flex-row-reverse">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">معدل الإشغال</span>
                                        <SegmentedControl 
                                            name="cockpit-occupancy"
                                            selected={occupancyRate} 
                                            onChange={(val) => setOccupancyRate(val)}
                                            dark={true}
                                            options={occupancyOptions}
                                        />
                                    </div>
                                    <div className="hidden sm:block w-[1px] h-6 bg-white/10"></div>
                                </>
                            )}

                            {/* Mgmt Fee */}
                            <div className="flex items-center gap-3 flex-row-reverse">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">رسوم الإدارة</span>
                                <SegmentedControl 
                                    name="cockpit-mabaat"
                                    selected={mabaatPercentage} 
                                    onChange={(val) => setMabaatPercentage(val)}
                                    dark={true}
                                    options={[
                                        { value: 0.2, label: '٢٠٪' },
                                        { value: 0.3, label: '٣٠٪' }
                                    ]}
                                />
                            </div>

                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeScenario.id}-${activeCase}-${occupancyRate}-${mabaatPercentage}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 text-right"
                    >
                        {/* RIGHT COLUMN (Financials - RTL) */}
                        <div className="lg:col-span-7 space-y-6 lg:order-2">
                            
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-2">
                                    الإيرادات السنوية المتوقعة
                                </p>
                                <div className="flex items-baseline justify-end gap-4 sm:gap-6">
                                    <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-white tabular-nums">
                                        {formatCurrency(effectiveRevenue)}
                                    </h2>
                                </div>
                                <div className="inline-flex items-center justify-end gap-2 mt-4 px-2 py-1 rounded bg-white/10 border border-white/5">
                                    <span className="text-[10px] font-bold text-white/70 tracking-wide uppercase">
                                        {translateDuration(activeScenario.occupancyDurationLabel)}
                                        {activeScenarioId !== 'hybrid' && ` (إشغال ${Math.round(effectiveOccupancy * 100)}٪)`}
                                    </span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
                                <h4 className="text-base sm:text-lg font-bold mb-6 sm:mb-8 flex items-center justify-end gap-3 text-white">
                                    التحليل المالي
                                    <div className="p-1.5 bg-white/10 rounded-lg">
                                        <BanknotesIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white/90" />
                                    </div>
                                </h4>
                                <DigitalLedger 
                                    revenue={effectiveRevenue} 
                                    items={ledgerItems} 
                                />
                            </div>

                            <div className="bg-white/5 rounded-2xl p-5 sm:p-6 border border-white/10">
                                <h4 className="text-base sm:text-lg font-bold mb-6 text-white/90">مخزون ٩ وحدات</h4>
                                <div className="space-y-4">
                                    {activeScenario.unitMix.map((unit, idx) => (
                                        <div key={idx} className="border-b border-white/5 last:border-0 pb-4 last:pb-0">
                                            {/* Header Row */}
                                            <div className="flex justify-between items-center mb-3 flex-row-reverse">
                                                <div className="flex items-center gap-3 flex-row-reverse">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/40">
                                                        {unit.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-sm">{unit.name}</p>
                                                        {unit.videoUrl && (
                                                            <button 
                                                                onClick={(e) => handleVideoClick(e, unit.videoUrl)}
                                                                className="flex items-center justify-end gap-1 mt-1 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider w-full"
                                                            >
                                                                شاهد الفيديو
                                                                <PlayCircleIcon className="w-3 h-3" />
                                                            </button>
                                                        )}
                                                        {!unit.priceRange && activeScenarioId !== 'hybrid' && <p className="text-[9px] text-white/40 uppercase tracking-wider">متوسط {formatCurrency(unit.avgPrice)}</p>}
                                                    </div>
                                                </div>
                                                <div className="text-left">
                                                    <span className="block text-lg font-bold text-white">{unit.count}</span>
                                                    <span className="text-[9px] text-white/40 uppercase tracking-wider">{translateUnitLabel(activeScenario.id)}</span>
                                                </div>
                                            </div>

                                            {/* Generic Pricing Breakdown (STR & LTR) */}
                                            {unit.priceRange && (
                                                <div className="grid grid-cols-3 gap-2 bg-white/5 rounded-lg p-2.5 flex-row-reverse">
                                                    <div className="text-center border-l border-white/10">
                                                        <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">أدنى</p>
                                                        <p className="text-xs font-bold text-white tabular-nums">{unit.priceRange.min.toLocaleString()}</p>
                                                    </div>
                                                    <div className="text-center border-l border-white/10">
                                                        <p className="text-[9px] text-emerald-400/60 uppercase tracking-widest mb-0.5 font-bold">متوسط</p>
                                                        <p className="text-sm font-black text-emerald-400 tabular-nums">{unit.priceRange.avg.toLocaleString()}</p>
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-[9px] text-white/40 uppercase tracking-widest mb-0.5">أقصى</p>
                                                        <p className="text-xs font-bold text-white tabular-nums">{unit.priceRange.max.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* LEFT COLUMN (Context - RTL) */}
                        <div className="lg:col-span-5 space-y-6 lg:order-1">
                            
                             <div className="bg-white/5 p-6 sm:p-8 rounded-2xl sm:rounded-[1.5rem] border border-white/10">
                                 <h4 className="text-white font-bold text-base sm:text-lg mb-2">الاستراتيجية</h4>
                                 <p className="text-sm text-white/60 leading-relaxed font-light">
                                     {translateScenarioDesc(activeScenario.id)}
                                 </p>
                             </div>

                        </div>

                    </motion.div>
                </AnimatePresence>
            </div>
        </Section>

      </main>
    </div>
  );
};

export default App_ar;
