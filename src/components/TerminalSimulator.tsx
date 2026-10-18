/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal as TerminalIcon, Sparkles, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TerminalSimulatorProps {
  onHeightWeightChange?: (height: number, weight: number) => void;
}

interface LogLine {
  id: string;
  type: 'system' | 'prompt' | 'input' | 'output' | 'signature' | 'success';
  text: string;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ onHeightWeightChange }) => {
  const [stage, setStage] = useState<'idle' | 'waitingHeight' | 'waitingWeight' | 'finished'>('idle');
  const [currentInput, setCurrentInput] = useState('');
  const [enteredHeight, setEnteredHeight] = useState<number | null>(null);
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Initialize with ready prompt or run automatically
  useEffect(() => {
    runAutoDemo(1.72, 105);
  }, []);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, stage]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch {
      // ignore
    }
  };

  const runAutoDemo = (h = 1.72, w = 105) => {
    const heightStr = h.toString().replace('.', ',');
    const weightStr = w.toString();
    const bmiVal = w / (h * h);

    if (onHeightWeightChange) {
      onHeightWeightChange(h, w);
    }

    setStage('idle');
    setLogs([
      { id: '1', type: 'system', text: '$ javac Main.java' },
      { id: '2', type: 'system', text: '$ java Main' },
      { id: '3', type: 'prompt', text: 'Lütfen boyunuzu (metre cinsinde) giriniz : ' + heightStr },
      { id: '4', type: 'prompt', text: 'Lütfen kilonuzu giriniz : ' + weightStr },
      { id: '5', type: 'output', text: 'Vücut Kitle İndeksiniz : ' + bmiVal.toString() },
      { id: '6', type: 'signature', text: '----------------------------------------------' },
      { id: '7', type: 'signature', text: 'Ödev Hazırlayan: Enes Öztürk' },
      { id: '8', type: 'signature', text: '----------------------------------------------' },
      { id: '9', type: 'success', text: 'Process finished with exit code 0' },
    ]);
    setStage('finished');
    triggerCelebration();
  };

  const startInteractive = () => {
    setLogs([
      { id: '1', type: 'system', text: '$ javac Main.java' },
      { id: '2', type: 'system', text: '$ java Main' },
      { id: '3', type: 'prompt', text: 'Lütfen boyunuzu (metre cinsinde) giriniz : ' },
    ]);
    setStage('waitingHeight');
    setEnteredHeight(null);
    setCurrentInput('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = currentInput.trim();
    if (!val) return;

    if (stage === 'waitingHeight') {
      const parsedH = parseFloat(val.replace(',', '.'));
      if (isNaN(parsedH) || parsedH <= 0 || parsedH > 3) {
        setLogs((prev) => [
          ...prev,
          { id: String(Date.now()), type: 'input', text: val },
          { id: String(Date.now() + 1), type: 'system', text: 'Hata: Lütfen geçerli bir boy giriniz (Örn: 1,72)' },
          { id: String(Date.now() + 2), type: 'prompt', text: 'Lütfen boyunuzu (metre cinsinde) giriniz : ' },
        ]);
        setCurrentInput('');
        return;
      }

      setEnteredHeight(parsedH);
      setLogs((prev) => [
        ...prev.slice(0, -1),
        { id: String(Date.now()), type: 'prompt', text: 'Lütfen boyunuzu (metre cinsinde) giriniz : ' + val },
        { id: String(Date.now() + 1), type: 'prompt', text: 'Lütfen kilonuzu giriniz : ' },
      ]);
      setStage('waitingWeight');
      setCurrentInput('');
    } else if (stage === 'waitingWeight') {
      const parsedW = parseFloat(val.replace(',', '.'));
      if (isNaN(parsedW) || parsedW <= 0 || parsedW > 500) {
        setLogs((prev) => [
          ...prev,
          { id: String(Date.now()), type: 'input', text: val },
          { id: String(Date.now() + 1), type: 'system', text: 'Hata: Lütfen geçerli bir kilo giriniz (Örn: 105)' },
          { id: String(Date.now() + 2), type: 'prompt', text: 'Lütfen kilonuzu giriniz : ' },
        ]);
        setCurrentInput('');
        return;
      }

      const h = enteredHeight || 1.72;
      const bmiVal = parsedW / (h * h);

      if (onHeightWeightChange) {
        onHeightWeightChange(h, parsedW);
      }

      setLogs((prev) => [
        ...prev.slice(0, -1),
        { id: String(Date.now()), type: 'prompt', text: 'Lütfen kilonuzu giriniz : ' + val },
        { id: String(Date.now() + 1), type: 'output', text: 'Vücut Kitle İndeksiniz : ' + bmiVal.toString() },
        { id: String(Date.now() + 2), type: 'signature', text: '----------------------------------------------' },
        { id: String(Date.now() + 3), type: 'signature', text: 'Ödev Hazırlayan: Enes Öztürk' },
        { id: String(Date.now() + 4), type: 'signature', text: '----------------------------------------------' },
        { id: String(Date.now() + 5), type: 'success', text: 'Process finished with exit code 0' },
      ]);
      setStage('finished');
      setCurrentInput('');
      triggerCelebration();
    }
  };

  const copyTerminalOutput = () => {
    const rawText = logs.map((l) => l.text).join('\n');
    navigator.clipboard.writeText(rawText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner / Callout */}
      <div className="bg-gradient-to-r from-indigo-950/70 via-slate-900 to-amber-950/40 rounded-2xl p-5 border border-indigo-500/20 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Ödev Çıktı Uyumu
              </span>
              <span className="text-xs text-slate-400">Patika / Java 101 Standardı</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              Java Konsol Çıktısı Simülatörü
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Kullanıcıdan <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">1,72</code> ve <code className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">105</code> girildiğinde tam olarak <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-300 font-mono">35.49215792320173</code> çıktısını üretir.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => runAutoDemo(1.72, 105)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Zap className="w-4 h-4" />
              Ödev Örneğini Çalıştır (1,72 / 105)
            </button>
            <button
              onClick={startInteractive}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-600/20"
            >
              <Play className="w-4 h-4" />
              İnteraktif Gir
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            Hızlı Test Senaryoları:
          </span>
          <button
            onClick={() => runAutoDemo(1.72, 105)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
            Ödev: 1,72m / 105kg (35.49)
          </button>
          <button
            onClick={() => runAutoDemo(1.75, 70)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Normal Kilo: 1,75m / 70kg (22.85)
          </button>
          <button
            onClick={() => runAutoDemo(1.80, 92)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            Fazla Kilo: 1,80m / 92kg (28.39)
          </button>
          <button
            onClick={() => runAutoDemo(1.65, 47)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 transition-colors flex items-center gap-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            Zayıf: 1,65m / 47kg (17.26)
          </button>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="rounded-2xl border border-slate-800 bg-[#0d1117] shadow-2xl overflow-hidden font-mono">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600"></div>
            <span className="ml-2 text-xs text-slate-400 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-slate-500" />
              bash — java Main (Enes Öztürk)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyTerminalOutput}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1"
              title="Terminal çıktısını kopyala"
            >
              {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{isCopied ? 'Kopyalandı' : 'Çıktıyı Kopyala'}</span>
            </button>
            <button
              onClick={() => runAutoDemo(1.72, 105)}
              className="text-xs text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
              title="Yeniden Başlat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-5 text-sm sm:text-base leading-relaxed space-y-1.5 min-h-[300px] overflow-y-auto max-h-[500px]">
          {logs.map((log) => {
            if (log.type === 'system') {
              return (
                <div key={log.id} className="text-slate-400 flex items-center gap-1">
                  <span>{log.text}</span>
                </div>
              );
            }
            if (log.type === 'prompt') {
              return (
                <div key={log.id} className="text-slate-100 flex items-baseline">
                  <span>{log.text}</span>
                </div>
              );
            }
            if (log.type === 'output') {
              return (
                <div key={log.id} className="text-emerald-400 font-bold py-1 bg-emerald-950/20 px-2 rounded -mx-2 border-l-2 border-emerald-500">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'signature') {
              return (
                <div key={log.id} className="text-amber-400 font-semibold tracking-wide">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'success') {
              return (
                <div key={log.id} className="text-xs text-slate-500 pt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{log.text}</span>
                </div>
              );
            }
            return (
              <div key={log.id} className="text-slate-200">
                {log.text}
              </div>
            );
          })}

          {/* Active Input Line during interactive mode */}
          {(stage === 'waitingHeight' || stage === 'waitingWeight') && (
            <form onSubmit={handleInputSubmit} className="flex items-center gap-1 text-slate-100">
              <span className="text-slate-300">
                {stage === 'waitingHeight' ? '' : ''}
              </span>
              <div className="relative flex items-center flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={stage === 'waitingHeight' ? 'Örn: 1,72' : 'Örn: 105'}
                  className="bg-transparent border-none outline-none text-emerald-300 font-mono text-base w-full focus:ring-0 p-0"
                  autoFocus
                />
                <button
                  type="submit"
                  className="text-xs px-2 py-0.5 rounded bg-indigo-600 text-white hover:bg-indigo-500"
                >
                  Enter ↵
                </button>
              </div>
            </form>
          )}

          <div ref={terminalBottomRef} />
        </div>

        {/* Terminal Footer Info */}
        <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>OpenJDK Runtime Environment (build 21.0.2)</span>
          </div>
          <div className="text-slate-300 font-medium">
            Ödev İmzası: <span className="text-amber-400">Enes Öztürk</span>
          </div>
        </div>
      </div>
    </div>
  );
};
