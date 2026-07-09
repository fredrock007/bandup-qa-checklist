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
- engineering documentation and developer handover exports
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

### Export Centre

The Export Centre turns QA sessions into engineering artifacts without modifying project files.

Session report exports:

- full Markdown QA report
- printable HTML QA report
- browser print / save as PDF

Full reports include:

- executive summary
- testing statistics
- bug summary
- detailed findings
- evidence references
- architect notes
- overall recommendation

Engineering documentation exports:

- generated `PROJECT_STATUS.md` update section
- generated `NEXT_DEVELOPMENT_SPRINT.md` update section
- QA executive summary for the Founder and Principal Software Architect
- unresolved bugs-only report
- Codex task handoff document

The QA Manager never overwrites engineering documentation. It generates proposed Markdown that Codex can review before updating the BandUp repository.

### Single Bug Export

Single bug exports are designed to be pasted directly into ChatGPT or Codex.

Each single bug export includes:

- bug ID
- title
- module
- severity
- priority
- reproducibility
- status
- expected behaviour
- actual behaviour
- steps to reproduce
- developer console output
- architect notes
- evidence references
- timestamp

### Codex Task Export

Prepare Codex Task generates a Markdown task document for unresolved issues.

The generated task includes:

- bug ID
- module
- severity
- priority
- expected behaviour
- actual behaviour
- steps to reproduce
- developer console output
- architect recommendation
- possible root cause
- suggested investigation
- suggested files
- screenshot references
- acceptance criteria

It ends with the required BandUp engineering instruction:

```text
Please investigate the root cause, propose the smallest safe implementation, verify the fix, update all relevant documentation, commit, push, and synchronize the Google Drive workspace if documentation changes.
```

### Export Governance

The QA Manager is the primary browser-side source of truth for manual QA sessions, but it does not replace the BandUp engineering authority hierarchy.

Generated documentation must still be reviewed by:

1. Founder
2. Principal Software Architect
3. Lead Software Engineer / Codex

Codex remains responsible for:

- reviewing generated documentation
- updating `PROJECT_STATUS.md`
- updating `NEXT_DEVELOPMENT_SPRINT.md`
- updating the EKB where appropriate
- committing changes
- pushing to GitHub
- synchronizing the Google Drive workspace when documentation changes

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

## Architecture Notes

The app remains intentionally small:

- static HTML
- CSS
- vanilla JavaScript
- no framework
- no backend
- no build step
- GitHub Pages compatible

`script.js` keeps the main responsibilities separated:

- data definitions
- storage adapter
- QA state helpers
- rendering
- export generation
- environment detection
- utilities

The export layer is designed so future AI-assisted actions can be added without redesigning the app.

Possible future generated actions:

- Generate Architect Review
- Generate Release Notes
- Generate GitHub Issue
- Generate Pull Request Summary
- Generate Test Completion Report

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
- add optional AI-generated architect review exports
- add GitHub issue export templates
