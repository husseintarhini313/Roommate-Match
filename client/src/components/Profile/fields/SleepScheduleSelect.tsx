import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

type SleepSchedule = "early" | "late" | "flexible";

type SleepScheduleSelectProps = {
  value: SleepSchedule;
  onChange: (value: SleepSchedule) => void;
  disabled: boolean;
};

export default function SleepScheduleSelect({
  value,
  onChange,
  disabled,
}: SleepScheduleSelectProps) {
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="sleepSchedule-label">Sleep Schedule</InputLabel>
      <Select
        labelId="sleepSchedule-label"
        label="Sleep Schedule"
        value={value}
        onChange={(e) => onChange(e.target.value as SleepSchedule)}
      >
        <MenuItem value="early">Early bird</MenuItem>
        <MenuItem value="late">Night owl</MenuItem>
        <MenuItem value="flexible">Flexible</MenuItem>
      </Select>
    </FormControl>
  );
}
