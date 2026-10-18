/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BmiCategory } from '../types';

export const BMI_CATEGORIES: BmiCategory[] = [
  {
    id: 'underweight',
    name: 'Zayıf',
    min: 0,
    max: 18.49,
    color: 'from-blue-500 to-cyan-500',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    borderColor: 'border-cyan-500',
    textColor: 'text-cyan-400',
    description: 'Boyunuza göre kilonuz yetersizdir. Yeterli ve dengeli beslenmeye özen göstermelisiniz.',
    recommendation: 'Diyetisyen eşliğinde sağlıklı kalori artışı ve kas kütlesi kazanımı önerilir.',
  },
  {
    id: 'normal',
    name: 'Normal Kilo',
    min: 18.5,
    max: 24.99,
    color: 'from-emerald-500 to-green-500',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-400',
    description: 'Boyunuza göre kilonuz ideal seviyededir. Tebrikler, formunuzu koruyun!',
    recommendation: 'Düzenli egzersiz ve dengeli Akdeniz tipi beslenme düzeninizi korumaya devam edin.',
  },
  {
    id: 'overweight',
    name: 'Fazla Kilolu',
    min: 25.0,
    max: 29.99,
    color: 'from-amber-500 to-yellow-500',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-400',
    description: 'Boyunuza göre kilonuz sınırın üzerindedir. Obezite riskini önlemek için kilo kontrolü gereklidir.',
    recommendation: 'Porsiyon kontrolü, şekerli/işlenmiş gıdaları azaltma ve haftada en az 150 dk kardiyo önerilir.',
  },
  {
    id: 'obese1',
    name: '1. Derece Obezite',
    min: 30.0,
    max: 34.99,
    color: 'from-orange-500 to-amber-600',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    borderColor: 'border-orange-500',
    textColor: 'text-orange-400',
    description: 'Vücut ağırlığınız sağlığınızı tehdit edebilecek obezite sınıfına girmiştir.',
    recommendation: 'Bir hekim ve uzman diyetisyen kontrolünde kilo verme sürecine başlanması tavsiye edilir.',
  },
  {
    id: 'obese2',
    name: '2. Derece Obezite',
    min: 35.0,
    max: 39.99,
    color: 'from-rose-500 to-red-600',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    borderColor: 'border-rose-500',
    textColor: 'text-rose-400',
    description: 'Ciddi obezite kategorisidir. Kalp-damar, tansiyon ve diyabet riski belirgin şekilde yüksektir.',
    recommendation: 'Tıbbi değerlendirme eşliğinde kapsamlı yaşam tarzı değişikliği ve medikal takip gereklidir.',
  },
  {
    id: 'obese3',
    name: '3. Derece (Morbid) Obezite',
    min: 40.0,
    max: 100,
    color: 'from-purple-600 to-rose-700',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-400',
    description: 'Aşırı / morbid obezite durumudur. Ciddi sağlık komplikasyonları oluşturabilir.',
    recommendation: 'Endokrinoloji ve obezite polikliniğinde multidisipliner tedavi planı oluşturulmalıdır.',
  },
];

export function getCategoryForBmi(bmi: number): BmiCategory {
  for (const cat of BMI_CATEGORIES) {
    if (bmi >= cat.min && bmi <= cat.max) {
      return cat;
    }
  }
  return bmi >= 40 ? BMI_CATEGORIES[BMI_CATEGORIES.length - 1] : BMI_CATEGORIES[0];
}

export function calculateBmi(heightMeters: number, weightKg: number) {
  if (heightMeters <= 0 || weightKg <= 0) {
    return null;
  }
  
  // Exact IEEE 754 double precision division in JS (same as Java double)
  // kilo / (boy * boy)
  const bmi = weightKg / (heightMeters * heightMeters);
  
  const category = getCategoryForBmi(bmi);
  const idealWeightMin = 18.5 * (heightMeters * heightMeters);
  const idealWeightMax = 24.9 * (heightMeters * heightMeters);
  
  let weightDifferenceToNormal = 0;
  if (weightKg > idealWeightMax) {
    weightDifferenceToNormal = weightKg - idealWeightMax;
  } else if (weightKg < idealWeightMin) {
    weightDifferenceToNormal = weightKg - idealWeightMin;
  }

  return {
    height: heightMeters,
    weight: weightKg,
    bmi,
    bmiPreciseString: bmi.toString(), // e.g. "35.49215792320173"
    category,
    idealWeightMin,
    idealWeightMax,
    weightDifferenceToNormal,
  };
}
