# BandUp QA Checklist

Lightweight browser-based QA checklist tool for BandUp Manual QA.

This repository is separate from the main BandUp application repository. It contains a static HTML, CSS, and vanilla JavaScript app that can run directly in the browser and can be hosted on GitHub Pages.

## Purpose

The tool helps testers record structured manual QA results for BandUp. The first implemented module is Reading, with the data model and UI organized so additional modules can be added later.

Future module areas:

- Dashboard
- Authentication
- Reading
- Listening
- Writing
- Speaking
- Mock Exams
- Profile
- Settings
- AI
- Admin

## How To Use

1. Open `index.html` in a browser or use the GitHub Pages URL.
2. Fill in the test session header:
   - project name
   - module
   - tester
   - date
   - commit/build
   - device
   - browser
   - environment
3. Open each collapsible Reading QA section.
4. Mark each card as Pass, Fail, or Not Tested.
5. Add severity, category, notes, expected behavior, actual behavior, steps to reproduce, recommendation, and workflow status.
6. Export the report as Markdown or printable HTML when finished.

## Screenshot Support

Each QA card supports up to 3 screenshots.

To paste a screenshot:

1. Click inside the screenshot area on the relevant QA card.
2. Copy a screenshot to the clipboard from your operating system.
3. Paste with `Ctrl+V` or `Cmd+V`.

Manual image upload is also supported through the Upload Images button on each card.

Screenshots are previewed in the browser and stored locally with the checklist data where browser storage limits allow.

## Local Persistence

Checklist data is saved automatically in browser `localStorage`.

This means:

- Results persist after refresh.
- Results remain available when reopening the same browser profile.
- Data is local to the browser and device.
- Clearing browser storage removes saved QA data.
- No QA data is sent to a server by this static app.

## Export Options

The app supports:

- Export QA report as Markdown.
- Export printable HTML.
- Browser Print / Save as PDF.

Markdown exports include checklist results, notes, bug details, and screenshot names. Printable HTML exports include embedded screenshot previews where practical.

## GitHub Pages Setup

After the repository is pushed to GitHub:

1. Open the repository on GitHub.
2. Go to Settings.
3. Open Pages.
4. Under Build and deployment, choose Deploy from a branch.
5. Select branch: `main`.
6. Select folder: `/ (root)`.
7. Save.

Expected GitHub Pages URL:

```text
https://fredrock007.github.io/bandup-qa-checklist/
```

## Development

No build step is required.

Files:

- `index.html`
- `styles.css`
- `script.js`
- `README.md`

Run locally by opening `index.html` in a browser.
