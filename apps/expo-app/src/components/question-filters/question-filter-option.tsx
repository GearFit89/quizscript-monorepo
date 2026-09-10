import * as React from "react";
import { View } from "react-native";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export type FilterOptionType = "single" | "multi";

export interface QuestionFilterOptionProps {
  /**
   * 'multi'  -> renders an rn-primitives Checkbox (fully standalone).
   * 'single' -> renders an rn-primitives RadioGroupItem. This MUST be
   *             rendered inside a <RadioGroup> (see QuestionFilterSection),
   *             since RadioGroupItem relies on RadioGroup's context for
   *             exclusivity — that's how @rn-primitives/radio-group works.
   */
  type: FilterOptionType;
  /** field name this option belongs to, e.g. "verseSelection" or "month" */
  name: string;
  /** underlying value, e.g. "random" or "october" */
  value: string;
  /** label text shown next to the control */
  label: string;
  /** whether this option is currently checked/selected (ignored for 'single' —
   *  RadioGroup derives checked state itself from its own `value` prop) */
  checked: boolean;
  /** fired when the user taps a 'multi' option. 'single' options report
   *  changes through the parent RadioGroup's onValueChange instead. */
  onChange: (name: string, value: string, checked: boolean) => void;
  disabled?: boolean;
}

/**
 * Atomic filter option, built on the real RN Reusables primitives
 * (@rn-primitives/checkbox and @rn-primitives/radio-group under the hood).
 *
 * Usage (multi/checkbox — fully standalone):
 *   <QuestionFilterOption
 *     type="multi"
 *     name="month"
 *     value="january"
 *     label="January"
 *     checked={months.includes('january')}
 *     onChange={(name, value, checked) => toggleMonth(value, checked)}
 *   />
 *
 * Usage (single/radio — must sit inside a <RadioGroup>, which
 * QuestionFilterSection sets up for you automatically):
 *   <RadioGroup value={verseSelection} onValueChange={setVerseSelection}>
 *     <QuestionFilterOption type="single" name="verseSelection" value="random" label="Random" checked={false} onChange={() => {}} />
 *   </RadioGroup>
 */
export function QuestionFilterOption({
  type,
  name,
  value,
  label,
  checked,
  onChange,
  disabled,
}: QuestionFilterOptionProps) {
  const labelId = `label-for-${name}-${value}`;

  if (type === "multi") {
    const handlePress = () => {
      if (!disabled) onChange(name, value, !checked);
    };
    return (
      <View className="flex-row items-center gap-3 py-2">
        <Checkbox
          checked={checked}
          onCheckedChange={handlePress}
          disabled={disabled}
        />
        <Label
          nativeID={labelId}
          onPress={handlePress}
          className="native:text-base flex-1"
        >
          {label}
        </Label>
      </View>
    );
  }

  // type === 'single' — relies on an ancestor RadioGroup for state/exclusivity
  return (
    <View className="flex-row items-center gap-3 py-2">
      <RadioGroupItem
        aria-labelledby={labelId}
        value={value}
        disabled={disabled}
      />
      <Label
        nativeID={labelId}
        className="native:text-base flex-1"
        onPress={() => {
          if (disabled) return;
          onChange(name, value, true);
        }}
      >
        {label}
      </Label>
    </View>
  );
}
