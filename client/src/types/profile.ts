export type Profile = {
  name: string;
  age: number;
  bio?: string;
  questionnaire: {
    smokes: boolean;
    pets: boolean;
    sleepSchedule: "early" | "late" | "flexible";
    noisePreference: "quiet" | "moderate" | "loud";
    guestFrequency: "rarely" | "sometimes" | "often";
    cleanliness: number;
    socialLevel: number;
    budget: number;
  };
};