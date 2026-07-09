# BandUp QA Manager

BandUp QA Manager is a lightweight browser-based QA management system for BandUp manual testing.

It is intentionally built with static HTML, CSS, and vanilla JavaScript only. There is no framework, no backend, and no build step. The app runs fully in the browser and is compatible with GitHub Pages.

Repository:

```text
https://github.com/fredrock007/bandup-qa-checklist
```

Expected GitHub Pages URL:

```text
https://fredrock007.github.io/bandup-qa-checklist/
```

## Purpose

The original Version 1 app was a Reading QA checklist.

Version 2 evolves it into a small QA management application that supports:

- structured manual QA sessions
- automatic bug IDs
- bug triage
- evidence collection
- developer console output capture
- architect guidance notes
- report export
- local browser persistence
- future module expansion
- future Supabase synchronization without redesigning the UI

## Current Scope

The Reading module is populated with QA data.

The architecture already includes module metadata for future expansion:

- Authentication
- Dashboard
- Reading
- Listening
- Writing
- Speaking
- Mock Exams
- Profile
- Settings
- AI
- Admin

Only Reading is populated in this version.

## Core Features

### QA Session Header

The session header records:

- project name
- module
- tester
- environment
- Git commit
- branch
- version
- build date
- build time
- test date
- test time
- device

The app also detects:

- browser
- operating system
- screen resolution
- viewport size
- timezone
- user agent

### Automatic Bug IDs

When a QA item is marked as Fail, the app automatically assigns a unique bug ID.

Examples:

```text
READ-001
READ-002
READ-003
```

Bug IDs are generated from module prefixes and are not reused once generated in the current browser storage.

Future module prefixes include:

```text
AUTH
DASH
READ
LIST
WRITE
SPEAK
MOCK
PROFILE
SET
AI
ADMIN
```

### Bug Dashboard

The dashboard shows:

- open bugs
- retesting
- closed bugs
- MVP blockers
- critical priority
- high priority
- medium priority
- low priority
- passed tests
- failed tests
- not tested
- overall progress

### Evidence Gallery

Every bug can show up to 3 screenshots.

Screenshots can be:

- pasted from the clipboard
- uploaded manually

The Evidence Gallery displays screenshots grouped by bug ID.

### QA Card Fields

Each QA card includes:

- title
- Pass / Fail / Not Tested
- severity
- priority
- category
- reproducibility
- status
- notes
- expected behaviour
- actual behaviour
- steps to reproduce
- recommendation
- developer console output
- architect recommendation
- possible root cause
- suggested investigation
- suggested files
- screenshot area
- Export Bug action

### Search And Filtering

Bug filtering supports:

- search text
- module
- severity
- priority
- status
- open bugs
- closed bugs
- bug ID search

### Reporting

The app exports:

- full Markdown QA report
- printable HTML QA report
- single-bug Markdown reports
- browser print / save as PDF

Full reports include:

- executive summary
- testing statistics
- bug summary
- detailed findings
- evidence references
- architect notes
- overall recommendation

Single bug exports are designed to be pasted directly into ChatGPT or Codex.

## Screenshot Support

Each QA card supports up to 3 screenshots.

To paste a screenshot:

1. Click inside the screenshot area for the relevant QA card.
2. Copy a screenshot to the clipboard from your operating system.
3. Paste with `Ctrl+V` or `Cmd+V`.

Manual image upload is also supported with the Upload Images button.

Screenshots are stored locally in browser storage where browser limits allow.

## Local Persistence

Data is saved automatically in browser `localStorage`.

This means:

- results persist after refresh
- results remain available when reopening the same browser profile
- data is local to the browser and device
- clearing browser storage removes saved QA data
- no QA data is sent to a server

The storage logic is separated in `script.js` so a future Supabase adapter can be added without redesigning the UI.

## Files

```text
index.html
styles.css
script.js
README.md
```

## Running Locally

No build step is required.

Open `index.html` directly in a browser.

## GitHub Pages Setup

1. Open the repository on GitHub.
2. Go to Settings.
3. Open Pages.
4. Under Build and deployment, choose Deploy from a branch.
5. Select branch: `main`.
6. Select folder: `/ (root)`.
7. Save.

Expected live URL:

```text
https://fredrock007.github.io/bandup-qa-checklist/
```

## Future Enhancements

Recommended next improvements:

- populate the remaining BandUp modules
- add import/export JSON backup
- add optional Supabase synchronization
- add multi-session management
- add shared bug status workflows
- add lightweight release/version metadata import
- add keyboard shortcuts for testers
