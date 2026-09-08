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
  pets: 0.10,
  noisePreference: 0.10,
  guestFrequency: 0.10,
  socialLevel: 0.10,
};

function compareExact<T>(a: T, b: T): number {
  return (a === b ? 1 : 0);
}

function compareNumeric(a: number, b: number, maxDifference: number): number {
  return (1 - Math.abs(a - b) / maxDifference);
}

function compareBudget(budget: number, totalCost: number): number {
  if (totalCost <= budget) 
    return 1;

  return (Math.max(0, 1 - (totalCost - budget) / budget));
}

export function calculateCompatibility(viewer: Questionnaire, creator: Questionnaire, totalCost: number, weights= DEFAULT_WEIGHTS):number{

    const scores= {
        smokes: compareExact(viewer.smokes, creator.smokes),
        sleepSchedule: compareExact(viewer.sleepSchedule, creator.sleepSchedule),
        pets: compareExact(viewer.pets, creator.pets),
        noisePreference: compareExact(viewer.noisePreference, creator.noisePreference),
        guestFrequency: compareExact(viewer.guestFrequency, creator.guestFrequency),
        cleanliness: compareNumeric(viewer.cleanliness, creator.cleanliness, 4),
        socialLevel: compareNumeric(viewer.socialLevel, creator.socialLevel, 4),
        budget: compareBudget(viewer.budget, totalCost),
    }

    const finalScore =
        scores.smokes * weights.smokes +
        scores.sleepSchedule * weights.sleepSchedule +
        scores.pets * weights.pets +
        scores.noisePreference * weights.noisePreference +
        scores.guestFrequency * weights.guestFrequency +
        scores.cleanliness * weights.cleanliness +
        scores.socialLevel * weights.socialLevel +
        scores.budget * weights.budget;

        return Math.round(finalScore * 100);
}