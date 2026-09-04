import { useEffect, useState } from "react";
import { apiFetch } from "../api/client";
import { useNavigate } from "react-router-dom";

type Profile = {
  _id: string;
  userId: string;
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

type ProfileFormData = {
  name: string;
  age: number;
  bio: string;
  questionnaire: Profile["questionnaire"];
};

const emptyQuestionnaire: Profile["questionnaire"] = {
  smokes: false,
  pets: false,
  sleepSchedule: "flexible",
  noisePreference: "moderate",
  guestFrequency: "sometimes",
  cleanliness: 3,
  socialLevel: 3,
  budget: 0,
};

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    age: 0,
    bio: "",
    questionnaire: emptyQuestionnaire,
  });

  const isReadOnly = profile !== null && !isEditing;

  useEffect(() => {
    async function getProfile() {
      try {
        const result = await apiFetch<Profile>("/profile");

        setProfile(result);

        setFormData({
          name: result.name,
          age: result.age,
          bio: result.bio ?? "",
          questionnaire: result.questionnaire,
        });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        if (message !== "Profile not found") {
          setError(message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getProfile();
  }, []);

  const handleCancel = () => {
    if (!profile) return;
    setFormData({
      name: profile.name,
      age: profile.age,
      bio: profile.bio ?? "",
      questionnaire: profile.questionnaire,
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      if (profile && isEditing) {
        const updated = await apiFetch<Profile>("/profile", {
          method: "PATCH",
          body: JSON.stringify(formData),
        });

        setProfile(updated);
        setIsEditing(false);
      } else {
        const created = await apiFetch<Profile>("/profile", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        setProfile(created);
        navigate("/");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Profile</h1>

      <label htmlFor="fullName">Full Name</label>
      <input
        id="fullName"
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        required
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        disabled={isReadOnly}
      />

      <label htmlFor="age">Age</label>
      <input
        id="age"
        type="number"
        name="age"
        placeholder="Age"
        min={18}
        max={100}
        value={formData.age}
        required
        onChange={(e) =>
          setFormData({ ...formData, age: Number(e.target.value) })
        }
        disabled={isReadOnly}
      />

      <label htmlFor="bio">About You</label>
      <textarea
        id="bio"
        name="bio"
        placeholder="Tell us a little about yourself"
        value={formData.bio}
        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        disabled={isReadOnly}
      />

      <fieldset disabled={isReadOnly}>
        <legend>Do you smoke?</legend>

        <label>
          <input
            type="radio"
            name="smokes"
            value="true"
            checked={formData.questionnaire.smokes}
            onChange={() =>
              setFormData({
                ...formData,
                questionnaire: {
                  ...formData.questionnaire,
                  smokes: true,
                },
              })
            }
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            name="smokes"
            value="false"
            checked={!formData.questionnaire.smokes}
            onChange={() =>
              setFormData({
                ...formData,
                questionnaire: {
                  ...formData.questionnaire,
                  smokes: false,
                },
              })
            }
          />
          No
        </label>
      </fieldset>

      <fieldset disabled={isReadOnly}>
        <legend>Do you have any pets?</legend>

        <label>
          <input
            type="radio"
            name="pets"
            value="true"
            checked={formData.questionnaire.pets === true}
            onChange={() =>
              setFormData({
                ...formData,
                questionnaire: {
                  ...formData.questionnaire,
                  pets: true,
                },
              })
            }
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            name="pets"
            value="false"
            checked={formData.questionnaire.pets === false}
            onChange={() =>
              setFormData({
                ...formData,
                questionnaire: {
                  ...formData.questionnaire,
                  pets: false,
                },
              })
            }
          />
          No
        </label>
      </fieldset>

      <label htmlFor="sleepSchedule">Sleep Schedule</label>
      <select
        id="sleepSchedule"
        name="sleepSchedule"
        value={formData.questionnaire.sleepSchedule}
        required
        onChange={(e) =>
          setFormData({
            ...formData,
            questionnaire: {
              ...formData.questionnaire,
              sleepSchedule: e.target.value as "early" | "late" | "flexible",
            },
          })
        }
        disabled={isReadOnly}
      >
        <option value="early">Early bird</option>
        <option value="late">Night owl</option>
        <option value="flexible">Flexible</option>
      </select>

      <label htmlFor="noisePreference">Preferred Noise Level</label>
      <select
        id="noisePreference"
        name="noisePreference"
        value={formData.questionnaire.noisePreference}
        required
        onChange={(e) =>
          setFormData({
            ...formData,
            questionnaire: {
              ...formData.questionnaire,
              noisePreference: e.target.value as "quiet" | "moderate" | "loud",
            },
          })
        }
        disabled={isReadOnly}
      >
        <option value="quiet">Quiet</option>
        <option value="moderate">Moderate</option>
        <option value="loud">Loud</option>
      </select>

      <label htmlFor="guestFrequency">How Often Do You Have Guests?</label>
      <select
        name="guestFrequency"
        id="guestFrequency"
        value={formData.questionnaire.guestFrequency}
        required
        onChange={(e) =>
          setFormData({
            ...formData,
            questionnaire: {
              ...formData.questionnaire,
              guestFrequency: e.target.value as
                | "rarely"
                | "sometimes"
                | "often",
            },
          })
        }
        disabled={isReadOnly}
      >
        <option value="rarely">Rarely</option>
        <option value="sometimes">Sometimes</option>
        <option value="often">Often</option>
      </select>

      <div>
        <label htmlFor="cleanliness">
          Cleanliness: {formData.questionnaire.cleanliness}
        </label>
        <input
          id="cleanliness"
          type="range"
          name="cleanliness"
          min={1}
          max={5}
          value={formData.questionnaire.cleanliness}
          onChange={(e) =>
            setFormData({
              ...formData,
              questionnaire: {
                ...formData.questionnaire,
                cleanliness: Number(e.target.value),
              },
            })
          }
          disabled={isReadOnly}
        />
      </div>

      <div>
        <label htmlFor="socialLevel">
          Social Level: {formData.questionnaire.socialLevel}
        </label>
        <input
          id="socialLevel"
          type="range"
          name="socialLevel"
          min={1}
          max={5}
          value={formData.questionnaire.socialLevel}
          onChange={(e) =>
            setFormData({
              ...formData,
              questionnaire: {
                ...formData.questionnaire,
                socialLevel: Number(e.target.value),
              },
            })
          }
          disabled={isReadOnly}
        />
      </div>

      <label htmlFor="budget">Monthly Budget</label>
      <input
        id="budget"
        type="number"
        name="budget"
        placeholder="Monthly budget"
        value={formData.questionnaire.budget}
        required
        onChange={(e) =>
          setFormData({
            ...formData,
            questionnaire: {
              ...formData.questionnaire,
              budget: Number(e.target.value),
            },
          })
        }
        disabled={isReadOnly}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {profile === null && (
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Create Profile"}
        </button>
      )}

      {profile !== null && !isEditing && (
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}

      {profile !== null && isEditing && (
        <>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving" : "Save"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      )}
    </form>
  );
}
