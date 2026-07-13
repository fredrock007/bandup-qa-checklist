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

Version 4 refines the release candidate around a Founder-first testing experience.

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

Version 3 refines it into an Engineering Workspace with scoped bug actions, selected-bug handoff, JSON session backup/restore, and release decision reports.

Version 4 keeps the engineering power but changes the default experience:

- Testing Mode is the default.
- The Founder starts with "What would you like to test?"
- Checklist items are plain English.
- Passing a test is just ticking a checkbox.
- Problem details appear only after clicking Report Problem.
- Engineering tools are hidden until the Engineering Workspace is opened.

## Current Scope

All current QA Manager modules are populated with guided QA data:

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

Module completion is derived from the persisted checklist results in the tester's browser. A module is marked complete only when every checklist item has a recorded result.

## Core Features

### Testing Mode

Testing Mode is where most QA work should happen.

The default screen shows:

- module selection
- simple progress
- tester/device/environment fields
- collapsible checklist sections

Each checklist item shows only:

- checkbox
- plain-English test description
- optional note
- optional screenshot
- Report Problem

When a problem is reported, the detailed bug fields appear.

This keeps normal testing calm and focused while preserving the full engineering workflow.

### Engineering Workspace

The Engineering Workspace is used after testing or when reviewing failures.

It contains:

- build/session metadata
- environment details
- bug dashboard
- report generators
- documentation generators
- Codex task generators
- GitHub Markdown generators
- JSON backup and restore
- bug triage
- evidence gallery

### QA Session Header

The session and workspace metadata records:

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

Testing Mode also includes an explicit QA timer:

- Start begins active timing for the current QA session, current module, and overall project time.
- Pause stops active timing without clearing data.
- New QA Session resets the current session/module timer and creates a new export boundary while keeping existing bugs and evidence.

The timer measures active testing time only. It does not infer testing duration from how long the browser tab or saved project has existed.

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

- open or active bugs
- fixed bugs awaiting Founder verification
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

Checklist sections remember their expanded or collapsed state while testing. Normal actions such as ticking a checkbox, adding notes, reporting a problem, editing fields, or attaching screenshots should not collapse the active section.

### Search And Filtering

Bug filtering supports:

- search text
- module
- severity
- priority
- status
- active bugs
- closed bugs
- archived bugs
- bug ID search

Lifecycle states are:

- Open
- In Progress
- Fixed
- Verified
- Closed

Fixed issues are not automatically verified or closed. Fred must manually retest and mark them Verified before they are closed.

Archived bugs are retained for history but removed from normal active views. They can still be viewed and exported using the Archived filter or Entire project history export scope.

### Engineering Workspace Exports

The Engineering Workspace turns QA sessions into engineering artifacts without modifying project files.

Workspace sections:

- QA Reports
- Engineering Documentation
- AI Tasks
- GitHub
- Backup & Restore

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
- scoped bugs report
- release recommendation
- architect review
- Codex task handoff document

The QA Manager never overwrites engineering documentation. It generates proposed Markdown that Codex can review before updating the BandUp repository.

Export scope controls are available for engineering handoff:

- Current QA session
- Open bugs
- Current module
- Entire project history

Current QA session is the default so historical bugs are not accidentally included in a new Codex task.

### Per-Bug Actions

Every bug card supports scoped actions for that specific bug:

- Export Bug
- Prepare Codex Task
- Generate Architect Review
- Generate GitHub Issue

These actions include only the selected bug and never unrelated bugs.

### Multi-Select Bug Actions

The bug triage list supports checkbox selection.

Selected-bug actions include:

- Prepare Selected Codex Task
- Generate Selected Architect Review
- Export Selected Bugs
- Generate GitHub Issues

If no bugs are selected, workspace-level actions use the selected export scope.

### Single Bug Export

Single bug exports are designed to be pasted directly into ChatGPT, Codex, or GitHub.

Each single bug export includes:

- bug ID
- title
- module
- section
- severity
- priority
- reproducibility
- status
- founder notes
- expected behaviour
- actual behaviour
- steps to reproduce
- recommendation
- developer console output
- architect recommendation
- possible root cause
- suggested investigation
- suggested files
- screenshot references
- timestamp
- architect notes
- evidence references
- timestamp

### Codex Task Export

Prepare Codex Task generates a Markdown task document for the selected export scope.

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

Generated Markdown remains editable in the Engineering Workspace. Copy, Maximise, and Download use the current edited text, and Clear Generated Markdown removes only that output.

### Release Recommendation

Generate Release Recommendation produces an executive release decision:

- Ready
- Conditionally Ready
- Not Ready

It includes reasons, statistics, remaining risks, outstanding MVP blockers, critical bugs, high-priority bugs, architect recommendation, and overall recommendation.

### Architect Review

Generate Architect Review analyses QA findings for the Principal Software Architect.

It identifies:

- recurring patterns
- likely root causes
- architectural observations
- potential affected components
- suggested investigation areas
- suggested implementation strategy
- risks

### GitHub Markdown Generators

The GitHub section generates Markdown only. It does not call GitHub APIs.

Available generators:

- GitHub Issue
- GitHub Issues
- Pull Request Description
- Release Notes
- Changelog Entry

### JSON Session Backup And Restore

The Backup & Restore section supports:

- Export Session `.json`
- Import Session `.json`

The session backup includes:

- session metadata
- test results
- notes
- screenshots
- bug IDs
- progress
- architect notes
- developer console output
- local counters
- selected bug IDs

Importing a session completely restores the QA Manager state in the browser.

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

Checklist and Evidence Gallery previews support Edit, Maximise, Download, and Delete. Screenshot edits and deletions are saved against the selected QA item without collapsing its active section.

## Local Persistence

Data is saved automatically in browser `localStorage`.

This means:

- results persist after refresh
- results remain available when reopening the same browser profile
- data is local to the browser and device
- clearing browser storage removes saved QA data
- no QA data is sent to a server

QA item identities are stable across modules and refreshes. Active QA timer state, bug records, screenshots, and generated output are persisted locally.

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

## Release Candidate Status

Version 4 is intended to be the final planned UX milestone before production use.

Future changes should be driven by real QA usage and confirmed defects, not speculative feature expansion.

Recommended operating rule:

- Use the app for BandUp Reading, Listening, and Writing QA.
- Export session JSON at the end of meaningful QA sessions.
- Use generated Markdown as proposed documentation only.
- Let Codex review and apply generated documentation to the main BandUp repository.

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
