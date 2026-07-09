const APP_VERSION = "2.0.0";
const STORAGE_KEY = "bandup-qa-manager-v2";

const MODULES = [
  { key: "authentication", name: "Authentication", prefix: "AUTH", populated: false },
  { key: "dashboard", name: "Dashboard", prefix: "DASH", populated: false },
  { key: "reading", name: "Reading", prefix: "READ", populated: true },
  { key: "listening", name: "Listening", prefix: "LIST", populated: false },
  { key: "writing", name: "Writing", prefix: "WRITE", populated: false },
  { key: "speaking", name: "Speaking", prefix: "SPEAK", populated: false },
  { key: "mock-exams", name: "Mock Exams", prefix: "MOCK", populated: false },
  { key: "profile", name: "Profile", prefix: "PROFILE", populated: false },
  { key: "settings", name: "Settings", prefix: "SET", populated: false },
  { key: "ai", name: "AI", prefix: "AI", populated: false },
  { key: "admin", name: "Admin", prefix: "ADMIN", populated: false },
];

const SEVERITIES = ["MVP Blocker", "Bug", "UX Improvement", "Post-MVP Enhancement"];
const PRIORITIES = ["Critical", "High", "Medium", "Low"];
const WORK_STATUSES = ["Open", "In Progress", "Fixed", "Retest Required", "Closed"];
const BUG_CLOSED_STATUSES = new Set(["Closed"]);
const BUG_OPEN_STATUSES = new Set(["Open", "In Progress", "Fixed", "Retest Required"]);

const QA_DATA = {
  reading: [
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
        "Large pasted screenshots do not break the QA Manager",
      ],
    },
  ],
};

const Utils = {
  clone(value) {
    return JSON.parse(JSON.stringify(value));
  },

  slug(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  },

  pad(value) {
    return String(value).padStart(2, "0");
  },

  bugNumber(value) {
    return String(value).padStart(3, "0");
  },

  escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  detectBrowser() {
    const ua = navigator.userAgent;
    if (ua.includes("Edg/")) return "Microsoft Edge";
    if (ua.includes("Chrome/") && !ua.includes("Chromium")) return "Chrome";
    if (ua.includes("Firefox/")) return "Firefox";
    if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
    return "Unknown browser";
  },

  detectOperatingSystem() {
    const ua = navigator.userAgent;
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac OS")) return "macOS";
    if (ua.includes("Android")) return "Android";
    if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
    if (ua.includes("Linux")) return "Linux";
    return "Unknown OS";
  },

  nowParts() {
    const date = new Date();
    return {
      date: date.toISOString().slice(0, 10),
      time: `${Utils.pad(date.getHours())}:${Utils.pad(date.getMinutes())}`,
      iso: date.toISOString(),
    };
  },

  download(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  },

  toast(message) {
    document.querySelector(".toast")?.remove();
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 2300);
  },
};

const Storage = {
  adapterName: "localStorage",

  defaultState() {
    const now = Utils.nowParts();
    return {
      schemaVersion: 2,
      appVersion: APP_VERSION,
      session: {
        projectName: "BandUp",
        moduleName: "reading",
        testerName: "",
        environmentName: "Local",
        gitCommit: "",
        branchName: "",
        versionName: "",
        buildDate: now.date,
        buildTime: now.time,
        testDate: now.date,
        testTime: now.time,
        deviceName: "",
        browserName: "",
        operatingSystem: "",
        screenResolution: "",
        viewportSize: "",
        timezoneName: "",
        userAgent: "",
      },
      counters: {},
      items: {},
    };
  },

  load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return this.merge(this.defaultState(), saved || {});
    } catch {
      return this.defaultState();
    }
  },

  save(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  },

  reset() {
    localStorage.removeItem(STORAGE_KEY);
  },

  merge(base, saved) {
    return {
      ...base,
      ...saved,
      session: { ...base.session, ...(saved.session || {}) },
      counters: { ...base.counters, ...(saved.counters || {}) },
      items: { ...(saved.items || {}) },
    };
  },
};

let state = Storage.load();
let focusedCardId = null;

const QAState = {
  getCurrentModule() {
    return MODULES.find((module) => module.key === state.session.moduleName) || MODULES[2];
  },

  getSections(moduleKey = state.session.moduleName) {
    return QA_DATA[moduleKey] || [];
  },

  getAllChecklistEntries(moduleKey = state.session.moduleName) {
    return this.getSections(moduleKey).flatMap((section) =>
      section.items.map((title, index) => ({
        id: this.createItemId(moduleKey, section.section, index),
        moduleKey,
        moduleName: MODULES.find((module) => module.key === moduleKey)?.name || moduleKey,
        section: section.section,
        title,
      })),
    );
  },

  createItemId(moduleKey, section, index) {
    return `${moduleKey}:${Utils.slug(section)}:${index}`;
  },

  getItem(id, defaults = {}) {
    if (!state.items[id]) {
      state.items[id] = {
        result: "Not Tested",
        bugId: "",
        severity: "",
        priority: "",
        category: defaults.section || "",
        reproducibility: "",
        workStatus: "Open",
        notes: "",
        expected: "",
        actual: "",
        steps: "",
        recommendation: "",
        developerConsole: "",
        architectRecommendation: "",
        possibleRootCause: "",
        suggestedInvestigation: "",
        suggestedFiles: "",
        screenshots: [],
        createdAt: "",
        updatedAt: "",
      };
    }
    return state.items[id];
  },

  assignBugId(item, moduleKey) {
    if (item.bugId) return item.bugId;
    const module = MODULES.find((entry) => entry.key === moduleKey) || MODULES[2];
    const current = state.counters[module.prefix] || 0;
    const next = current + 1;
    state.counters[module.prefix] = next;
    item.bugId = `${module.prefix}-${Utils.bugNumber(next)}`;
    item.createdAt = item.createdAt || new Date().toISOString();
    return item.bugId;
  },

  setResult(item, moduleKey, result) {
    item.result = result;
    item.updatedAt = new Date().toISOString();
    if (result === "Fail") {
      this.assignBugId(item, moduleKey);
      if (!item.severity) item.severity = "Bug";
      if (!item.priority) item.priority = "Medium";
      if (!item.reproducibility) item.reproducibility = "Always";
      if (!item.workStatus) item.workStatus = "Open";
    }
  },

  getBugs() {
    const entries = MODULES.flatMap((module) =>
      this.getAllChecklistEntries(module.key).map((entry) => ({ ...entry, module })),
    );

    return entries
      .map((entry) => ({ ...entry, item: this.getItem(entry.id, entry) }))
      .filter(({ item }) => item.bugId)
      .sort((a, b) => a.item.bugId.localeCompare(b.item.bugId));
  },

  getStats() {
    const entries = this.getAllChecklistEntries();
    const items = entries.map((entry) => this.getItem(entry.id, entry));
    const bugs = this.getBugs();
    const total = items.length;
    const passed = items.filter((item) => item.result === "Pass").length;
    const failed = items.filter((item) => item.result === "Fail").length;
    const notTested = items.filter((item) => item.result === "Not Tested").length;
    const completed = passed + failed;
    return {
      total,
      passed,
      failed,
      notTested,
      progress: total ? Math.round((completed / total) * 100) : 0,
      bugs,
      openBugs: bugs.filter(({ item }) => BUG_OPEN_STATUSES.has(item.workStatus)).length,
      retesting: bugs.filter(({ item }) => item.workStatus === "Retest Required").length,
      closed: bugs.filter(({ item }) => BUG_CLOSED_STATUSES.has(item.workStatus)).length,
      mvpBlockers: bugs.filter(({ item }) => item.severity === "MVP Blocker").length,
      critical: bugs.filter(({ item }) => item.priority === "Critical").length,
      high: bugs.filter(({ item }) => item.priority === "High").length,
      medium: bugs.filter(({ item }) => item.priority === "Medium").length,
      low: bugs.filter(({ item }) => item.priority === "Low").length,
    };
  },

  sectionStats(section) {
    const moduleKey = state.session.moduleName;
    const items = section.items.map((_, index) =>
      this.getItem(this.createItemId(moduleKey, section.section, index), {
        section: section.section,
      }),
    );
    const total = items.length;
    const completed = items.filter((item) => item.result !== "Not Tested").length;
    return {
      total,
      completed,
      progress: total ? Math.round((completed / total) * 100) : 0,
    };
  },
};

const Environment = {
  detect() {
    return {
      browserName: Utils.detectBrowser(),
      operatingSystem: Utils.detectOperatingSystem(),
      screenResolution: `${window.screen.width} x ${window.screen.height}`,
      viewportSize: `${window.innerWidth} x ${window.innerHeight}`,
      timezoneName: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown timezone",
      userAgent: navigator.userAgent,
    };
  },

  refresh() {
    state.session = { ...state.session, ...this.detect() };
    persistAndRender();
  },
};

const Renderer = {
  init() {
    this.renderModuleOptions();
    this.renderFilterOptions();
    this.bindSessionFields();
    this.bindGlobalActions();
    this.renderAll();
  },

  renderAll() {
    this.renderSessionFields();
    this.renderChecklist();
    this.renderDashboard();
    this.renderSectionProgress();
    this.renderBugList();
    this.renderEvidenceGallery();
  },

  renderModuleOptions() {
    const select = document.getElementById("moduleName");
    select.innerHTML = MODULES.map(
      (module) =>
        `<option value="${module.key}">${Utils.escapeHtml(module.name)}${
          module.populated ? "" : " (coming later)"
        }</option>`,
    ).join("");
  },

  renderFilterOptions() {
    fillSelect("filterModule", ["All modules", ...MODULES.map((module) => module.name)], [
      "",
      ...MODULES.map((module) => module.key),
    ]);
    fillSelect("filterSeverity", ["All severities", ...SEVERITIES], ["", ...SEVERITIES]);
    fillSelect("filterPriority", ["All priorities", ...PRIORITIES], ["", ...PRIORITIES]);
    fillSelect("filterStatus", ["All statuses", ...WORK_STATUSES], ["", ...WORK_STATUSES]);
  },

  bindSessionFields() {
    Object.keys(state.session).forEach((field) => {
      const input = document.getElementById(field);
      if (!input || input.readOnly) return;
      input.addEventListener("input", () => {
        state.session[field] = input.value;
        if (field === "moduleName") {
          this.renderAll();
        }
        persist();
      });
    });
  },

  renderSessionFields() {
    Object.entries(state.session).forEach(([field, value]) => {
      const input = document.getElementById(field);
      if (!input) return;
      input.value = value || "";
    });
  },

  bindGlobalActions() {
    document.getElementById("exportMarkdown").addEventListener("click", () => {
      Utils.download("bandup-qa-report.md", Exporter.buildMarkdownReport(), "text/markdown");
    });
    document.getElementById("exportHtml").addEventListener("click", () => {
      Utils.download("bandup-qa-report.html", Exporter.buildHtmlReport(), "text/html");
    });
    document.getElementById("printReport").addEventListener("click", () => {
      const html = Exporter.buildHtmlReport();
      const reportWindow = window.open("", "_blank");
      reportWindow.document.write(html);
      reportWindow.document.close();
      reportWindow.focus();
      reportWindow.print();
    });
    document.getElementById("resetAll").addEventListener("click", () => {
      const confirmed = window.confirm("Reset all QA Manager data stored in this browser?");
      if (!confirmed) return;
      Storage.reset();
      state = Storage.defaultState();
      Environment.refresh();
      Utils.toast("QA Manager reset.");
    });
    document.getElementById("refreshDetection").addEventListener("click", () => {
      Environment.refresh();
      Utils.toast("Environment detection refreshed.");
    });

    ["bugSearch", "filterModule", "filterSeverity", "filterPriority", "filterStatus", "filterBugState"]
      .forEach((id) => document.getElementById(id).addEventListener("input", () => {
        this.renderBugList();
      }));
  },

  renderChecklist() {
    const module = QAState.getCurrentModule();
    const sections = QAState.getSections(module.key);
    const container = document.getElementById("checklist");
    const template = document.getElementById("cardTemplate");
    container.innerHTML = "";

    if (!sections.length) {
      container.innerHTML = `
        <section class="module-section empty-module">
          <div class="empty-state">
            <p class="eyebrow">Future Module</p>
            <h2>${Utils.escapeHtml(module.name)} QA data has not been populated yet.</h2>
            <p>This module is part of the future QA Manager structure. Reading is currently populated.</p>
          </div>
        </section>
      `;
      return;
    }

    sections.forEach((section, sectionIndex) => {
      const details = document.createElement("details");
      details.className = "module-section";
      details.open = sectionIndex === 0;

      const summary = document.createElement("summary");
      const stats = QAState.sectionStats(section);
      summary.innerHTML = `
        <div>
          <h2>${Utils.escapeHtml(section.section)}</h2>
          <span>${stats.completed}/${stats.total} complete</span>
        </div>
        <strong>${stats.progress}%</strong>
      `;
      details.appendChild(summary);

      const cards = document.createElement("div");
      cards.className = "section-cards";

      section.items.forEach((title, index) => {
        const entry = {
          id: QAState.createItemId(module.key, section.section, index),
          moduleKey: module.key,
          moduleName: module.name,
          section: section.section,
          title,
        };
        const item = QAState.getItem(entry.id, entry);
        const card = template.content.firstElementChild.cloneNode(true);
        card.dataset.id = entry.id;
        card.querySelector("h3").textContent = title;
        this.renderBugId(card, item);

        card.addEventListener("focusin", () => {
          focusedCardId = entry.id;
        });

        card.querySelector('[data-action="export-bug"]').addEventListener("click", () => {
          if (!item.bugId) {
            Utils.toast("Mark this test as Fail before exporting a bug.");
            return;
          }
          Utils.download(
            `${item.bugId}.md`,
            Exporter.buildSingleBugReport(entry, item),
            "text/markdown",
          );
        });

        card.querySelectorAll("[data-status-button]").forEach((button) => {
          button.classList.toggle("active", button.dataset.statusButton === item.result);
          button.addEventListener("click", () => {
            QAState.setResult(item, module.key, button.dataset.statusButton);
            persistAndRender();
          });
        });

        card.querySelectorAll("[data-field]").forEach((field) => {
          const name = field.dataset.field;
          if (name === "screenshots") {
            field.addEventListener("change", () => addScreenshots(entry.id, Array.from(field.files || [])));
            return;
          }
          if (name === "category") {
            field.innerHTML = categoriesForCurrentModule()
              .map((category) => `<option value="${Utils.escapeHtml(category)}">${Utils.escapeHtml(category)}</option>`)
              .join("");
          }
          field.value = item[name] || "";
          field.addEventListener("input", () => {
            item[name] = field.value;
            item.updatedAt = new Date().toISOString();
            persistAndRender({ skipChecklist: true });
          });
        });

        this.renderScreenshots(card, entry.id);
        cards.appendChild(card);
      });

      details.appendChild(cards);
      container.appendChild(details);
    });
  },

  renderBugId(card, item) {
    const bugId = card.querySelector("[data-bug-id]");
    bugId.textContent = item.bugId ? `Bug ID: ${item.bugId}` : "No bug ID assigned";
    bugId.classList.toggle("assigned", Boolean(item.bugId));
  },

  renderScreenshots(card, itemId) {
    const item = QAState.getItem(itemId);
    const preview = card.querySelector(".screenshot-preview");
    preview.innerHTML = "";
    item.screenshots.forEach((screenshot, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "screenshot";
      wrapper.innerHTML = `
        <img src="${screenshot.dataUrl}" alt="Screenshot ${index + 1}" />
        <div class="screenshot-footer">
          <span>${Utils.escapeHtml(screenshot.name)}</span>
          <button type="button">Remove</button>
        </div>
      `;
      wrapper.querySelector("button").addEventListener("click", () => {
        item.screenshots.splice(index, 1);
        item.updatedAt = new Date().toISOString();
        persistAndRender();
      });
      preview.appendChild(wrapper);
    });
  },

  renderDashboard() {
    const stats = QAState.getStats();
    setText("overallProgress", `${stats.progress}%`);
    document.getElementById("overallProgressBar").style.width = `${stats.progress}%`;
    setText("openBugs", stats.openBugs);
    setText("retestingBugs", stats.retesting);
    setText("closedBugs", stats.closed);
    setText("mvpBlockers", stats.mvpBlockers);
    setText("criticalPriority", stats.critical);
    setText("highPriority", stats.high);
    setText("mediumPriority", stats.medium);
    setText("lowPriority", stats.low);
    setText("passedTests", stats.passed);
    setText("failedTests", stats.failed);
    setText("notTestedTests", stats.notTested);
  },

  renderSectionProgress() {
    const container = document.getElementById("sectionProgress");
    container.innerHTML = QAState.getSections()
      .map((section) => {
        const stats = QAState.sectionStats(section);
        return `
          <article class="section-progress-card">
            <div>
              <strong>${Utils.escapeHtml(section.section)}</strong>
              <span>${stats.completed}/${stats.total} complete</span>
            </div>
            <div class="mini-progress">
              <div style="width:${stats.progress}%"></div>
            </div>
            <b>${stats.progress}%</b>
          </article>
        `;
      })
      .join("");
  },

  renderBugList() {
    const container = document.getElementById("bugList");
    const bugs = applyBugFilters(QAState.getBugs());

    if (!bugs.length) {
      container.innerHTML = `<p class="empty-copy">No bugs match the current filters.</p>`;
      return;
    }

    container.innerHTML = bugs
      .map(({ entry, item, module, title, section }) => {
        const bugTitle = title || entry?.title || "Untitled bug";
        const bugSection = section || entry?.section || "Unknown section";
        const bugModule = module?.name || entry?.moduleName || "Unknown module";
        return `
          <article class="bug-row">
            <div>
              <strong>${Utils.escapeHtml(item.bugId)}</strong>
              <h3>${Utils.escapeHtml(bugTitle)}</h3>
              <p>${Utils.escapeHtml(bugModule)} / ${Utils.escapeHtml(bugSection)}</p>
            </div>
            <div class="bug-tags">
              <span>${Utils.escapeHtml(item.severity || "No severity")}</span>
              <span>${Utils.escapeHtml(item.priority || "No priority")}</span>
              <span>${Utils.escapeHtml(item.workStatus || "Open")}</span>
            </div>
          </article>
        `;
      })
      .join("");
  },

  renderEvidenceGallery() {
    const container = document.getElementById("evidenceGallery");
    const bugsWithEvidence = QAState.getBugs().filter(({ item }) => item.screenshots.length);

    if (!bugsWithEvidence.length) {
      container.innerHTML = `<p class="empty-copy">No screenshot evidence has been attached yet.</p>`;
      return;
    }

    container.innerHTML = bugsWithEvidence
      .map(({ item, title }) => `
        <article class="evidence-card">
          <div>
            <p class="bug-id assigned">${Utils.escapeHtml(item.bugId)}</p>
            <h3>${Utils.escapeHtml(title)}</h3>
          </div>
          <div class="evidence-images">
            ${[0, 1, 2]
              .map((index) => {
                const screenshot = item.screenshots[index];
                if (!screenshot) return `<div class="evidence-empty">Screenshot ${index + 1}</div>`;
                return `<figure><img src="${screenshot.dataUrl}" alt="${Utils.escapeHtml(
                  item.bugId,
                )} screenshot ${index + 1}" /><figcaption>Screenshot ${index + 1}</figcaption></figure>`;
              })
              .join("")}
          </div>
        </article>
      `)
      .join("");
  },
};

const Exporter = {
  buildMarkdownReport() {
    const stats = QAState.getStats();
    const bugs = QAState.getBugs();
    const lines = [
      "# BandUp QA Manager Report",
      "",
      "## Executive Summary",
      "",
      `BandUp QA Manager report for ${this.sessionLine()}.`,
      "",
      `Overall recommendation: ${this.overallRecommendation(stats)}`,
      "",
      "## Testing Statistics",
      "",
      `- Overall progress: ${stats.progress}%`,
      `- Total tests: ${stats.total}`,
      `- Passed tests: ${stats.passed}`,
      `- Failed tests: ${stats.failed}`,
      `- Not tested: ${stats.notTested}`,
      `- Open bugs: ${stats.openBugs}`,
      `- Retesting: ${stats.retesting}`,
      `- Closed bugs: ${stats.closed}`,
      `- MVP blockers: ${stats.mvpBlockers}`,
      `- Critical priority: ${stats.critical}`,
      `- High priority: ${stats.high}`,
      `- Medium priority: ${stats.medium}`,
      `- Low priority: ${stats.low}`,
      "",
      "## Session Metadata",
      "",
      ...this.sessionMetadata(),
      "",
      "## Bug Summary",
      "",
    ];

    if (!bugs.length) {
      lines.push("No bugs recorded.", "");
    } else {
      bugs.forEach((bug) => {
        lines.push(
          `- ${bug.item.bugId}: ${bug.title} (${bug.item.severity || "No severity"}, ${
            bug.item.priority || "No priority"
          }, ${bug.item.workStatus || "Open"})`,
        );
      });
      lines.push("");
    }

    lines.push("## Detailed Findings", "");
    QAState.getAllChecklistEntries().forEach((entry) => {
      const item = QAState.getItem(entry.id, entry);
      lines.push(`### ${entry.title}`, "");
      lines.push(`- Bug ID: ${item.bugId || "None"}`);
      lines.push(`- Result: ${item.result}`);
      lines.push(`- Severity: ${item.severity || "Not selected"}`);
      lines.push(`- Priority: ${item.priority || "Not selected"}`);
      lines.push(`- Reproducibility: ${item.reproducibility || "Not selected"}`);
      lines.push(`- Status: ${item.workStatus || "Open"}`);
      lines.push("");
      this.addField(lines, "Expected Behaviour", item.expected);
      this.addField(lines, "Actual Behaviour", item.actual);
      this.addField(lines, "Steps To Reproduce", item.steps);
      this.addField(lines, "Developer Console Output", item.developerConsole);
      this.addField(lines, "Notes", item.notes);
      this.addField(lines, "Recommendation", item.recommendation);
      this.addArchitectNotes(lines, item);
      this.addEvidenceReferences(lines, item);
    });

    lines.push("## Evidence References", "");
    bugs.forEach(({ item }) => this.addEvidenceReferences(lines, item));
    lines.push("## Architect Notes", "");
    bugs.forEach(({ title, item }) => {
      if (!hasArchitectNotes(item)) return;
      lines.push(`### ${item.bugId}: ${title}`, "");
      this.addArchitectNotes(lines, item);
    });
    lines.push("## Overall Recommendation", "", this.overallRecommendation(stats), "");
    return lines.join("\n");
  },

  buildSingleBugReport(entry, item) {
    const lines = [
      `# ${item.bugId}: ${entry.title}`,
      "",
      `- Bug ID: ${item.bugId}`,
      `- Title: ${entry.title}`,
      `- Module: ${entry.moduleName}`,
      `- Section: ${entry.section}`,
      `- Severity: ${item.severity || "Not selected"}`,
      `- Priority: ${item.priority || "Not selected"}`,
      `- Reproducibility: ${item.reproducibility || "Not selected"}`,
      `- Status: ${item.workStatus || "Open"}`,
      `- Timestamp: ${new Date().toISOString()}`,
      "",
    ];
    this.addField(lines, "Expected Behaviour", item.expected);
    this.addField(lines, "Actual Behaviour", item.actual);
    this.addField(lines, "Steps To Reproduce", item.steps);
    this.addField(lines, "Developer Console Output", item.developerConsole);
    this.addArchitectNotes(lines, item);
    this.addEvidenceReferences(lines, item);
    return lines.join("\n");
  },

  buildHtmlReport() {
    const markdown = this.buildMarkdownReport();
    const body = markdown
      .split("\n")
      .map((line) => {
        if (line.startsWith("# ")) return `<h1>${Utils.escapeHtml(line.slice(2))}</h1>`;
        if (line.startsWith("## ")) return `<h2>${Utils.escapeHtml(line.slice(3))}</h2>`;
        if (line.startsWith("### ")) return `<h3>${Utils.escapeHtml(line.slice(4))}</h3>`;
        if (line.startsWith("- ")) return `<li>${Utils.escapeHtml(line.slice(2))}</li>`;
        return line ? `<p>${Utils.escapeHtml(line)}</p>` : "";
      })
      .join("\n");

    const screenshots = QAState.getBugs()
      .flatMap(({ item }) =>
        item.screenshots.map(
          (screenshot, index) =>
            `<figure><img src="${screenshot.dataUrl}" alt="${Utils.escapeHtml(
              item.bugId,
            )} screenshot ${index + 1}" /><figcaption>${Utils.escapeHtml(
              item.bugId,
            )} screenshot ${index + 1}: ${Utils.escapeHtml(screenshot.name)}</figcaption></figure>`,
        ),
      )
      .join("");

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>BandUp QA Manager Report</title>
  <style>
    body { color: #172033; font-family: Arial, sans-serif; line-height: 1.55; margin: 32px; }
    h1 { border-bottom: 3px solid #2463eb; padding-bottom: 12px; }
    h2 { border-bottom: 1px solid #d9e1ec; margin-top: 32px; padding-bottom: 8px; }
    h3 { margin-top: 24px; }
    li { margin: 4px 0; }
    figure { break-inside: avoid; border: 1px solid #d9e1ec; padding: 12px; margin: 16px 0; }
    img { max-width: 100%; height: auto; }
    figcaption { color: #62708a; margin-top: 8px; }
  </style>
</head>
<body>
${body}
${screenshots ? `<h2>Embedded Evidence</h2>${screenshots}` : ""}
</body>
</html>`;
  },

  sessionLine() {
    const module = QAState.getCurrentModule();
    return `${state.session.projectName} / ${module.name} on ${state.session.testDate}`;
  },

  sessionMetadata() {
    return [
      `- Project: ${state.session.projectName}`,
      `- Module: ${QAState.getCurrentModule().name}`,
      `- Tester: ${state.session.testerName || "Not specified"}`,
      `- Environment: ${state.session.environmentName}`,
      `- Git commit: ${state.session.gitCommit || "Not specified"}`,
      `- Branch: ${state.session.branchName || "Not specified"}`,
      `- Version: ${state.session.versionName || "Not specified"}`,
      `- Build date: ${state.session.buildDate || "Not specified"}`,
      `- Build time: ${state.session.buildTime || "Not specified"}`,
      `- Test date: ${state.session.testDate || "Not specified"}`,
      `- Test time: ${state.session.testTime || "Not specified"}`,
      `- Device: ${state.session.deviceName || "Not specified"}`,
      `- Browser: ${state.session.browserName || "Not detected"}`,
      `- Operating system: ${state.session.operatingSystem || "Not detected"}`,
      `- Screen resolution: ${state.session.screenResolution || "Not detected"}`,
      `- Viewport size: ${state.session.viewportSize || "Not detected"}`,
      `- Timezone: ${state.session.timezoneName || "Not detected"}`,
      `- User agent: ${state.session.userAgent || "Not detected"}`,
    ];
  },

  addField(lines, title, value) {
    if (!value) return;
    lines.push(`#### ${title}`, "", value, "");
  },

  addArchitectNotes(lines, item) {
    if (!hasArchitectNotes(item)) return;
    lines.push("#### Architect Notes", "");
    this.addField(lines, "Architect Recommendation", item.architectRecommendation);
    this.addField(lines, "Possible Root Cause", item.possibleRootCause);
    this.addField(lines, "Suggested Investigation", item.suggestedInvestigation);
    this.addField(lines, "Suggested Files", item.suggestedFiles);
  },

  addEvidenceReferences(lines, item) {
    if (!item.screenshots.length) return;
    lines.push("#### Evidence References", "");
    item.screenshots.forEach((screenshot, index) => {
      lines.push(`- Screenshot ${index + 1}: ${screenshot.name}`);
    });
    lines.push("");
  },

  overallRecommendation(stats) {
    if (stats.mvpBlockers || stats.critical) return "Do not release until MVP blockers and critical issues are resolved.";
    if (stats.openBugs) return "Continue QA stabilization before release approval.";
    if (stats.notTested) return "Continue testing until remaining items are completed.";
    return "QA status is acceptable based on the recorded checklist results.";
  },
};

function persist() {
  Storage.save(state);
  const saveState = document.getElementById("saveState");
  if (saveState) saveState.textContent = "Saved locally";
}

function persistAndRender(options = {}) {
  persist();
  if (!options.skipChecklist) Renderer.renderChecklist();
  Renderer.renderDashboard();
  Renderer.renderSectionProgress();
  Renderer.renderBugList();
  Renderer.renderEvidenceGallery();
}

function categoriesForCurrentModule() {
  return QAState.getSections().map((section) => section.section);
}

function fillSelect(id, labels, values) {
  const select = document.getElementById(id);
  select.innerHTML = labels
    .map((label, index) => `<option value="${Utils.escapeHtml(values[index])}">${Utils.escapeHtml(label)}</option>`)
    .join("");
}

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function hasArchitectNotes(item) {
  return Boolean(
    item.architectRecommendation ||
      item.possibleRootCause ||
      item.suggestedInvestigation ||
      item.suggestedFiles,
  );
}

function applyBugFilters(bugs) {
  const query = document.getElementById("bugSearch").value.trim().toLowerCase();
  const moduleFilter = document.getElementById("filterModule").value;
  const severity = document.getElementById("filterSeverity").value;
  const priority = document.getElementById("filterPriority").value;
  const status = document.getElementById("filterStatus").value;
  const bugState = document.getElementById("filterBugState").value;

  return bugs.filter((bug) => {
    const item = bug.item;
    const haystack = [
      item.bugId,
      bug.title,
      bug.section,
      item.notes,
      item.expected,
      item.actual,
      item.steps,
      item.developerConsole,
      item.architectRecommendation,
      item.possibleRootCause,
      item.suggestedInvestigation,
      item.suggestedFiles,
    ]
      .join(" ")
      .toLowerCase();

    if (query && !haystack.includes(query)) return false;
    if (moduleFilter && bug.module.key !== moduleFilter) return false;
    if (severity && item.severity !== severity) return false;
    if (priority && item.priority !== priority) return false;
    if (status && item.workStatus !== status) return false;
    if (bugState === "open" && !BUG_OPEN_STATUSES.has(item.workStatus)) return false;
    if (bugState === "closed" && !BUG_CLOSED_STATUSES.has(item.workStatus)) return false;
    return true;
  });
}

async function addScreenshots(itemId, files) {
  const item = QAState.getItem(itemId);
  const availableSlots = 3 - item.screenshots.length;
  if (availableSlots <= 0) {
    Utils.toast("Maximum 3 screenshots per card.");
    return;
  }
  const images = await Promise.all(files.slice(0, availableSlots).map(fileToScreenshot));
  item.screenshots.push(...images);
  item.updatedAt = new Date().toISOString();
  persistAndRender();
  Utils.toast("Screenshot saved locally.");
}

function fileToScreenshot(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        name: file.name || "Pasted screenshot",
        dataUrl: reader.result,
        createdAt: new Date().toISOString(),
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  state.session = { ...state.session, ...Environment.detect() };
  Renderer.init();
  persist();
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
