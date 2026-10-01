# Project instructions

## Project structure
- apps/expo-app contains the Expo and React Native application.
- apps/server contains the backend.
- packages/shared contains shared code.
- Preserve existing user changes and follow nearby code conventions.

## UI content
- Store new or changed user-facing UI text in:
  apps/expo-app/src/lib/content/content.json
- This includes headings, labels, descriptions, placeholders,
  button text, and user-facing error messages.
- Read content through the existing useContent hook or its helpers.
- Reuse existing content keys when their meaning matches.
- Group new keys by screen or feature using descriptive names.
- Update related content types when necessary.
- Keep JSON valid. Do not add comments.
- Keep internal IDs, API values, and program logic in their
  appropriate code files.
- For bigger groups or pages, make a new helper hook to selector the content from `useContent(selector)` (see hooks/content.hook.ts)

## UI styles

- Store new or changed static application UI styles in `apps/expo-app/src/lib/styles/content.ts`.
- Add styles to the existing `stylesContent` export.
- Group styles by screen or component, then by element.
- Access styles through the existing `useStyleTarget` or `useStyles` hooks.
- Reuse theme values from `apps/expo-app/src/lib/theme.ts` when appropriate.
- Avoid static inline styles or new styling classes in application screens when `stylesContent` can express them.
- Dynamic values may remain in components when they depend on props, animation, or runtime measurements.
- Preserve established variants in reusable UI primitives unless the task specifically requires changing them.
- Connect new content and style keys to their consuming components. Adding entries alone does not complete the change.
- The style structure currently has two levels: a screen or component key, followed by element keys. For example, `const { styles } = useStyleTarget("home")` accesses the `home` group, and `styles.title` accesses its `title` style.
## Logic 
- When adding logic or material could affect other parts of the app, make a test
- IMportant app features should be include as tests

## Test 
 -  Make test by adding .test.ts or test.tsx to the filename, and put them in the test/ folder
 - Put the tests where they belong, shared tests go in shared and so on, expo tests in expo-app and so on.
 - Nofity me if the test lib is not installed or not working properly or if something is missing

## Development log
- After each task that changes repository files, append a short
  entry to dev-log/YYYY-MM-DD.md.
- Use the date in America/Indiana/Indianapolis.
- Create the file if it does not exist; preserve existing entries.
- Record:
  - Task and outcome.
  - Files changed.
  - Important decisions and why.
  - Checks run and their actual results.
  - Remaining issues or follow-up work.
- Record only work performed during the current task.
- Do not include secrets, full chat transcripts, or private reasoning.
- Do not claim a check passed unless it was actually run.

## Verification
- Run checks appropriate to the changed files.
- For content changes, verify valid JSON and that consumers use
  the correct keys.
- For style changes, check keys and React Native style compatibility.
- Run relevant tests for behavior changes.
- Run `npm run test` from the repository root to verify the full test suite. ( alias for chained npm run test:run for each workspace - though currently it just has the server )

Run `npm run test:run --workspace=targetApp`, replacing targetApp with the affected workspace’s package name.

- Report any checks that could not be run and why.
## Imports

- Prefer existing barrel exports, such as `@/hooks`, over direct file imports when available.
- Use direct file imports when needed to avoid circular dependencies or when the barrel does not export the required item.
- Follow nearby import conventions.
## Completion
- Briefly explain what changed, how it was checked, and any
  remaining issues.