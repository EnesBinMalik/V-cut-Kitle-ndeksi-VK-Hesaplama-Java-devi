/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BmiCategory {
  id: string;
  name: string;
  min: number;
  max: number;
  color: string;
  badgeColor: string;
  borderColor: string;
  textColor: string;
  description: string;
  recommendation: string;
}

export interface CalculationResult {
  height: number; // in meters (e.g. 1.72)
  weight: number; // in kg (e.g. 105)
  bmi: number;
  bmiPreciseString: string;
  category: BmiCategory;
  idealWeightMin: number;
  idealWeightMax: number;
  weightDifferenceToNormal: number; // positive = needs to lose, negative = needs to gain, 0 = normal
}

export type CodeTabType = 'standard' | 'robust' | 'oop';
