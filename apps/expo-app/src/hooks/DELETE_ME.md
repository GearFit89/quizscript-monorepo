# Dynamic Style Editor (React Native + Bottom Sheet)

A 3-level drill-down editor for a nested `StyleContent` object, built on
`@gorhom/react-native-bottom-sheet`.

## Install dependencies

```bash
npm install @gorhom/react-native-bottom-sheet react-native-reanimated react-native-gesture-handler @react-native-community/slider
```

`react-native-reanimated` and `react-native-gesture-handler` are peer
dependencies of the bottom sheet library — follow their install docs for
your RN version (Babel plugin for reanimated, `GestureHandlerRootView`
wrapping your app root, etc.).

## Files

| File | Purpose |
|---|---|
| `types.ts` | `StyleContent` / `StyleClass` schema + editor metadata types |
| `styleKeyMeta.ts` | Maps every supported style key to an input type (`color`, `dimension`, `number`, `enum`, `boolean`, `string`) plus bounds/options |
| `useStylesState.ts` | State hook: holds the tree, exposes `setStyleProperty` / `removeStyleProperty` / `addElement` / `addTarget` |
| `mockData.ts` | Sample `StyleContent` (`home`, `add_more` screens) |
| `StyleKeySelector.tsx` | Searchable list used by the "Add Style Property" flow |
| `inputs/*.tsx` | One control per value type (color swatches+hex, slider+px/% toggle, slider+stepper, segmented/chip enum, switch, text) |
| `inputs/StyleValueInput.tsx` | Dispatcher: picks the right control from `StyleKeyMeta.type` |
| `StyleEditorSheet.tsx` | The bottom sheet itself: 3-level navigation (targets → elements → properties) + add-property flow |
| `ExampleUsage.tsx` | Minimal screen wiring a trigger button to the sheet |

## Navigation flow

1. **Targets** (Level 1) — cards for each top-level key in `StyleContent`
   (e.g. `home`, `add_more`).
2. **Elements** (Level 2) — cards for each sub-element under the selected
   target (e.g. `header`, `title`, `footer`).
3. **Properties** (Level 3) — the active style key/value pairs for that
   element, each rendered with its type-specific input, plus an
   **"+ Add Style Property"** button that opens the searchable key
   selector and appends a sensible default value for the chosen key.

The header shows a **‹ Back** button at every level except the top, and
`goBack()` walks the stack down one level at a time.

## Extending style key coverage

Add an entry to `STYLE_KEY_META` in `styleKeyMeta.ts`:

```ts
{ key: "shadowRadius", type: "number", min: 0, max: 20, step: 1 }
```

Any key not listed falls back to a plain string input via
`DEFAULT_STYLE_KEY_META`, so nothing breaks — it just won't get a
specialized control until you add metadata for it.

## Notes / things to decide for production use

- `ColorInput` only validates 3/6/8-digit hex and `"transparent"` — swap
  in a real color-picker library if you want HSB/RGBA sliders.
- `DimensionInput`'s px/% toggle stores the raw RN-compatible value
  (`number` for px, `"50%"` string for percent) so it can be spread
  straight into a `StyleSheet` object.
- `onStylesChange` fires from a `useEffect` keyed on `stylesContent`, so
  it always receives the fully updated tree (never a stale pre-update
  snapshot).












#
#
#

#
#
#
#
#
#



#
t

t

# DIVIDER

#
#
#
#

#
#
#
# \n
\n\n
  
# Dynamic Style Editor (React Native + Bottom Sheet)

A 3-level drill-down editor for a nested `StyleContent` object, built on
`@gorhom/react-native-bottom-sheet`.

## Install dependencies

```bash
npm install @gorhom/react-native-bottom-sheet react-native-reanimated react-native-gesture-handler @react-native-community/slider
```

`react-native-reanimated` and `react-native-gesture-handler` are peer
dependencies of the bottom sheet library — follow their install docs for
your RN version (Babel plugin for reanimated, `GestureHandlerRootView`
wrapping your app root, etc.).

## Files

| File | Purpose |
|---|---|
| `types.ts` | `StyleContent` / `StyleClass` schema + editor metadata types |
| `styleKeyMeta.ts` | Maps every supported style key to an input type (`color`, `dimension`, `number`, `enum`, `boolean`, `string`) plus bounds/options |
| `useStylesState.ts` | State hook: holds the tree, exposes `setStyleProperty` / `removeStyleProperty` / `addElement` / `addTarget` |
| `mockData.ts` | Sample `StyleContent` (`home`, `add_more` screens) |
| `StyleKeySelector.tsx` | Searchable list used by the "Add Style Property" flow |
| `inputs/*.tsx` | One control per value type (color swatches+hex, slider+px/% toggle, slider+stepper, segmented/chip enum, switch, text) |
| `inputs/StyleValueInput.tsx` | Dispatcher: picks the right control from `StyleKeyMeta.type` |
| `StyleEditorSheet.tsx` | The bottom sheet itself: 3-level navigation (targets → elements → properties) + add-property flow |
| `ExampleUsage.tsx` | Minimal screen wiring a trigger button to the sheet |

## Navigation flow

1. **Targets** (Level 1) — cards for each top-level key in `StyleContent`
   (e.g. `home`, `add_more`).
2. **Elements** (Level 2) — cards for each sub-element under the selected
   target (e.g. `header`, `title`, `footer`).
3. **Properties** (Level 3) — the active style key/value pairs for that
   element, each rendered with its type-specific input, plus an
   **"+ Add Style Property"** button that opens the searchable key
   selector and appends a sensible default value for the chosen key.

The header shows a **‹ Back** button at every level except the top, and
`goBack()` walks the stack down one level at a time.

## Extending style key coverage

Add an entry to `STYLE_KEY_META` in `styleKeyMeta.ts`:

```ts
{ key: "shadowRadius", type: "number", min: 0, max: 20, step: 1 }
```

Any key not listed falls back to a plain string input via
`DEFAULT_STYLE_KEY_META`, so nothing breaks — it just won't get a
specialized control until you add metadata for it.

## Notes / things to decide for production use

- `ColorInput` only validates 3/6/8-digit hex and `"transparent"` — swap
  in a real color-picker library if you want HSB/RGBA sliders.
- `DimensionInput`'s px/% toggle stores the raw RN-compatible value
  (`number` for px, `"50%"` string for percent) so it can be spread
  straight into a `StyleSheet` object.
- `onStylesChange` fires from a `useEffect` keyed on `stylesContent`, so
  it always receives the fully updated tree (never a stale pre-update
  snapshot).

  are these two Dynamic styles eidters different