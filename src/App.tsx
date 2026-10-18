/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TerminalSimulator } from './components/TerminalSimulator';
import { CodeViewer } from './components/CodeViewer';
import { BmiVisualizer } from './components/BmiVisualizer';
import { HomeworkExplanation } from './components/HomeworkExplanation';
import { Footer } from './components/Footer';
import { Terminal, Code2, Activity, BookOpen, CheckCircle2, Copy, Check, Download, Zap, Sparkles } from 'lucide-react';
import { STANDARD_JAVA_CODE } from './constants/javaCode';

export default function App() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'code' | 'calculator' | 'guide'>('terminal');
  const [syncedHeight, setSyncedHeight] = useState(1.72);
  const [syncedWeight, setSyncedWeight] = useState(105);
  const [quickCopied, setQuickCopied] = useState(false);

  const handleQuickCopy = () => {
    navigator.clipboard.writeText(STANDARD_JAVA_CODE);
    setQuickCopied(true);
    setTimeout(() => setQuickCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([STANDARD_JAVA_CODE], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Main.java';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section with Signature Badge */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Java 101 Ödev Çözümü</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-bold">Hazırlayan: Enes Öztürk</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Vücut Kitle İndeksi Hesaplama
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Java ile kullanıcıdan boy ve kilo değerlerini alıp formüle göre hesaplayan, test girdisi <span className="text-amber-300 font-mono font-semibold">1,72 m</span> ve <span className="text-amber-300 font-mono font-semibold">105 kg</span> için tam olarak <span className="text-emerald-400 font-mono font-bold">35.49215792320173</span> sonucunu veren eksiksiz ödev projesi.
              </p>

              {/* Formula Pill */}
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 font-mono text-slate-300">
                  <span className="text-slate-500">Formül: </span>
                  <span className="text-amber-300 font-bold">Kilo (kg) / (Boy(m) * Boy(m))</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 font-mono text-emerald-300">
                  <span className="text-emerald-400 font-bold">Sonuç: 35.49215792320173</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Panel */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={handleQuickCopy}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {quickCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{quickCopied ? 'Java Kodu Kopyalandı!' : 'Java Kodunu Kopyala'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4" />
                <span>Main.java Dosyasını İndir</span>
              </button>

              <div className="text-center text-[11px] text-slate-400">
                İmza: <span className="text-amber-400 font-semibold">Enes Öztürk</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Navigation Content Switcher */}
        <section className="space-y-6">
          {/* Tab Navigation Pill Bar */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'terminal'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>1. Java Terminal Çıktısı</span>
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'code'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>2. Kaynak Kodu (Main.java)</span>
              </button>

              <button
                onClick={() => setActiveTab('calculator')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'calculator'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span>3. Canlı VKİ & Sağlık Analizi</span>
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'guide'
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>4. Ödev Raporu & Kurallar</span>
              </button>
            </div>
          </div>

          {/* Render Active View */}
          <div className="transition-opacity duration-200">
            {activeTab === 'terminal' && (
              <TerminalSimulator
                onHeightWeightChange={(h, w) => {
                  setSyncedHeight(h);
                  setSyncedWeight(w);
                }}
              />
            )}

            {activeTab === 'code' && <CodeViewer />}

            {activeTab === 'calculator' && (
              <BmiVisualizer initialHeight={syncedHeight} initialWeight={syncedWeight} />
            )}

            {activeTab === 'guide' && <HomeworkExplanation />}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
