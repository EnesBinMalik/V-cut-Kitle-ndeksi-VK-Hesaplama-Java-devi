/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateBmi, BMI_CATEGORIES } from '../constants/bmiData';
import { Scale, ArrowRight, HeartPulse, ShieldAlert, Sparkles, CheckCircle2, Info } from 'lucide-react';

interface BmiVisualizerProps {
  initialHeight?: number;
  initialWeight?: number;
}

export const BmiVisualizer: React.FC<BmiVisualizerProps> = ({
  initialHeight = 1.72,
  initialWeight = 105,
}) => {
  const [height, setHeight] = useState<number>(initialHeight);
  const [weight, setWeight] = useState<number>(initialWeight);

  const calc = calculateBmi(height, weight);

  const resetToHomework = () => {
    setHeight(1.72);
    setWeight(105);
  };

  // Calculate pointer percentage on visual meter (0 to 45 BMI scale)
  const meterPercentage = Math.min(Math.max(((calc?.bmi || 0) / 45) * 100, 2), 98);

  return (
    <div className="space-y-6">
      {/* Interactive Controls & Live Result Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input sliders & Fields */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-400" />
              Girdi Parametreleri
            </h3>
            <button
              onClick={resetToHomework}
              className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors font-medium"
            >
              Ödev Değerleri (1.72m / 105kg)
            </button>
          </div>

          {/* Height Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="height-input" className="text-slate-300 font-medium">Boy (Metre Cinsinde):</label>
              <div className="flex items-center gap-1 font-mono">
                <input
                  id="height-input"
                  aria-label="Boy (metre cinsinde)"
                  type="number"
                  step="0.01"
                  min="0.5"
                  max="2.5"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value) || 1.72)}
                  className="w-20 px-2 py-1 rounded bg-slate-800 text-right text-emerald-400 font-bold border border-slate-700 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-slate-400 text-xs">m</span>
              </div>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.2"
              step="0.01"
              value={height}
              onChange={(e) => setHeight(parseFloat(e.target.value))}
              aria-label="Boy ayarlama kaydırıcısı"
              className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>1.00 m</span>
              <span className="text-amber-400 font-semibold">Ödev: 1.72 m (172 cm)</span>
              <span>2.20 m</span>
            </div>
          </div>

          {/* Weight Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="weight-input" className="text-slate-300 font-medium">Kilo (Kilogram Cinsinde):</label>
              <div className="flex items-center gap-1 font-mono">
                <input
                  id="weight-input"
                  aria-label="Kilo (kilogram cinsinde)"
                  type="number"
                  step="0.5"
                  min="30"
                  max="250"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 105)}
                  className="w-20 px-2 py-1 rounded bg-slate-800 text-right text-emerald-400 font-bold border border-slate-700 focus:outline-none focus:border-indigo-500"
                />
                <span className="text-slate-400 text-xs">kg</span>
              </div>
            </div>
            <input
              type="range"
              min="35"
              max="180"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              aria-label="Kilo ayarlama kaydırıcısı"
              className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-mono">
              <span>35 kg</span>
              <span className="text-amber-400 font-semibold">Ödev: 105 kg</span>
              <span>180 kg</span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <span className="text-xs text-slate-400 block font-medium">Hızlı Örnek Seçimi:</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { setHeight(1.72); setWeight(105); }}
                className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-left transition-colors"
              >
                <div className="font-semibold text-rose-300">Ödev Değeri</div>
                <div className="text-[11px] text-slate-400">1.72m • 105kg</div>
              </button>
              <button
                onClick={() => { setHeight(1.72); setWeight(68); }}
                className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-left transition-colors"
              >
                <div className="font-semibold text-emerald-300">İdeal Kilo</div>
                <div className="text-[11px] text-slate-400">1.72m • 68kg</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Calculated Result & Formula Breakdown */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
                Hesaplanan Vücut Kitle İndeksi
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-bold border ${calc?.category.badgeColor}`}>
                {calc?.category.name}
              </span>
            </div>

            {/* High Precision Output */}
            <div className="mt-3">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-white flex items-baseline gap-2 flex-wrap">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
                  {calc ? calc.bmi.toFixed(2) : '0.00'}
                </span>
                <span className="text-xs sm:text-sm font-normal text-slate-400 font-mono">
                  kg/m²
                </span>
              </div>
              <div className="mt-2 text-xs sm:text-sm font-mono text-emerald-400/90 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 break-all">
                <span className="text-slate-500 select-none mr-2">Java Çıktısı:</span>
                Vücut Kitle İndeksiniz : {calc?.bmiPreciseString}
              </div>
            </div>
          </div>

          {/* Mathematical Step by Step Breakdown */}
          <div className="bg-slate-950/60 rounded-xl p-4 border border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-400" />
              Matematiksel Formül Çözümü:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-slate-400 text-[11px]">1. Adım: Boyun Karesi</div>
                <div className="text-slate-200 mt-1">
                  {height} × {height} = <span className="text-amber-300 font-bold">{(height * height).toFixed(4)} m²</span>
                </div>
              </div>
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80">
                <div className="text-slate-400 text-[11px]">2. Adım: Kilo / Boy²</div>
                <div className="text-slate-200 mt-1">
                  {weight} / {(height * height).toFixed(4)} = <span className="text-emerald-400 font-bold">{calc?.bmi.toFixed(4)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ideal Weight Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs sm:text-sm gap-2">
            <div>
              <span className="text-slate-400 block text-xs">Bu boy ({height} m) için İdeal Kilo Aralığı (VKİ 18.5 - 24.9):</span>
              <span className="font-bold text-indigo-300">
                {calc?.idealWeightMin.toFixed(1)} kg — {calc?.idealWeightMax.toFixed(1)} kg
              </span>
            </div>
            {calc && calc.weightDifferenceToNormal > 0 && (
              <div className="text-right sm:text-right">
                <span className="text-slate-400 block text-xs">Normal sınıra ulaşmak için:</span>
                <span className="font-bold text-rose-300">
                  ~{calc.weightDifferenceToNormal.toFixed(1)} kg verilmesi önerilir
                </span>
              </div>
            )}
            {calc && calc.weightDifferenceToNormal === 0 && (
              <div className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                İdeal Kilo Aralığındasınız!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visual BMI Meter Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
            <HeartPulse className="w-4 h-4 text-rose-400" />
            Dünya Sağlık Örgütü (WHO) VKİ Skalası & Konumunuz
          </h4>
          <span className="text-xs text-slate-400">0 — 45+ kg/m²</span>
        </div>

        {/* Meter Gauge Container */}
        <div className="relative pt-6 pb-2">
          {/* Pointer indicator */}
          <div
            className="absolute top-0 transition-all duration-300 transform -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${meterPercentage}%` }}
          >
            <div className="px-2 py-0.5 rounded bg-white text-slate-950 text-[11px] font-bold shadow-lg font-mono">
              {calc?.bmi.toFixed(1)}
            </div>
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-white"></div>
          </div>

          {/* Bar segments */}
          <div className="h-4 rounded-full overflow-hidden flex bg-slate-800 shadow-inner">
            <div className="h-full bg-cyan-500 w-[18.5%]" title="Zayıf (< 18.5)" />
            <div className="h-full bg-emerald-500 w-[14.2%]" title="Normal (18.5 - 24.9)" />
            <div className="h-full bg-amber-500 w-[11.1%]" title="Fazla Kilo (25 - 29.9)" />
            <div className="h-full bg-orange-500 w-[11.1%]" title="1. Derece Obezite (30 - 34.9)" />
            <div className="h-full bg-rose-500 w-[11.1%]" title="2. Derece Obezite (35 - 39.9)" />
            <div className="h-full bg-purple-600 flex-1" title="3. Derece Morbid (40+)" />
          </div>

          {/* Scale labels */}
          <div className="flex justify-between text-[10px] sm:text-xs text-slate-400 mt-2 font-mono">
            <span>0</span>
            <span>18.5</span>
            <span>25.0</span>
            <span>30.0</span>
            <span>35.0</span>
            <span>40.0+</span>
          </div>
        </div>

        {/* Category Description Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
          {BMI_CATEGORIES.map((cat) => {
            const isCurrent = calc?.category.id === cat.id;
            return (
              <div
                key={cat.id}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isCurrent
                    ? 'bg-slate-800/90 border-indigo-400 ring-2 ring-indigo-500/30 shadow-lg'
                    : 'bg-slate-950/40 border-slate-800/80 opacity-70'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold ${cat.textColor}`}>{cat.name}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {cat.min} - {cat.max >= 100 ? '40+' : cat.max}
                </div>
                {isCurrent && (
                  <div className="mt-1 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Mevcut Durum
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
