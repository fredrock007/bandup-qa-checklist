const STORAGE_KEY = "bandup-qa-checklist-v1";

const categories = [
  "Navigation",
  "Reading Passage",
  "Questions",
  "Submit Answers",
  "Results Screen",
  "AI Reading Explanation Engine",
  "Progress Tracking",
  "Error Handling",
  "UI / UX",
  "Performance",
];

const checklist = [
  {
    section: "Navigation",
    items: [
      "Open the Reading module from Dashboard",
      "Open Reading from primary navigation",
      "Return to Dashboard without losing current Reading state",
      "Verify protected route behavior when logged out",
    ],
  },
  {
    section: "Reading Passage",
    items: [
      "Reading passage loads without layout shift",
      "Passage text is readable on desktop",
      "Passage text is readable on mobile",
      "Instructions are clear before answering",
    ],
  },
  {
    section: "Questions",
    items: [
      "Multiple-choice question displays all options",
      "True / False / Not Given question displays valid choices",
      "Selecting an answer visually updates the card",
      "Changing an answer before submit works correctly",
      "Unanswered questions are clearly identifiable",
    ],
  },
  {
    section: "Submit Answers",
    items: [
      "Submit button is available when an answer is selected",
      "Submitting an answer locks the result state",
      "Static explanation appears after submit",
      "Correct and incorrect answers are clearly distinguished",
      "Final submission shows completion feedback",
    ],
  },
  {
    section: "Results Screen",
    items: [
      "Completion summary is visible after the final Reading question",
      "Questions correct count is accurate",
      "Questions incorrect count is accurate",
      "Percentage score is accurate",
      "Estimated band displays where available",
      "Progress saved confirmation appears",
    ],
  },
  {
    section: "AI Reading Explanation Engine",
    items: [
      "Authenticated user can request AI explanation",
      "Guest user sees clear sign-in message for AI Tutor",
      "Explain more simply returns learner-friendly text",
      "Show another example returns a distinct example",
      "Why isn't my answer correct references the learner answer",
      "Show me where the answer is references passage evidence",
      "Quiz me again returns a usable follow-up question",
      "AI response displays without raw Markdown artifacts",
      "AI fallback does not interrupt static explanation",
    ],
  },
  {
    section: "Progress Tracking",
    items: [
      "Reading answer updates questions answered",
      "Correct answer updates correct count",
      "Incorrect answer updates incorrect count",
      "Reading activity appears in recent activity",
      "Dashboard reflects Reading progress after completion",
      "Progress page reflects Reading progress after completion",
      "Guest progress remains local-only",
      "Authenticated progress persists after refresh",
    ],
  },
  {
    section: "Error Handling",
    items: [
      "Submitting without a selected answer is prevented",
      "AI unavailable state shows friendly message",
      "Network/provider failure keeps static explanation visible",
      "Refresh during Reading does not crash the app",
      "Invalid auth state redirects safely",
    ],
  },
  {
    section: "UI / UX",
    items: [
      "Reading cards use consistent spacing",
      "Buttons have clear active and disabled states",
      "AI Tutor active action is visually clear",
      "Text does not overlap on mobile",
      "Keyboard focus states are visible",
      "No confusing or stale copy appears",
    ],
  },
  {
    section: "Performance",
    items: [
      "Reading route loads quickly on local environment",
      "Answer submission feels responsive",
      "AI loading state is clear",
      "Large pasted screenshots do not break the QA checklist tool",
    ],
  },
];

const defaultState = {
  session: {
    projectName: "BandUp",
    moduleName: "Reading",
    testerName: "",
    testDate: new Date().toISOString().slice(0, 10),
    commitBuild: "",
    deviceName: "",
    browserName: "",
    environmentName: "Local",
  },
  items: {},
};

let state = loadState();
let focusedCardId = null;

document.addEventListener("DOMContentLoaded", () => {
  bindSessionFields();
  renderChecklist();
  updateSummary();
  bindGlobalActions();
});

document.addEventListener("paste", (event) => {
  if (!focusedCardId) return;
  const files = Array.from(event.clipboardData?.files || []).filter((file) =>
    file.type.startsWith("image/"),
  );
  if (!files.length) return;
  event.preventDefault();
  addScreenshots(focusedCardId, files);
});

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return mergeState(defaultState, saved || {});
  } catch {
    return structuredClone(defaultState);
  }
}

function mergeState(base, saved) {
  return {
    session: { ...base.session, ...(saved.session || {}) },
    items: { ...(saved.items || {}) },
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  const saveStateElement = document.getElementById("saveState");
  saveStateElement.textContent = "Saved locally";
  saveStateElement.classList.remove("unsaved");
}

function getItemState(id) {
  if (!state.items[id]) {
    state.items[id] = {
      result: "Not Tested",
      severity: "",
      category: "",
      workStatus: "Open",
      notes: "",
      expected: "",
      actual: "",
      steps: "",
      recommendation: "",
      screenshots: [],
    };
  }
  return state.items[id];
}

function bindSessionFields() {
  Object.entries(state.session).forEach(([field, value]) => {
    const input = document.getElementById(field);
    if (!input) return;
    input.value = value;
    input.addEventListener("input", () => {
      state.session[field] = input.value;
      saveState();
    });
  });
}

function renderChecklist() {
  const container = document.getElementById("checklist");
  const template = document.getElementById("cardTemplate");
  container.innerHTML = "";

  checklist.forEach((section, sectionIndex) => {
    const details = document.createElement("details");
    details.className = "module-section";
    details.open = sectionIndex === 0;

    const summary = document.createElement("summary");
    summary.innerHTML = `<h2>${escapeHtml(section.section)}</h2><span>${section.items.length} tests</span>`;
    details.appendChild(summary);

    const cards = document.createElement("div");
    cards.className = "section-cards";

    section.items.forEach((title, itemIndex) => {
      const id = createItemId(section.section, itemIndex);
      const itemState = getItemState(id);
      if (!itemState.category) itemState.category = section.section;

      const card = template.content.firstElementChild.cloneNode(true);
      card.dataset.id = id;
      card.querySelector("h3").textContent = title;

      card.addEventListener("focusin", () => {
        focusedCardId = id;
      });

      card.querySelectorAll("[data-status-button]").forEach((button) => {
        button.classList.toggle("active", button.dataset.statusButton === itemState.result);
        button.addEventListener("click", () => {
          itemState.result = button.dataset.statusButton;
          card
            .querySelectorAll("[data-status-button]")
            .forEach((current) =>
              current.classList.toggle(
                "active",
                current.dataset.statusButton === itemState.result,
              ),
            );
          saveState();
          updateSummary();
        });
      });

      card.querySelectorAll("[data-field]").forEach((field) => {
        const name = field.dataset.field;
        if (name === "screenshots") {
          field.addEventListener("change", () => addScreenshots(id, Array.from(field.files || [])));
          return;
        }

        if (name === "category") {
          field.innerHTML = categories
            .map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
            .join("");
        }

        field.value = itemState[name] || "";
        field.addEventListener("input", () => {
          itemState[name] = field.value;
          saveState();
          updateSummary();
        });
      });

      renderScreenshots(card, id);
      cards.appendChild(card);
    });

    details.appendChild(cards);
    container.appendChild(details);
  });

  saveState();
}

function createItemId(section, index) {
  return `${section.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`;
}

async function addScreenshots(itemId, files) {
  const item = getItemState(itemId);
  const availableSlots = 3 - item.screenshots.length;

  if (availableSlots <= 0) {
    showToast("Maximum 3 screenshots per card.");
    return;
  }

  const selectedFiles = files.slice(0, availableSlots);
  const images = await Promise.all(selectedFiles.map(fileToDataUrl));

  images.forEach((image, index) => {
    item.screenshots.push({
      name: selectedFiles[index].name || `Pasted screenshot ${item.screenshots.length + 1}`,
      dataUrl: image,
      createdAt: new Date().toISOString(),
    });
  });

  saveState();
  renderChecklist();
  updateSummary();
  showToast("Screenshot saved locally.");
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function renderScreenshots(card, itemId) {
  const item = getItemState(itemId);
  const preview = card.querySelector(".screenshot-preview");
  preview.innerHTML = "";

  item.screenshots.forEach((screenshot, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "screenshot";
    wrapper.innerHTML = `
      <img src="${screenshot.dataUrl}" alt="Screenshot ${index + 1}" />
      <div class="screenshot-footer">
        <span>${escapeHtml(screenshot.name)}</span>
        <button type="button">Remove</button>
      </div>
    `;
    wrapper.querySelector("button").addEventListener("click", () => {
      item.screenshots.splice(index, 1);
      saveState();
      renderChecklist();
      updateSummary();
    });
    preview.appendChild(wrapper);
  });
}

function updateSummary() {
  const allItems = checklist.flatMap((section) =>
    section.items.map((_, index) => getItemState(createItemId(section.section, index))),
  );
  const total = allItems.length;
  const passed = allItems.filter((item) => item.result === "Pass").length;
  const failed = allItems.filter((item) => item.result === "Fail").length;
  const notTested = allItems.filter((item) => item.result === "Not Tested").length;
  const blockers = allItems.filter((item) => item.severity === "MVP Blocker").length;
  const bugs = allItems.filter((item) => item.severity === "Bug").length;
  const ux = allItems.filter((item) => item.severity === "UX Improvement").length;
  const post = allItems.filter((item) => item.severity === "Post-MVP Enhancement").length;
  const progress = total ? Math.round(((passed + failed) / total) * 100) : 0;

  setText("totalTests", total);
  setText("passedTests", passed);
  setText("failedTests", failed);
  setText("notTestedTests", notTested);
  setText("blockerCount", blockers);
  setText("bugCount", bugs);
  setText("uxCount", ux);
  setText("postMvpCount", post);
  setText("progressPercent", `${progress}%`);
  document.getElementById("progressBar").style.width = `${progress}%`;
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function bindGlobalActions() {
  document.getElementById("exportMarkdown").addEventListener("click", exportMarkdown);
  document.getElementById("exportHtml").addEventListener("click", exportHtml);
  document.getElementById("printReport").addEventListener("click", () => window.print());
  document.getElementById("resetAll").addEventListener("click", () => {
    const confirmed = window.confirm("Reset all QA checklist data stored in this browser?");
    if (!confirmed) return;
    localStorage.removeItem(STORAGE_KEY);
    state = structuredClone(defaultState);
    bindSessionFields();
    renderChecklist();
    updateSummary();
    showToast("Checklist reset.");
  });
}

function exportMarkdown() {
  const markdown = buildMarkdownReport();
  downloadFile("bandup-reading-qa-report.md", markdown, "text/markdown");
}

function exportHtml() {
  const html = buildPrintableHtml();
  downloadFile("bandup-reading-qa-report.html", html, "text/html");
}

function buildMarkdownReport() {
  const lines = [
    "# BandUp Reading QA Report",
    "",
    `- Project: ${state.session.projectName}`,
    `- Module: ${state.session.moduleName}`,
    `- Tester: ${state.session.testerName || "Not specified"}`,
    `- Date: ${state.session.testDate || "Not specified"}`,
    `- Commit / build: ${state.session.commitBuild || "Not specified"}`,
    `- Device: ${state.session.deviceName || "Not specified"}`,
    `- Browser: ${state.session.browserName || "Not specified"}`,
    `- Environment: ${state.session.environmentName}`,
    "",
    "## Summary",
    "",
    `- Progress: ${document.getElementById("progressPercent").textContent}`,
    `- Total tests: ${document.getElementById("totalTests").textContent}`,
    `- Passed: ${document.getElementById("passedTests").textContent}`,
    `- Failed: ${document.getElementById("failedTests").textContent}`,
    `- Not tested: ${document.getElementById("notTestedTests").textContent}`,
    `- MVP Blockers: ${document.getElementById("blockerCount").textContent}`,
    `- Bugs: ${document.getElementById("bugCount").textContent}`,
    `- UX Improvements: ${document.getElementById("uxCount").textContent}`,
    `- Post-MVP Enhancements: ${document.getElementById("postMvpCount").textContent}`,
    "",
  ];

  checklist.forEach((section) => {
    lines.push(`## ${section.section}`, "");
    section.items.forEach((title, index) => {
      const item = getItemState(createItemId(section.section, index));
      lines.push(`### ${title}`);
      lines.push("");
      lines.push(`- Result: ${item.result}`);
      lines.push(`- Severity: ${item.severity || "Not selected"}`);
      lines.push(`- Category: ${item.category || section.section}`);
      lines.push(`- Status: ${item.workStatus}`);
      lines.push("");
      addMarkdownField(lines, "Notes", item.notes);
      addMarkdownField(lines, "Expected behaviour", item.expected);
      addMarkdownField(lines, "Actual behaviour", item.actual);
      addMarkdownField(lines, "Steps to reproduce", item.steps);
      addMarkdownField(lines, "Recommendation", item.recommendation);
      if (item.screenshots.length) {
        lines.push("Screenshots:");
        item.screenshots.forEach((screenshot, screenshotIndex) => {
          lines.push(`- Screenshot ${screenshotIndex + 1}: ${screenshot.name}`);
        });
        lines.push("");
      }
    });
  });

  return lines.join("\n");
}

function addMarkdownField(lines, label, value) {
  if (!value) return;
  lines.push(`${label}:`);
  lines.push("");
  lines.push(value);
  lines.push("");
}

function buildPrintableHtml() {
  const body = buildMarkdownReport()
    .split("\n")
    .map((line) => {
      if (line.startsWith("# ")) return `<h1>${escapeHtml(line.slice(2))}</h1>`;
      if (line.startsWith("## ")) return `<h2>${escapeHtml(line.slice(3))}</h2>`;
      if (line.startsWith("### ")) return `<h3>${escapeHtml(line.slice(4))}</h3>`;
      if (line.startsWith("- ")) return `<li>${escapeHtml(line.slice(2))}</li>`;
      return line ? `<p>${escapeHtml(line)}</p>` : "";
    })
    .join("\n");

  const screenshots = checklist
    .flatMap((section) =>
      section.items.flatMap((_, index) =>
        getItemState(createItemId(section.section, index)).screenshots.map(
          (screenshot) =>
            `<figure><img src="${screenshot.dataUrl}" alt="${escapeHtml(
              screenshot.name,
            )}" /><figcaption>${escapeHtml(screenshot.name)}</figcaption></figure>`,
        ),
      ),
    )
    .join("");

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>BandUp Reading QA Report</title>
  <style>
    body { font-family: Arial, sans-serif; color: #172033; line-height: 1.5; margin: 32px; }
    h1, h2, h3 { line-height: 1.2; }
    li { margin: 4px 0; }
    figure { break-inside: avoid; border: 1px solid #d9e1ec; padding: 12px; margin: 16px 0; }
    img { max-width: 100%; height: auto; }
    figcaption { color: #62708a; margin-top: 8px; }
  </style>
</head>
<body>
${body}
${screenshots ? `<h2>Screenshot Previews</h2>${screenshots}` : ""}
</body>
</html>`;
}

function downloadFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function showToast(message) {
  const existing = document.querySelector(".toast");
  existing?.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2300);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
