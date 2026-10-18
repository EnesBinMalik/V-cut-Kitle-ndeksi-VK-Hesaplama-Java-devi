/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Sparkles, AlertCircle, HelpCircle, CheckCircle2 } from 'lucide-react';
import { STANDARD_JAVA_CODE, ROBUST_JAVA_CODE, OOP_JAVA_CODE } from '../constants/javaCode';
import { CodeTabType } from '../types';

export const CodeViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CodeTabType>('standard');
  const [copied, setCopied] = useState(false);

  const getCode = () => {
    switch (activeTab) {
      case 'standard':
        return STANDARD_JAVA_CODE;
      case 'robust':
        return ROBUST_JAVA_CODE;
      case 'oop':
        return OOP_JAVA_CODE;
      default:
        return STANDARD_JAVA_CODE;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([getCode()], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Main.java';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const codeLines = getCode().split('\n');

  return (
    <div className="space-y-6">
      {/* Code Header & Tab Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Java Kaynak Kodu (Main.java)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Hazırlayan: <span className="text-indigo-400 font-semibold">Enes Öztürk</span> — İstenilen tüm kurallara birebir uygun
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-all hover:text-white"
            >
              <Download className="w-4 h-4" />
              <span>Main.java İndir</span>
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('standard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'standard'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            1. Standart Ödev Kodu (Tavsiye Edilen)
          </button>
          <button
            onClick={() => setActiveTab('robust')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'robust'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            2. Hata Korumalı & Akıllı Sürüm
          </button>
          <button
            onClick={() => setActiveTab('oop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'oop'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            3. Nesne Yönelimli (OOP) Sürüm
          </button>
        </div>
      </div>

      {/* Code Display Area with Syntax Styling */}
      <div className="rounded-2xl border border-slate-800 bg-[#0b0f19] shadow-2xl overflow-hidden">
        {/* Window Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">src/Main.java</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-sans">
              Java 8+ / 17 / 21
            </span>
          </div>
          <span className="text-xs text-slate-500">UTF-8 • {codeLines.length} satır</span>
        </div>

        {/* Code Content */}
        <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#0b0f19]">
          <pre className="table w-full">
            {codeLines.map((line, idx) => {
              // Basic syntax styling
              let lineContent = line;
              const isComment = line.trim().startsWith('//') || line.trim().startsWith('*') || line.trim().startsWith('/*');
              const isSignature = line.includes('Enes Öztürk');

              return (
                <div key={idx} className={`table-row hover:bg-slate-900/40 ${isSignature ? 'bg-amber-500/10' : ''}`}>
                  <span className="table-cell pr-4 text-right select-none text-slate-600 text-xs w-10">
                    {idx + 1}
                  </span>
                  <span className={`table-cell whitespace-pre ${
                    isSignature 
                      ? 'text-amber-300 font-bold' 
                      : isComment 
                        ? 'text-slate-500 italic' 
                        : 'text-slate-200'
                  }`}>
                    {lineContent}
                  </span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>

      {/* Code Explanations Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>İşlem Önceliği Uyarısı</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Formül <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300 font-mono">kilo / (boy * boy)</code> şeklinde parantezli yazılmalıdır. Eğer parantez konulmazsa, Java soldan sağa işlem yaparak <code className="bg-slate-800 px-1 py-0.5 rounded text-rose-300 font-mono">(kilo / boy) * boy = kilo</code> sonucunu verir!
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Neden double Veri Tipi?</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Boy (<code className="text-indigo-300">1.72</code>) ve VKİ (<code className="text-emerald-300">35.49215792320173</code>) gibi küsuratlı değerler için 64-bit hassasiyet sağlayan <code className="bg-slate-800 px-1 py-0.5 rounded text-indigo-300 font-mono">double</code> kullanılır. Float kullanılırsa basamak hassasiyeti kaybolur.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Virgül / Nokta Çözümü</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ödev örneğinde kullanıcı <code className="bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono">1,72</code> virgülle girdiğinden, Scanner'a <code className="bg-slate-800 px-1 py-0.5 rounded text-emerald-300 font-mono">Locale.forLanguageTag("tr-TR")</code> eklenmiştir. Bu sayede hata vermeden virgüllü giriş kabul eder.
          </p>
        </div>
      </div>
    </div>
  );
};
