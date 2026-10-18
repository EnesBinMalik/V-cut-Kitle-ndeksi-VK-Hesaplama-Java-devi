/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Coffee, Heart, CheckCircle2, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-800/80 bg-slate-950/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Coffee className="w-3.5 h-3.5" />
            </div>
            <span>Java ile Vücut Kitle İndeksi (VKİ) Hesaplama Programı</span>
          </div>

          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <span>Ödev Sahibi:</span>
            <span className="text-amber-400 font-bold flex items-center gap-1">
              Enes Öztürk
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />
            </span>
          </div>

          <div className="text-slate-500">
            Formül: Kilo / (Boy * Boy) • IEEE 754 64-bit double
          </div>
        </div>
      </div>
    </footer>
  );
};
