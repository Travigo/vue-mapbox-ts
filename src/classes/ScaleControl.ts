type ScaleControlUnit = 'imperial' | 'metric' | 'nautical';

export interface ScaleControlOptions {
  maxWidth: number;
  unit: ScaleControlUnit
}

export {
  ScaleControlUnit
};