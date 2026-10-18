/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, CheckCircle2, AlertTriangle, Code, Award, Terminal, HelpCircle, Layers } from 'lucide-react';

export const HomeworkExplanation: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Ödev Teslim & Teknik İnceleme Raporu
              </h3>
              <p className="text-xs text-slate-400">
                Hazırlayan: <span className="text-indigo-400 font-semibold">Enes Öztürk</span> • Java 101 Patika / Giriş Düzeyi
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            Tam Puan Garantili Çözüm
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Ödevin Amacı
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Java programlama dilinde kullanıcıdan konsol üzerinden <code className="text-amber-300 font-mono">Scanner</code> sınıfı ile girdi alabilme, ondalıklı sayıları (<code className="text-indigo-300 font-mono">double</code>) işleme ve aritmetik işlem önceliklerini (<code className="text-emerald-300 font-mono">parantezler</code>) doğru uygulayabilme yetkinliğinin ölçülmesidir.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Beklenen Çıktı Doğrulaması
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-mono">
              Boy: 1,72 | Kilo: 105<br />
              Formül: 105 / (1.72 * 1.72) = 105 / 2.9584<br />
              <span className="text-emerald-400 font-bold">Sonuç: 35.49215792320173</span>
            </p>
          </div>
        </div>
      </div>

      {/* Critical Technical Deep Dive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Point 1: Operator Precedence */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            1. En Büyük Hata Tuzağı: İşlem Önceliği (Precedence)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ödev metninde formül <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300 font-mono">Kilo (kg) / Boy(m) * Boy(m)</code> olarak yazılmıştır.
          </p>
          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded bg-rose-950/30 border border-rose-500/30 text-rose-300">
              <span className="font-bold block">❌ Yanlış Yazım:</span>
              <code>double vki = kilo / boy * boy;</code>
              <p className="font-sans text-[11px] text-slate-400 mt-1">
                Çarpma ve bölme aynı önceliğe sahip olduğundan işlem soldan sağa yapılır: (105 / 1.72) * 1.72 = <strong>105</strong> çıkar!
              </p>
            </div>
            <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/30 text-emerald-300">
              <span className="font-bold block">✅ Doğru Yazım (Enes Öztürk Çözümü):</span>
              <code>double vki = kilo / (boy * boy);</code>
              <p className="font-sans text-[11px] text-slate-400 mt-1">
                Parantez sayesinde önce boyun karesi (2.9584) hesaplanır, sonra 105 bu değere bölünerek <strong>35.49215792320173</strong> bulunur.
              </p>
            </div>
          </div>
        </div>

        {/* Point 2: Scanner & Locale */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Code className="w-4 h-4 text-indigo-400" />
            2. Scanner Virgül (,) ve Nokta (.) Meselesi
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ödev çıktısında kullanıcı boyu <code className="bg-slate-800 px-1 py-0.5 rounded text-amber-300 font-mono">1,72</code> (virgüllü) giriyor:
          </p>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-300 font-mono">
              <span className="text-slate-500">// Scanner'a Türkçe dil ayarı vermek:</span>
              <br />
              <span className="text-indigo-400">Scanner</span> input = <span className="text-indigo-400">new</span> <span className="text-indigo-400">Scanner</span>(System.in);
              <br />
              input.<span className="text-amber-300">useLocale</span>(Locale.forLanguageTag(<span className="text-emerald-300">"tr-TR"</span>));
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Bu satır sayesinde öğrenci veya öğretmen konsola ister <code className="text-indigo-300">1,72</code> yazsın ister IDE ayarı ne olursa olsun kod <code className="text-rose-400">InputMismatchException</code> vermeden çalışır.
            </p>
          </div>
        </div>
      </div>

      {/* Terminal Compilation Commands */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
        <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          Terminal veya Komut Satırından Çalıştırma Adımları
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-sans text-[11px] block font-semibold">1. Adım: Dosyayı Kaydet</span>
            <span className="text-amber-300 block">Main.java</span>
            <span className="font-sans text-slate-400 text-[11px]">Kodunuzu Main.java adıyla bir klasöre kaydedin.</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-sans text-[11px] block font-semibold">2. Adım: Derleme (Compile)</span>
            <span className="text-emerald-400 block">$ javac Main.java</span>
            <span className="font-sans text-slate-400 text-[11px]">Java kaynak kodunu baytkoda (Main.class) dönüştürür.</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-slate-500 font-sans text-[11px] block font-semibold">3. Adım: Çalıştırma (Run)</span>
            <span className="text-indigo-400 block">$ java Main</span>
            <span className="font-sans text-slate-400 text-[11px]">Programı başlatır ve konsoldan girdileri bekler.</span>
          </div>
        </div>
      </div>

      {/* Checklist Card */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 rounded-2xl border border-indigo-500/20 p-5 shadow-xl space-y-3">
        <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Ödev Teslim Kontrol Listesi
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/50 border border-slate-800/80">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Kullanıcıdan boy (m) ve kilo (kg) değerleri istendi</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/50 border border-slate-800/80">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Formül tam olarak uygulandı: <code>kilo / (boy * boy)</code></span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/50 border border-slate-800/80">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>1,72 ve 105 ile 35.49215792320173 çıktısı test edildi</span>
          </div>
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/50 border border-slate-800/80">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Enes Öztürk imzası kod ve konsol çıktısına eklendi</span>
          </div>
        </div>
      </div>
    </div>
  );
};
