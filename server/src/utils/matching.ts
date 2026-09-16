export type Questionnaire = {
  smokes: boolean;
  pets: boolean;
  sleepSchedule: "early" | "late" | "flexible";
  noisePreference: "quiet" | "moderate" | "loud";
  guestFrequency: "rarely" | "sometimes" | "often";
  cleanliness: number;
  socialLevel: number;
  budget: number;
};

export const DEFAULT_WEIGHTS = {
  smokes: 0.15,
  sleepSchedule: 0.15,
  budget: 0.15,
  cleanliness: 0.15,
  pets: 0.1,
  noisePreference: 0.1,
  guestFrequency: 0.1,
  socialLevel: 0.1,
};

function compareExact<T>(a: T, b: T): number {
  return a === b ? 1 : 0;
}

function compareNumeric(a: number, b: number, maxDifference: number): number {
  return 1 - Math.abs(a - b) / maxDifference;
}

function compareBudget(budget: number, totalCost: number): number {
  if (totalCost <= budget) return 1;
  return Math.max(0, 1 - (totalCost - budget) / budget);
}

function getFieldScores(viewer: Questionnaire, creator: Questionnaire, totalCost: number) {
  return {
    smokes: compareExact(viewer.smokes, creator.smokes),
    sleepSchedule: compareExact(viewer.sleepSchedule, creator.sleepSchedule),
    pets: compareExact(viewer.pets, creator.pets),
    noisePreference: compareExact(viewer.noisePreference, creator.noisePreference),
    guestFrequency: compareExact(viewer.guestFrequency, creator.guestFrequency),
    cleanliness: compareNumeric(viewer.cleanliness, creator.cleanliness, 4),
    socialLevel: compareNumeric(viewer.socialLevel, creator.socialLevel, 4),
    budget: compareBudget(viewer.budget, totalCost),
  };
}

export function calculateCompatibility(
  viewer: Questionnaire,
  creator: Questionnaire,
  totalCost: number,
  weights = DEFAULT_WEIGHTS
): number {
  const scores = getFieldScores(viewer, creator, totalCost);
  let finalScore = 0;
  for (const key in scores) {
    finalScore += scores[key as keyof typeof scores] * weights[key as keyof typeof weights];
  }
  return Math.round(finalScore * 100);
}

export function getCompatibilityBreakdown(viewer: Questionnaire, creator: Questionnaire, totalCost: number) {
  const scores = getFieldScores(viewer, creator, totalCost);
  const breakdown: Record<keyof typeof scores, number> = {} as Record<keyof typeof scores, number>;
  for (const key in scores) {
    breakdown[key as keyof typeof scores] = Math.round(scores[key as keyof typeof scores] * 100);
  }
  return breakdown;
}