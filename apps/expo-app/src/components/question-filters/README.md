# Quiz Setup — Architecture & HTML → React Native Mapping

This document explains how `QuestionFilterOption`, `QuestionFilterSection`, and
`QuizSetupScreen` fit together, and maps every field from your original
`quizOptionsForm` HTML to the code that replicates it.

## How the three pieces work together

```
QuizSetupScreen              (owns all form state, one useState per field)
  └─ QuestionFilterSection   (one per HTML "option-section" — owns single/multi logic)
       └─ QuestionFilterOption   (one per radio/checkbox — the atomic control)
```

**`QuestionFilterOption`** is the atomic control. It renders one of two things:
- `type="multi"` → a real `@rn-primitives/checkbox`-backed `Checkbox` (from `~/components/ui/checkbox`). Fully standalone — toggles itself on press.
- `type="single"` → a real `@rn-primitives/radio-group`-backed `RadioGroupItem` (from `~/components/ui/radio-group`). This **must** be rendered inside an ancestor `RadioGroup` to get exclusivity — it has no state of its own.

It never talks to the rest of the app directly — it just reports `(name, value, checked)` up through `onChange` whenever it's pressed.

**`QuestionFilterSection`** is the group wrapper — one per HTML `<div class="option-section">`. It:
- renders the section title (`<h3 class="section-title">` in the HTML → `<Text>` here)
- for `type="single"`, wraps its `QuestionFilterOption`s in a real `<RadioGroup value={...} onValueChange={...}>` automatically, so screens never have to write that wrapper by hand
- for `type="multi"`, renders each `QuestionFilterOption` standalone and merges checked/unchecked values into a `string[]` for you
- exposes one simple controlled prop either way: `value` + `onChange`, either a `string` (single) or `string[]` (multi) — matching how a `<select>`/radio group vs. a set of checkboxes behaves in the original HTML

**`QuizSetupScreen`** is the page — one `useState` per HTML field, each wired straight into a `QuestionFilterSection`. It also renders the two plain-input fields (Number of Questions, Timer) and the slider (Speed of Text) directly, since those aren't option groups. On submit (`Start Quiz`), it bundles every field into one config object — the RN equivalent of collecting a `<form>`'s values on submit.

| HTML concept | React Native equivalent |
|---|---|
| `<form id="quizOptionsForm">` + submit button | `QuizSetupScreen` + `handleStartQuiz()` |
| `<div class="option-section">` | `QuestionFilterSection` |
| `<input type="radio">` | `QuestionFilterOption type="single"` (via `RadioGroupItem`) |
| `<input type="checkbox">` | `QuestionFilterOption type="multi"` (via `Checkbox`) |
| `<input type="number">` | `~/components/ui/input`'s `Input` with `keyboardType="number-pad"` |
| `<input type="range">` + `<span id="speedValue">` | `@react-native-community/slider`'s `Slider` + a `Text` showing the live value |
| `<button type="submit">` | `~/components/ui/button`'s `Button` |

---

## Full HTML → code replication, section by section

### 1. Verse Selection (radio)
HTML:
```html
<div class="option-section" id="vs">
  <h3 class="section-title">Verse Selection</h3>
  <div class="radio-group">
    <label><input type="radio" name="verseSelection" value="random" checked> Random</label>
    <label><input type="radio" name="verseSelection" value="byReference"> By Reference</label>
    <label><input type="radio" name="verseSelection" value="alphabet"> Alphabetically</label>
  </div>
</div>
```
React Native (`QuizSetupScreen.tsx`):
```tsx
const [verseSelection, setVerseSelection] = React.useState('random');

<QuestionFilterSection
  title="Verse Selection"
  type="single"
  name="verseSelection"
  value={verseSelection}
  onChange={setVerseSelection}
  options={[
    { label: 'Random', value: 'random' },
    { label: 'By Reference', value: 'byReference' },
    { label: 'Alphabetically', value: 'alphabet' },
  ]}
/>
```
The `checked` default on "Random" in the HTML becomes the initial `useState('random')` value.

### 2. Question Type (checkboxes)
HTML:
```html
<div class="option-section" id="qt">
  <h3 class="section-title">Question Type</h3>
  <div class="checkbox-container">
    <label><input type="checkbox" name="quizMode" value="quote" checked> Quotes</label>
    <label><input type="checkbox" name="quizMode" value="ftv" checked title="Finish the Verse"> FTV</label>
    <label><input type="checkbox" name="quizMode" value="SQ:" checked> SQ</label>
    <label><input type="checkbox" name="quizMode" value="According to" checked> According to</label>
    <label><input type="checkbox" name="quizMode" value="question" checked title="Regluar questions"> Questions</label>
  </div>
</div>
```
React Native:
```tsx
const QUESTION_TYPE_OPTIONS = [
  { label: 'Quotes', value: 'quote' },
  { label: 'FTV', value: 'ftv' },
  { label: 'SQ', value: 'SQ:' },
  { label: 'According to', value: 'According to' },
  { label: 'Questions', value: 'question' },
];

const [quizMode, setQuizMode] = React.useState<string[]>([
  'quote', 'ftv', 'SQ:', 'According to', 'question', // all "checked" by default, same as the HTML
]);

<QuestionFilterSection
  title="Question Type"
  type="multi"
  name="quizMode"
  value={quizMode}
  onChange={setQuizMode}
  options={QUESTION_TYPE_OPTIONS}
/>
```
The `"SQ:"` and `"According to"` values (including the odd trailing colon) are kept exactly as in your HTML `value` attributes so nothing downstream that matches on those strings breaks. The `title="..."` tooltip attributes (FTV, Questions) don't have a direct RN equivalent — see "Not carried over" below.

### 3. Number of Questions
HTML:
```html
<div class="option-section" id="nq">
  <h3 class="section-title">Number of Questions</h3>
  <input type="number" id="numQuestions" name="numQuestions" value="20" min="1" max="100">
</div>
```
React Native:
```tsx
const [numQuestions, setNumQuestions] = React.useState('20');

<View className="mb-6">
  <Text className="mb-2 text-lg font-semibold">Number of Questions</Text>
  <Input
    keyboardType="number-pad"
    value={numQuestions}
    onChangeText={setNumQuestions}
    placeholder="20"
  />
</View>
```
`min`/`max` (1–100) aren't enforced by `<Input>` itself — clamp `numQuestions` yourself in `handleStartQuiz` if you want that HTML behavior preserved.

### 4. Length of Timer
HTML:
```html
<div class="option-section extra">
  <h3 class="section-title">Length of Timer (Length of zero will be no timer)</h3>
  <input type="number" id="secs" name="numQuestions" value="30" min="0" max="1000">
</div>
```
React Native:
```tsx
const [timerSecs, setTimerSecs] = React.useState('30');

<View className="mb-6">
  <Text className="mb-2 text-lg font-semibold">Length of Timer (0 = no timer)</Text>
  <Input
    keyboardType="number-pad"
    value={timerSecs}
    onChangeText={setTimerSecs}
    placeholder="30"
  />
</View>
```
Note: the original HTML reused `name="numQuestions"` for this timer input (likely a copy-paste bug in the source form — both fields shared one `name`). The RN version gives it its own state (`timerSecs`) so the two fields don't collide.

### 5. Speed of Text (range slider)
HTML:
```html
<div class="option-section extra">
  <h3 class="section-title">Speed of Text (In milliseconds)</h3>
  <div class="range-display-container">
    <input type="range" id="speed" name="numQuestions" value="0" min="0" max="2000">
    <span id="speedValue">0</span>
  </div>
</div>
```
React Native:
```tsx
const [speed, setSpeed] = React.useState(0);

<View className="mb-6">
  <Text className="mb-2 text-lg font-semibold">Speed of Text (ms)</Text>
  <View className="flex-row items-center gap-3">
    <Slider
      className="flex-1"
      minimumValue={0}
      maximumValue={2000}
      step={10}
      value={speed}
      onValueChange={setSpeed}
    />
    <Text className="w-12 text-right">{speed}</Text>
  </View>
</View>
```
The `<span id="speedValue">` that the HTML presumably updated via JS is just `{speed}` here, live-bound automatically since it's React state.

### 6. Question Selection: Months vs. Chapters (radio) + Select Months (checkboxes)
HTML:
```html
<div class="option-section extra" id="mc">
  <h3 class="section-title">Question Selection</h3>
  <div class="radio-group">
    <label id="month"><input type="radio" name="monthSelected" value="month" checked> By Months</label>
    <label id="chapter"><input type="radio" name="monthSelected" value="chapter"> By Chapters</label>
  </div>
</div>
<div id="chapters" class="checkbox-container"></div>
<div id="monthDiv" class="option-section">
  <h3 class="section-title">Select Months</h3>
  <div class="checkbox-container">
    <label><input type="checkbox" name="month" value="october"> October</label>
    <label><input type="checkbox" name="month" value="november"> November</label>
    <label><input type="checkbox" name="month" value="december"> December</label>
    <label><input type="checkbox" name="month" value="january"> January</label>
    <label><input type="checkbox" name="month" value="february"> February</label>
    <label><input type="checkbox" name="month" value="march"> March</label>
  </div>
</div>
```
React Native:
```tsx
const [selectionMode, setSelectionMode] = React.useState<'month' | 'chapter'>('month');
const [months, setMonths] = React.useState<string[]>([]);
const [chapters, setChapters] = React.useState<string[]>([]); // fed by your own chapter data source

<QuestionFilterSection
  title="Question Selection"
  type="single"
  name="monthSelected"
  value={selectionMode}
  onChange={(v) => setSelectionMode(v as 'month' | 'chapter')}
  options={[
    { label: 'By Months', value: 'month' },
    { label: 'By Chapters', value: 'chapter' },
  ]}
/>

{selectionMode === 'month' ? (
  <QuestionFilterSection
    title="Select Months"
    type="multi"
    name="month"
    value={months}
    onChange={setMonths}
    options={MONTH_OPTIONS}
  />
) : (
  <View className="mb-6">
    <Text className="mb-2 text-lg font-semibold">Select Chapters</Text>
    {chapters.length === 0 ? (
      <Text className="text-muted-foreground">
        No chapters loaded yet — populate this from your chapter data source.
      </Text>
    ) : (
      <QuestionFilterSection
        title=""
        type="multi"
        name="chapter"
        value={chapters}
        onChange={setChapters}
        options={chapters.map((c) => ({ label: c, value: c }))}
      />
    )}
  </View>
)}
```
The empty `<div id="chapters">` in your HTML (clearly meant to be filled in by JS at runtime, since it ships with zero children) becomes the `chapters` state array — empty until you wire it to a real data source, at which point it renders through the exact same `QuestionFilterSection` the months use. The HTML always rendered both `#monthDiv` and `#chapters` in the DOM at once (toggling visibility, presumably, via JS); the RN version conditionally renders one or the other based on `selectionMode`, which is the more idiomatic RN pattern but functionally equivalent to hiding one and showing the other.

### 7. Trigger Words (radio)
HTML:
```html
<div class="option-section extra" id="tw">
  <h3 class="section-title">Trigger Words</h3>
  <div class="radio-group">
    <label><input type="radio" id="highlight" name="verseSelectionH" value="highlight" checked> Highlight</label>
    <label><input type="radio" id="ingore" name="verseSelectionH" value="ingore"> Ingore</label>
    <label><input type="radio" id="stop" name="verseSelectionH" value="stop"> Stop at Word</label>
  </div>
</div>
```
React Native:
```tsx
const [triggerWords, setTriggerWords] = React.useState('highlight');

<QuestionFilterSection
  title="Trigger Words"
  type="single"
  name="verseSelectionH"
  value={triggerWords}
  onChange={setTriggerWords}
  options={[
    { label: 'Highlight', value: 'highlight' },
    { label: 'Ignore', value: 'ignore' },
    { label: 'Stop at Word', value: 'stop' },
  ]}
/>
```
Note: the HTML's `id`/`value` was `"ingore"` (typo for "ignore") — the RN version fixes the `value` to `"ignore"` for the actual data, but only the **label text** was ever misspelled either way ("Ingore"), which is now corrected too. If any existing backend logic matches on the literal string `"ingore"`, change the `value` back to match until that's updated.

### 8. Flight (checkboxes)
HTML:
```html
<div class="option-section" id="fgs ">
  <h3 class="section-title">Flight</h3>
  <div class="checkbox-container">
    <label><input type="checkbox" name="flight" value="A" checked> A</label>
    <label><input type="checkbox" name="flight" value="B" checked> B</label>
    <label><input type="checkbox" name="flight" value="C" checked> C</label>
    <label><input type="checkbox" name="flight" value="T" checked> T</label>
  </div>
</div>
```
React Native:
```tsx
const FLIGHT_OPTIONS = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'T', value: 'T' },
];
const [flight, setFlight] = React.useState<string[]>(['A', 'B', 'C', 'T']);

<QuestionFilterSection
  title="Flight"
  type="multi"
  name="flight"
  value={flight}
  onChange={setFlight}
  options={FLIGHT_OPTIONS}
/>
```

### 9. Start Quiz (submit)
HTML:
```html
<a id="startQuizButton2">
  <button type="submit" class="button" id="startQuizButton">Start Quiz</button>
</a>
```
React Native:
```tsx
const handleStartQuiz = () => {
  onStart?.({
    verseSelection, quizMode, numQuestions: Number(numQuestions),
    timerSecs: Number(timerSecs), speed, selectionMode, months,
    chapters, triggerWords, flight,
  });
};

<Button onPress={handleStartQuiz} className="mt-2">
  <Text>Start Quiz</Text>
</Button>
```
The HTML wrapped its `<button>` in an `<a>` (likely just for extra click-target styling, since `<a>` has no `href`) — that has no RN equivalent needed; `Button`'s `onPress` replaces the form's native `submit` event entirely, and the collected object replaces what a `FormData` read of the submitted `<form>` would have given you.

---

## Not carried over from the HTML (things to decide on)
- **`title="..."` tooltip attributes** (e.g. "Finish the Verse" on FTV, "Regluar questions" on Questions) — HTML tooltips don't map to anything on mobile. If you want that info surfaced, it'd need to become a `Pressable`-triggered `Tooltip`/`Popover` from reusables, or just baked into the label text.
- **`min`/`max` on number inputs** — not enforced automatically; validate `numQuestions`/`timerSecs` in `handleStartQuiz` if you want the original 1–100 / 0–1000 clamping back.
- **The stray extra space in `id="fgs "`** and the **duplicate `name="numQuestions"`** on the timer input in your original HTML were both just typos in the source markup — neither was replicated, since both were clearly unintentional.

## Setup
This uses the real RN Reusables primitives (`@rn-primitives/checkbox`, `@rn-primitives/radio-group`) plus NativeWind, not a hand-rolled substitute.

```bash
npx react-native-reusables init   # or add to an existing Expo app
npx react-native-reusables add checkbox radio-group label input button
npx expo install @react-native-community/slider
```

That generates `~/components/ui/checkbox.tsx`, `~/components/ui/radio-group.tsx`, `~/components/ui/label.tsx`, `~/components/ui/input.tsx`, `~/components/ui/button.tsx`, `~/components/ui/text.tsx`, and the `cn` helper at `~/lib/utils`, all backed by the `@rn-primitives/*` packages under the hood.