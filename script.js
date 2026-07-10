const APP_VERSION = "4.0.0";
const STORAGE_KEY = "bandup-qa-manager-v2";

const MODULES = [
  { key: "authentication", name: "Authentication", prefix: "AUTH", populated: false },
  { key: "dashboard", name: "Dashboard", prefix: "DASH", populated: false },
  { key: "reading", name: "Reading", prefix: "READ", populated: true },
  { key: "listening", name: "Listening", prefix: "LIST", populated: true },
  { key: "writing", name: "Writing", prefix: "WRITE", populated: true },
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
const GENERATED_EXPORTS = {
  projectStatus: {
    filename: "project-status-qa-update.md",
    title: "PROJECT_STATUS.md update generated.",
  },
  sprint: {
    filename: "next-development-sprint-qa-update.md",
    title: "NEXT_DEVELOPMENT_SPRINT.md update generated.",
  },
  summary: {
    filename: "qa-executive-summary.md",
    title: "QA summary generated.",
  },
  bugs: {
    filename: "unresolved-bugs-report.md",
    title: "Bugs-only report generated.",
  },
  codex: {
    filename: "codex-qa-task.md",
    title: "Codex task generated.",
  },
  architectReview: {
    filename: "architect-review.md",
    title: "Architect review generated.",
  },
  githubIssue: {
    filename: "github-issue.md",
    title: "GitHub issue generated.",
  },
  githubIssues: {
    filename: "github-issues.md",
    title: "GitHub issues generated.",
  },
  pullRequest: {
    filename: "pull-request-description.md",
    title: "Pull request description generated.",
  },
  releaseNotes: {
    filename: "release-notes.md",
    title: "Release notes generated.",
  },
  changelog: {
    filename: "changelog-entry.md",
    title: "Changelog entry generated.",
  },
  releaseRecommendation: {
    filename: "release-recommendation.md",
    title: "Release recommendation generated.",
  },
  selectedBugs: {
    filename: "selected-bugs-report.md",
    title: "Selected bugs report generated.",
  },
};

const QA_DATA = {
  reading: [
    {
      section: "Navigation",
      items: [
        {
          title: "Reading opens from the Dashboard",
          whatToDo: "Go to the Dashboard and open the Reading module.",
          expected: "The Reading screen opens without any error messages.",
        },
        {
          title: "Reading opens from the main menu",
          whatToDo: "Use the app menu to open Reading.",
          expected: "You arrive on the same Reading screen and can start testing.",
        },
        {
          title: "Back button returns to the previous screen",
          whatToDo: "Open a Reading passage, then use the browser or app Back button.",
          expected: "You return to the previous screen without the app freezing or showing an error.",
        },
        {
          title: "Logged-out users are protected",
          whatToDo: "Sign out, then try to open the Reading page directly.",
          expected: "The app sends you to the sign-in screen instead of showing private Reading content.",
        },
      ],
    },
    {
      section: "Reading Passages",
      items: [
        {
          title: "Reading passage appears clearly",
          whatToDo: "Open Reading and look at the passage area.",
          expected: "The passage appears clearly and there are no blank or broken sections.",
        },
        {
          title: "Passage is easy to read on desktop",
          whatToDo: "View the Reading passage on a laptop or desktop screen.",
          expected: "The text is comfortable to read and does not feel cramped.",
        },
        {
          title: "Passage is easy to read on mobile",
          whatToDo: "Resize the browser to a phone width or test on a phone.",
          expected: "The passage still fits the screen and the text does not overlap other controls.",
        },
        {
          title: "Instructions are clear before answering",
          whatToDo: "Read the instructions above or near the Reading questions.",
          expected: "You understand what to do before choosing an answer.",
        },
      ],
    },
    {
      section: "Questions",
      items: [
        {
          title: "Multiple-choice answers are visible",
          whatToDo: "Open a multiple-choice Reading question.",
          expected: "All answer choices are visible and easy to select.",
        },
        {
          title: "True / False / Not Given answers are visible",
          whatToDo: "Open a True / False / Not Given question.",
          expected: "The choices True, False, and Not Given are visible and easy to select.",
        },
        {
          title: "Selected answer is obvious",
          whatToDo: "Choose an answer for any Reading question.",
          expected: "The selected answer is clearly highlighted so you know what you chose.",
        },
        {
          title: "Changing an answer works",
          whatToDo: "Choose one answer, then choose a different answer before submitting.",
          expected: "The new answer becomes selected and the old answer is no longer selected.",
        },
        {
          title: "Unanswered questions are easy to notice",
          whatToDo: "Look at a question before choosing an answer.",
          expected: "It is clear that no answer has been selected yet.",
        },
      ],
    },
    {
      section: "Submit Answers",
      items: [
        {
          title: "Submit button is easy to find",
          whatToDo: "Choose an answer for a Reading question and look for the submit button.",
          expected: "The submit button is visible and easy to understand.",
        },
        {
          title: "Submitting records the answer",
          whatToDo: "Choose an answer and press Submit.",
          expected: "The app accepts the answer and shows whether it was correct or incorrect.",
        },
        {
          title: "Explanation appears after submitting",
          whatToDo: "Submit any Reading answer.",
          expected: "An explanation appears so you can understand the answer.",
        },
        {
          title: "Correct and incorrect answers are clear",
          whatToDo: "Submit both a correct and an incorrect answer if possible.",
          expected: "The app clearly shows which answer was correct and whether your answer was right or wrong.",
        },
        {
          title: "Final question shows completion feedback",
          whatToDo: "Answer and submit the final Reading question.",
          expected: "The app clearly shows that the Reading activity is complete.",
        },
      ],
    },
    {
      section: "Results Screen",
      items: [
        {
          title: "Results appear after the final question",
          whatToDo: "Complete all Reading questions in the activity.",
          expected: "A results summary appears where you can easily see it.",
        },
        {
          title: "Correct answer count is right",
          whatToDo: "Compare the results summary with the answers you submitted.",
          expected: "The number of correct answers matches your test run.",
        },
        {
          title: "Incorrect answer count is right",
          whatToDo: "Compare the results summary with the answers you submitted.",
          expected: "The number of incorrect answers matches your test run.",
        },
        {
          title: "Percentage score is shown correctly",
          whatToDo: "Check the percentage shown in the results summary.",
          expected: "The percentage matches the number of correct answers out of the total questions.",
        },
        {
          title: "Estimated band is shown when available",
          whatToDo: "Look at the completed Reading results.",
          expected: "If the app has enough information, it shows an estimated IELTS band clearly.",
        },
        {
          title: "Progress saved message is clear",
          whatToDo: "Complete the Reading activity and check the results area.",
          expected: "The app clearly tells you that progress has been saved or recorded.",
        },
      ],
    },
    {
      section: "AI Explanations",
      items: [
        {
          title: "Signed-in user can ask the AI Tutor",
          whatToDo: "Sign in, submit a Reading answer, then click an AI Tutor button.",
          expected: "The AI Tutor gives a helpful explanation.",
        },
        {
          title: "Guest user sees a clear sign-in message",
          whatToDo: "Use Guest Mode, submit a Reading answer, then try to use the AI Tutor.",
          expected: "The app explains that AI Tutor is available after signing in or creating an account.",
        },
        {
          title: "Simple explanation is easy to understand",
          whatToDo: "Click the option that asks the AI to explain more simply.",
          expected: "The explanation uses simple language and is easier to understand than the original explanation.",
        },
        {
          title: "Another example is different",
          whatToDo: "Click the option that asks for another example.",
          expected: "The AI gives a new example instead of repeating the same explanation.",
        },
        {
          title: "Wrong answer explanation refers to your answer",
          whatToDo: "Choose an incorrect answer, submit it, then ask why your answer was not correct.",
          expected: "The AI talks about the answer you chose and explains why it does not work.",
        },
        {
          title: "Passage evidence is explained",
          whatToDo: "Click the option that asks where the answer is in the passage.",
          expected: "The AI points to the relevant part of the passage and explains why it supports the answer.",
        },
        {
          title: "Quiz me again gives a usable question",
          whatToDo: "Click the option that asks the AI to quiz you again.",
          expected: "The AI gives a new practice question that makes sense for Reading practice.",
        },
        {
          title: "AI text looks clean",
          whatToDo: "Read the AI Tutor response carefully.",
          expected: "The response does not show raw symbols like double asterisks or broken formatting.",
        },
        {
          title: "Static explanation remains available",
          whatToDo: "Submit a Reading answer and use the AI Tutor.",
          expected: "The normal explanation stays visible even if the AI is slow or unavailable.",
        },
      ],
    },
    {
      section: "Progress",
      items: [
        {
          title: "Answered question count increases",
          whatToDo: "Submit a Reading answer, then check the Dashboard or Progress page.",
          expected: "The number of answered questions increases.",
        },
        {
          title: "Correct answer count increases",
          whatToDo: "Submit a correct Reading answer, then check progress.",
          expected: "The correct answer count increases.",
        },
        {
          title: "Incorrect answer count increases",
          whatToDo: "Submit an incorrect Reading answer, then check progress.",
          expected: "The incorrect answer count increases.",
        },
        {
          title: "Recent activity shows Reading practice",
          whatToDo: "Submit a Reading answer and return to the Dashboard.",
          expected: "Recent activity shows that Reading practice happened.",
        },
        {
          title: "Dashboard updates after Reading",
          whatToDo: "Complete Reading practice and return to the Dashboard.",
          expected: "The Dashboard shows updated Reading progress.",
        },
        {
          title: "Progress page updates after Reading",
          whatToDo: "Complete Reading practice and open the Progress page.",
          expected: "The Progress page shows the new Reading activity.",
        },
        {
          title: "Guest progress stays on this browser only",
          whatToDo: "Use Guest Mode, complete a Reading item, then refresh the browser.",
          expected: "Guest progress remains on this browser but is not treated as account progress.",
        },
        {
          title: "Signed-in progress remains after refresh",
          whatToDo: "Sign in, complete a Reading item, refresh the browser, and check progress again.",
          expected: "Your account progress is still there after the refresh.",
        },
      ],
    },
    {
      section: "Error Handling",
      items: [
        {
          title: "Cannot submit without choosing an answer",
          whatToDo: "Open a Reading question and try to submit without selecting an answer.",
          expected: "The app prevents the empty submission or clearly tells you to choose an answer first.",
        },
        {
          title: "AI unavailable message is friendly",
          whatToDo: "If AI is unavailable, look at the message shown to the user.",
          expected: "The message is clear, friendly, and does not look like a technical error.",
        },
        {
          title: "AI failure does not block learning",
          whatToDo: "Use Reading when the AI Tutor is unavailable or slow.",
          expected: "The normal explanation still works and the learner can continue.",
        },
        {
          title: "Refreshing Reading does not crash",
          whatToDo: "Open Reading and refresh the browser page.",
          expected: "The app reloads safely without a blank screen or crash.",
        },
        {
          title: "Invalid session returns safely to sign in",
          whatToDo: "If your session has expired, try opening Reading again.",
          expected: "The app sends you to sign in instead of showing a broken page.",
        },
      ],
    },
    {
      section: "UI & Appearance",
      items: [
        {
          title: "Reading screen feels clean",
          whatToDo: "Look over the Reading screen before answering.",
          expected: "The page feels organised, calm, and not overcrowded.",
        },
        {
          title: "Buttons are easy to understand",
          whatToDo: "Look at the buttons on the Reading screen.",
          expected: "Each button label makes it clear what will happen when clicked.",
        },
        {
          title: "AI Tutor selected action is clear",
          whatToDo: "Click more than one AI Tutor option after submitting an answer.",
          expected: "It is clear which AI explanation is currently being shown.",
        },
        {
          title: "Mobile layout does not overlap",
          whatToDo: "Test Reading at a phone-sized width.",
          expected: "Text, buttons, and cards fit without overlapping.",
        },
        {
          title: "Keyboard focus is visible",
          whatToDo: "Use the Tab key to move through Reading controls.",
          expected: "You can see which button or input is currently selected.",
        },
        {
          title: "No confusing old messages appear",
          whatToDo: "Read the visible messages on the Reading screen.",
          expected: "The wording feels current, helpful, and not confusing.",
        },
      ],
    },
    {
      section: "Performance",
      items: [
        {
          title: "Reading opens quickly",
          whatToDo: "Open the Reading module and notice how long it takes to appear.",
          expected: "The Reading screen appears quickly enough that it does not feel stuck.",
        },
        {
          title: "Submitting an answer feels responsive",
          whatToDo: "Choose an answer and press Submit.",
          expected: "The app responds quickly and does not feel frozen.",
        },
        {
          title: "AI loading state is clear",
          whatToDo: "Ask the AI Tutor for an explanation.",
          expected: "While waiting, the app clearly shows that something is loading.",
        },
        {
          title: "Screenshots do not break the QA Manager",
          whatToDo: "Paste or upload a screenshot into a QA item.",
          expected: "The screenshot appears in the QA Manager and the page still works normally.",
        },
      ],
    },
  ],
  listening: [
    {
      section: "Navigation",
      items: [
        {
          title: "Listening opens from the Dashboard",
          whatToDo: "Go to the Dashboard and open the Listening module.",
          expected: "The Listening practice screen opens without a blank page or error message.",
        },
        {
          title: "Listening opens from the main menu",
          whatToDo: "Use the app menu to open Listening.",
          expected: "You arrive on the Listening screen and can see the practice activity.",
        },
        {
          title: "Question navigation buttons work",
          whatToDo: "Use Previous and Next while viewing Listening questions.",
          expected: "The app moves between questions without losing selected answers.",
        },
      ],
    },
    {
      section: "Listening Home Screen",
      items: [
        {
          title: "Listening activity is visible",
          whatToDo: "Open Listening and look at the first screen.",
          expected: "The title, audio controls, question area, transcript area, and vocabulary notes are visible.",
        },
        {
          title: "Instructions are understandable",
          whatToDo: "Read the text near the top of the Listening screen.",
          expected: "It is clear that you should listen, answer questions, and then review explanations.",
        },
      ],
    },
    {
      section: "Audio Playback",
      items: [
        {
          title: "Audio is ready to play",
          whatToDo: "Open Listening and look at the audio area before pressing Play.",
          expected: "The audio area appears ready and does not show a loading error.",
        },
        {
          title: "Play starts the audio",
          whatToDo: "Press Play audio.",
          expected: "The button changes to Pause and the progress bar begins moving.",
        },
        {
          title: "Pause stops playback",
          whatToDo: "Press Pause while the audio is playing.",
          expected: "Playback pauses and the elapsed time stops increasing.",
        },
        {
          title: "Resume continues playback",
          whatToDo: "Press Resume after pausing.",
          expected: "Playback continues from the paused position.",
        },
        {
          title: "Restart begins again",
          whatToDo: "Press Restart during or after playback.",
          expected: "The audio timer returns to the beginning and starts again.",
        },
        {
          title: "Audio progress is visible",
          whatToDo: "Play the audio and watch the progress bar.",
          expected: "The progress bar and timer move forward clearly.",
        },
        {
          title: "No volume control is required in this MVP",
          whatToDo: "Look for volume controls on the Listening screen.",
          expected: "If no volume control appears, the screen still works because this MVP uses simulated playback.",
        },
      ],
    },
    {
      section: "Questions",
      items: [
        {
          title: "Question text is clear",
          whatToDo: "Read the current Listening question.",
          expected: "The question is easy to read and shows the question number.",
        },
        {
          title: "Answer choices are easy to select",
          whatToDo: "Choose an answer for a Listening question.",
          expected: "The selected answer is visibly highlighted.",
        },
        {
          title: "Changing an answer works before submission",
          whatToDo: "Choose one answer, then choose a different answer before submitting.",
          expected: "The new answer replaces the old answer.",
        },
        {
          title: "Unanswered questions are easy to notice",
          whatToDo: "Look at the question navigation card.",
          expected: "Questions show whether they are not answered, answered, or submitted.",
        },
      ],
    },
    {
      section: "Submission",
      items: [
        {
          title: "Submit button appears after choosing an answer",
          whatToDo: "Choose an answer and look for the Submit answer button.",
          expected: "The submit button is available and clear.",
        },
        {
          title: "Cannot submit an unanswered question",
          whatToDo: "Open an unanswered question and look at the Submit answer button.",
          expected: "The button is disabled until an answer is selected.",
        },
        {
          title: "Submitted answer locks",
          whatToDo: "Submit a Listening answer and then try to change it.",
          expected: "The answer is locked after submission.",
        },
        {
          title: "Explanation appears after submission",
          whatToDo: "Submit a Listening answer.",
          expected: "The explanation panel appears below the question.",
        },
      ],
    },
    {
      section: "Results",
      items: [
        {
          title: "Results appear after all questions",
          whatToDo: "Submit every Listening question.",
          expected: "A results summary appears with score, accuracy, and recorded progress.",
        },
        {
          title: "Correct and incorrect answers are clear",
          whatToDo: "Review submitted Listening explanations.",
          expected: "The app shows whether each answer was correct or not quite right.",
        },
        {
          title: "Transcript unlocks after playback",
          whatToDo: "Let the simulated audio finish, then look at the transcript card.",
          expected: "The transcript becomes visible after playback is complete.",
        },
      ],
    },
    {
      section: "Progress",
      items: [
        {
          title: "Dashboard updates after Listening",
          whatToDo: "Submit a Listening answer and return to the Dashboard.",
          expected: "Recent activity or question counts reflect Listening practice.",
        },
        {
          title: "Progress page updates after Listening",
          whatToDo: "Submit Listening answers and open the Progress page.",
          expected: "Progress totals reflect the submitted Listening answers.",
        },
        {
          title: "Saved vocabulary works",
          whatToDo: "Click Save beside a vocabulary note.",
          expected: "The word is saved for later review without breaking the Listening flow.",
        },
      ],
    },
    {
      section: "Error Handling",
      items: [
        {
          title: "Refresh does not crash Listening",
          whatToDo: "Open Listening and refresh the browser.",
          expected: "The Listening screen reloads safely without a blank page.",
        },
        {
          title: "Mobile layout remains usable",
          whatToDo: "Test Listening at a phone-sized width.",
          expected: "Audio controls, questions, transcript, and buttons fit without overlapping.",
        },
        {
          title: "Playback feels responsive",
          whatToDo: "Press Play, Pause, Resume, and Restart.",
          expected: "Each control responds quickly and does not freeze the page.",
        },
      ],
    },
  ],
  writing: [
    {
      section: "Navigation",
      items: [
        {
          title: "Writing opens from the Dashboard",
          whatToDo: "Go to the Dashboard and open the Writing module.",
          expected: "The Writing practice screen opens without any error messages.",
        },
        {
          title: "Writing opens from the main menu",
          whatToDo: "Use the app menu to open Writing.",
          expected: "You arrive on the Writing screen and can see the available tasks.",
        },
      ],
    },
    {
      section: "Writing Home Screen",
      items: [
        {
          title: "Writing task buttons are visible",
          whatToDo: "Open Writing and look at the task buttons near the top.",
          expected: "The available Writing tasks are visible and easy to select.",
        },
        {
          title: "Prompt is easy to read",
          whatToDo: "Select a Writing task and read the prompt card.",
          expected: "The prompt text is clear and not hidden or cut off.",
        },
        {
          title: "Task type is shown",
          whatToDo: "Look at the label beside the selected prompt.",
          expected: "The app shows whether the task is Task 2, Academic Task 1, or General Task 1.",
        },
      ],
    },
    {
      section: "Task Selection",
      items: [
        {
          title: "Selecting another task works",
          whatToDo: "Click a different Writing task button.",
          expected: "The selected prompt changes to the new task.",
        },
        {
          title: "Changing tasks clears the current draft",
          whatToDo: "Type a few words, then select a different Writing task.",
          expected: "The editor clears so the new task starts fresh.",
        },
      ],
    },
    {
      section: "Writing Editor",
      items: [
        {
          title: "Editor accepts typing",
          whatToDo: "Click inside the response box and type a short paragraph.",
          expected: "Your text appears in the editor as you type.",
        },
        {
          title: "Editing text works",
          whatToDo: "Delete, add, and change words in the editor.",
          expected: "The editor updates normally without lag or lost text.",
        },
        {
          title: "Word count updates",
          whatToDo: "Type several words and watch the Current words value.",
          expected: "The word count changes as you type.",
        },
        {
          title: "Character count updates",
          whatToDo: "Type and delete text while watching the Characters value.",
          expected: "The character count changes as the draft changes.",
        },
        {
          title: "Word progress bar updates",
          whatToDo: "Continue typing toward the target word count.",
          expected: "The progress bar moves as the word count increases.",
        },
        {
          title: "Reset draft clears the editor",
          whatToDo: "Type text, then click Reset draft.",
          expected: "The editor clears and feedback disappears.",
        },
      ],
    },
    {
      section: "Submission",
      items: [
        {
          title: "Submit is disabled for very short drafts",
          whatToDo: "Open Writing with an empty or very short draft.",
          expected: "Get feedback is disabled until enough words are typed.",
        },
        {
          title: "Short draft feedback becomes available",
          whatToDo: "Type at least 30 words but less than the official target.",
          expected: "The app allows feedback and warns that the estimate is limited.",
        },
        {
          title: "Submitting shows feedback",
          whatToDo: "Type enough words and click Get feedback.",
          expected: "The feedback panel appears with an estimated band and criterion feedback.",
        },
        {
          title: "Submitted draft is marked",
          whatToDo: "Submit a draft and look near the response heading.",
          expected: "The app shows that the current draft has been submitted.",
        },
        {
          title: "Editing after submission resets feedback",
          whatToDo: "Submit a draft, then change the text.",
          expected: "The old feedback clears because the draft has changed.",
        },
      ],
    },
    {
      section: "Feedback",
      items: [
        {
          title: "Estimated band is visible",
          whatToDo: "Submit a Writing response and look at the feedback panel.",
          expected: "An estimated band is shown clearly.",
        },
        {
          title: "Task achievement feedback appears",
          whatToDo: "Submit a Writing response and review the feedback sections.",
          expected: "Task achievement feedback is visible.",
        },
        {
          title: "Coherence and cohesion feedback appears",
          whatToDo: "Submit a Writing response and review the feedback sections.",
          expected: "Coherence and cohesion feedback is visible.",
        },
        {
          title: "Vocabulary feedback appears",
          whatToDo: "Submit a Writing response and review the feedback sections.",
          expected: "Lexical resource or vocabulary feedback is visible.",
        },
        {
          title: "Grammar feedback appears",
          whatToDo: "Submit a Writing response and review the feedback sections.",
          expected: "Grammar feedback is visible.",
        },
        {
          title: "Strengths and weaknesses are shown",
          whatToDo: "Submit a Writing response and review the lists.",
          expected: "The app shows strengths and weaknesses in clear language.",
        },
        {
          title: "Next steps are practical",
          whatToDo: "Read the next steps after submitting Writing.",
          expected: "The next steps are understandable and useful for the learner.",
        },
      ],
    },
    {
      section: "Progress",
      items: [
        {
          title: "Dashboard updates after Writing",
          whatToDo: "Submit a Writing response and return to the Dashboard.",
          expected: "Recent activity or progress reflects the Writing submission.",
        },
        {
          title: "Progress page updates after Writing",
          whatToDo: "Submit Writing feedback and open the Progress page.",
          expected: "Writing progress or band estimate reflects the submission.",
        },
      ],
    },
    {
      section: "Error Handling",
      items: [
        {
          title: "Refresh reloads safely",
          whatToDo: "Open Writing and refresh the browser.",
          expected: "The Writing screen reloads without a crash. Unsaved draft text may reset in this MVP.",
        },
        {
          title: "Mobile layout remains usable",
          whatToDo: "Test Writing at a phone-sized width.",
          expected: "Prompt, editor, buttons, and feedback fit without overlapping.",
        },
        {
          title: "Feedback appears quickly",
          whatToDo: "Submit a Writing draft and watch the feedback area.",
          expected: "Feedback appears promptly because this MVP uses deterministic feedback logic.",
        },
        {
          title: "No AI Writing claim appears",
          whatToDo: "Read the Writing feedback placeholder text before submitting.",
          expected: "The app honestly says full AI Writing scoring is deferred.",
        },
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

  readJsonFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          resolve(JSON.parse(reader.result));
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
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
      sessionStartedAt: now.iso,
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
      selectedBugIds: [],
      ui: {
        openSections: {},
      },
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
      selectedBugIds: Array.isArray(saved.selectedBugIds) ? saved.selectedBugIds : [],
      ui: {
        openSections: {
          ...base.ui.openSections,
          ...((saved.ui && saved.ui.openSections) || {}),
        },
      },
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

  sectionStateKey(moduleKey, sectionName) {
    return `${moduleKey}:${Utils.slug(sectionName)}`;
  },

  getAllChecklistEntries(moduleKey = state.session.moduleName) {
    return this.getSections(moduleKey).flatMap((section) =>
      section.items.map((item, index) => ({
        id: this.createItemId(moduleKey, section.section, index),
        moduleKey,
        moduleName: MODULES.find((module) => module.key === moduleKey)?.name || moduleKey,
        section: section.section,
        title: getQaTitle(item),
        whatToDo: item.whatToDo || "",
        expectedResult: item.expected || "",
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
        noteOpen: false,
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

  getUnresolvedBugs() {
    return this.getBugs().filter(({ item }) => !BUG_CLOSED_STATUSES.has(item.workStatus));
  },

  getBugById(bugId) {
    return this.getBugs().find(({ item }) => item.bugId === bugId);
  },

  getSelectedBugs() {
    const selected = new Set(state.selectedBugIds || []);
    return this.getBugs().filter(({ item }) => selected.has(item.bugId));
  },

  getActionBugs() {
    const selected = this.getSelectedBugs();
    return selected.length ? selected : this.getUnresolvedBugs();
  },

  setBugSelected(bugId, selected) {
    const current = new Set(state.selectedBugIds || []);
    if (selected) current.add(bugId);
    else current.delete(bugId);
    state.selectedBugIds = Array.from(current).sort();
  },

  getPrioritizedWork() {
    const unresolved = this.getUnresolvedBugs();
    const groups = [
      {
        title: "MVP blockers",
        bugs: unresolved.filter(({ item }) => item.severity === "MVP Blocker"),
      },
      {
        title: "Critical bugs",
        bugs: unresolved.filter(
          ({ item }) => item.priority === "Critical" && item.severity !== "MVP Blocker",
        ),
      },
      {
        title: "High priority bugs",
        bugs: unresolved.filter(
          ({ item }) => item.priority === "High" && item.severity !== "MVP Blocker",
        ),
      },
      {
        title: "Retesting",
        bugs: unresolved.filter(({ item }) => item.workStatus === "Retest Required"),
      },
      {
        title: "UX improvements",
        bugs: unresolved.filter(({ item }) => item.severity === "UX Improvement"),
      },
      {
        title: "Post-MVP enhancements",
        bugs: unresolved.filter(({ item }) => item.severity === "Post-MVP Enhancement"),
      },
    ];

    return groups.map((group) => ({
      ...group,
      bugs: uniqueBugs(group.bugs),
    }));
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
    this.renderCompletionSummary();
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

    const tiles = document.getElementById("moduleTiles");
    tiles.innerHTML = MODULES.map(
      (module) => `
        <button class="module-tile ${module.key === state.session.moduleName ? "active" : ""}" type="button" data-module-tile="${module.key}">
          <strong>${Utils.escapeHtml(module.name)}</strong>
          <span>${module.populated ? "Ready to test" : "Coming later"}</span>
        </button>
      `,
    ).join("");
    tiles.querySelectorAll("[data-module-tile]").forEach((button) => {
      button.addEventListener("click", () => {
        state.session.moduleName = button.dataset.moduleTile;
        persist();
        this.renderModuleOptions();
        this.renderAll();
      });
    });
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
          this.renderModuleOptions();
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
    document.getElementById("testingModeButton").addEventListener("click", () => {
      setMode("testing");
    });
    document.getElementById("engineeringModeButton").addEventListener("click", () => {
      setMode("engineering");
    });
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
    document.getElementById("exportFullQaReport").addEventListener("click", () => {
      Utils.download("bandup-qa-report.md", Exporter.buildMarkdownReport(), "text/markdown");
    });
    document.getElementById("exportPrintableHtml").addEventListener("click", () => {
      Utils.download("bandup-qa-report.html", Exporter.buildHtmlReport(), "text/html");
    });
    document.getElementById("printFromExportCentre").addEventListener("click", () => {
      const html = Exporter.buildHtmlReport();
      const reportWindow = window.open("", "_blank");
      reportWindow.document.write(html);
      reportWindow.document.close();
      reportWindow.focus();
      reportWindow.print();
    });
    document.getElementById("exportProjectStatusUpdate").addEventListener("click", () => {
      this.setGeneratedExport("projectStatus", Exporter.buildProjectStatusUpdate());
    });
    document.getElementById("exportSprintUpdate").addEventListener("click", () => {
      this.setGeneratedExport("sprint", Exporter.buildSprintUpdate());
    });
    document.getElementById("exportQaSummary").addEventListener("click", () => {
      this.setGeneratedExport("summary", Exporter.buildQaSummary());
    });
    document.getElementById("exportBugsReport").addEventListener("click", () => {
      this.setGeneratedExport("bugs", Exporter.buildBugsOnlyReport());
    });
    document.getElementById("generateReleaseRecommendation").addEventListener("click", () => {
      this.setGeneratedExport("releaseRecommendation", Exporter.buildReleaseRecommendation());
    });
    document.getElementById("generateArchitectReview").addEventListener("click", () => {
      this.setGeneratedExport("architectReview", Exporter.buildArchitectReview(QAState.getActionBugs()));
    });
    document.getElementById("prepareCodexTask").addEventListener("click", () => {
      this.setGeneratedExport("codex", Exporter.buildCodexTask());
    });
    document.getElementById("prepareSelectedCodexTask").addEventListener("click", () => {
      this.setGeneratedExport("codex", Exporter.buildCodexTask(QAState.getSelectedBugs()));
    });
    document.getElementById("generateSelectedArchitectReview").addEventListener("click", () => {
      this.setGeneratedExport("architectReview", Exporter.buildArchitectReview(QAState.getSelectedBugs()));
    });
    document.getElementById("exportSelectedBugs").addEventListener("click", () => {
      this.setGeneratedExport("selectedBugs", Exporter.buildBugsOnlyReport(QAState.getSelectedBugs()));
    });
    document.getElementById("generateGithubIssue").addEventListener("click", () => {
      this.setGeneratedExport("githubIssue", Exporter.buildGithubIssue(QAState.getActionBugs().slice(0, 1)));
    });
    document.getElementById("generateGithubIssues").addEventListener("click", () => {
      this.setGeneratedExport("githubIssues", Exporter.buildGithubIssues(QAState.getActionBugs()));
    });
    document.getElementById("generatePullRequestDescription").addEventListener("click", () => {
      this.setGeneratedExport("pullRequest", Exporter.buildPullRequestDescription(QAState.getActionBugs()));
    });
    document.getElementById("generateReleaseNotes").addEventListener("click", () => {
      this.setGeneratedExport("releaseNotes", Exporter.buildReleaseNotes(QAState.getActionBugs()));
    });
    document.getElementById("generateChangelogEntry").addEventListener("click", () => {
      this.setGeneratedExport("changelog", Exporter.buildChangelogEntry(QAState.getActionBugs()));
    });
    document.getElementById("exportSessionJson").addEventListener("click", () => {
      Utils.download(
        `bandup-qa-session-${state.session.moduleName}-${state.session.testDate || "backup"}.json`,
        JSON.stringify({ exportedAt: new Date().toISOString(), state }, null, 2),
        "application/json",
      );
    });
    document.getElementById("importSessionJson").addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const imported = await Utils.readJsonFile(file);
        const nextState = imported.state || imported;
        if (!nextState || typeof nextState !== "object" || !nextState.session || !nextState.items) {
          throw new Error("Invalid QA Manager session file.");
        }
        state = Storage.merge(Storage.defaultState(), nextState);
        persist();
        this.renderAll();
        Utils.toast("Session restored.");
      } catch (error) {
        Utils.toast("Could not import session JSON.");
      } finally {
        event.target.value = "";
      }
    });
    document.getElementById("copyGeneratedExport").addEventListener("click", async () => {
      const output = document.getElementById("generatedExport").value;
      if (!output) {
        Utils.toast("Generate an engineering export first.");
        return;
      }
      try {
        await navigator.clipboard.writeText(output);
        Utils.toast("Generated Markdown copied.");
      } catch {
        document.getElementById("generatedExport").select();
        Utils.toast("Copy unavailable. Markdown selected for manual copy.");
      }
    });
    document.getElementById("downloadGeneratedExport").addEventListener("click", () => {
      const output = document.getElementById("generatedExport").value;
      if (!output) {
        Utils.toast("Generate an engineering export first.");
        return;
      }
      const key = document.getElementById("generatedExport").dataset.exportKey || "summary";
      Utils.download(GENERATED_EXPORTS[key].filename, output, "text/markdown");
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
    document.getElementById("completionCodexTask").addEventListener("click", () => {
      this.setGeneratedExport("codex", Exporter.buildCodexTask());
    });
    document.getElementById("completionQaReport").addEventListener("click", () => {
      this.setGeneratedExport("summary", Exporter.buildQaSummary());
    });
    document.getElementById("completionNextModule").addEventListener("click", () => {
      state.session.moduleName = "listening";
      persist();
      this.renderModuleOptions();
      this.renderAll();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    ["bugSearch", "filterModule", "filterSeverity", "filterPriority", "filterStatus", "filterBugState"]
      .forEach((id) => document.getElementById(id).addEventListener("input", () => {
        this.renderBugList();
      }));
  },

  setGeneratedExport(key, markdown) {
    const output = document.getElementById("generatedExport");
    const container = output.closest(".generated-output");
    output.value = markdown;
    output.dataset.exportKey = key;
    setMode("engineering");
    window.setTimeout(() => {
      container?.scrollIntoView({ behavior: "smooth", block: "center" });
      output.focus({ preventScroll: true });
      container?.classList.add("generated-output-focus");
      window.setTimeout(() => container?.classList.remove("generated-output-focus"), 1600);
    }, 0);
    Utils.toast(GENERATED_EXPORTS[key].title);
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
            <p>This module is part of the future QA Manager structure. Reading, Listening, and Writing are currently populated.</p>
          </div>
        </section>
      `;
      return;
    }

    state.ui = state.ui || { openSections: {} };
    state.ui.openSections = state.ui.openSections || {};

    sections.forEach((section, sectionIndex) => {
      const details = document.createElement("details");
      details.className = "module-section";
      const sectionKey = QAState.sectionStateKey(module.key, section.section);
      const hasStoredOpenState = Object.prototype.hasOwnProperty.call(
        state.ui.openSections,
        sectionKey,
      );
      details.open = hasStoredOpenState
        ? Boolean(state.ui.openSections[sectionKey])
        : sectionIndex === 0;
      details.addEventListener("toggle", () => {
        state.ui.openSections[sectionKey] = details.open;
        persist();
      });

      const summary = document.createElement("summary");
      const stats = QAState.sectionStats(section);
      summary.innerHTML = `
        <div>
          <h2>${stats.progress === 100 ? "✓ " : ""}${Utils.escapeHtml(section.section)} (${stats.completed}/${stats.total})</h2>
          <span>${stats.progress === 100 ? "Complete" : "In progress"}</span>
        </div>
        <strong>${stats.progress}%</strong>
      `;
      details.appendChild(summary);

      const cards = document.createElement("div");
      cards.className = "section-cards";

      section.items.forEach((qaItem, index) => {
        const entry = {
          id: QAState.createItemId(module.key, section.section, index),
          moduleKey: module.key,
          moduleName: module.name,
          section: section.section,
          title: getQaTitle(qaItem),
          whatToDo: qaItem.whatToDo || "",
          expectedResult: qaItem.expected || "",
        };
        const item = QAState.getItem(entry.id, entry);
        const card = template.content.firstElementChild.cloneNode(true);
        card.dataset.id = entry.id;
        card.querySelector(".checkline span").textContent = entry.title;
        card.querySelector("[data-what-to-do]").textContent = entry.whatToDo;
        card.querySelector("[data-expected-result]").textContent = entry.expectedResult;
        this.renderBugId(card, item);
        card.classList.toggle("passed", item.result === "Pass");
        card.classList.toggle("failed", item.result === "Fail");

        const checkbox = card.querySelector('[data-action="toggle-pass"]');
        checkbox.checked = item.result === "Pass";
        checkbox.addEventListener("change", () => {
          QAState.setResult(item, module.key, checkbox.checked ? "Pass" : "Not Tested");
          persistAndRender();
        });

        const problemPanel = card.querySelector("[data-problem-panel]");
        problemPanel.classList.toggle("hidden", item.result !== "Fail" && !item.bugId);
        const notePanel = card.querySelector("[data-note-panel]");
        notePanel.classList.toggle("hidden", !item.noteOpen && !item.notes);

        card.querySelector('[data-action="add-note"]').addEventListener("click", () => {
          item.noteOpen = true;
          persistAndRender();
        });

        card.querySelector('[data-action="report-problem"]').addEventListener("click", () => {
          QAState.setResult(item, module.key, "Fail");
          item.noteOpen = true;
          persistAndRender();
        });

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
        card.querySelector('[data-action="codex-bug"]').addEventListener("click", () => {
          const bug = ensureBugForCard(item, entry);
          if (!bug) return;
          this.setGeneratedExport("codex", Exporter.buildCodexTask([bug]));
        });
        card.querySelector('[data-action="architect-bug"]').addEventListener("click", () => {
          const bug = ensureBugForCard(item, entry);
          if (!bug) return;
          this.setGeneratedExport("architectReview", Exporter.buildArchitectReview([bug]));
        });
        card.querySelector('[data-action="github-bug"]').addEventListener("click", () => {
          const bug = ensureBugForCard(item, entry);
          if (!bug) return;
          this.setGeneratedExport("githubIssue", Exporter.buildGithubIssue([bug]));
        });

        card.querySelectorAll("[data-field]").forEach((field) => {
          const name = field.dataset.field;
          if (name === "screenshots") {
            field.addEventListener("change", () =>
              addScreenshots(entry.id, Array.from(field.files || [])),
            );
            return;
          }
          if (name === "category") {
            field.innerHTML = categoriesForCurrentModule()
              .map(
                (category) =>
                  `<option value="${Utils.escapeHtml(category)}">${Utils.escapeHtml(category)}</option>`,
              )
              .join("");
          }
          field.value = item[name] || "";
          const updateField = () => {
            item[name] = field.value;
            item.updatedAt = new Date().toISOString();
            persistAndRender({ skipChecklist: true });
          };
          field.addEventListener("input", updateField);
          field.addEventListener("change", updateField);
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
    const module = QAState.getCurrentModule();
    setText("activeModuleEyebrow", `${module.name} Module`);
    setText("overallProgress", `${stats.progress}%`);
    document.getElementById("overallProgressBar").style.width = `${stats.progress}%`;
    setText("engineeringProgress", `${stats.progress}%`);
    document.getElementById("engineeringProgressBar").style.width = `${stats.progress}%`;
    setText("friendlyProgressText", `${stats.passed + stats.failed} / ${stats.total} completed`);
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

  renderCompletionSummary() {
    const stats = QAState.getStats();
    const module = QAState.getCurrentModule();
    const complete = stats.total > 0 && stats.notTested === 0;
    const summary = document.getElementById("completionSummary");
    summary.classList.toggle("hidden", !complete);
    if (!complete) return;
    setText("completionTitle", `${module.name} Module Complete`);
    setText("completionCount", `${stats.total} of ${stats.total} tests completed`);
    setText("completionPassed", stats.passed);
    setText("completionFailed", stats.failed);
    setText("completionSkipped", stats.notTested);
    setText("completionTime", formatElapsedTime(state.sessionStartedAt));
  },

  renderSectionProgress() {
    const container = document.getElementById("sectionProgress");
    container.innerHTML = QAState.getSections()
      .map((section) => {
        const stats = QAState.sectionStats(section);
        const complete = stats.progress === 100;
        return `
          <article class="section-progress-card">
            <div>
              <strong>${complete ? "✓ " : ""}${Utils.escapeHtml(section.section)}</strong>
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
            <label class="bug-select">
              <input type="checkbox" data-select-bug="${Utils.escapeHtml(item.bugId)}" ${
                (state.selectedBugIds || []).includes(item.bugId) ? "checked" : ""
              } />
              <span>${Utils.escapeHtml(item.bugId)}</span>
            </label>
            <div>
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

    container.querySelectorAll("[data-select-bug]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        QAState.setBugSelected(checkbox.dataset.selectBug, checkbox.checked);
        persistAndRender({ skipChecklist: true });
      });
    });
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
  buildProjectStatusUpdate() {
    const stats = QAState.getStats();
    const module = QAState.getCurrentModule();
    return [
      `# PROJECT_STATUS.md Update - ${module.name} Manual QA`,
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Manual QA Session",
      "",
      `Module: ${module.name}`,
      `Date: ${state.session.testDate || "Not specified"}`,
      `Commit: ${state.session.gitCommit || "Not specified"}`,
      `Build: ${this.buildLabel()}`,
      `Environment: ${state.session.environmentName}`,
      "",
      "## Results",
      "",
      `- Tests executed: ${stats.passed + stats.failed} / ${stats.total}`,
      `- Passed: ${stats.passed}`,
      `- Failed: ${stats.failed}`,
      `- Not tested: ${stats.notTested}`,
      `- MVP blockers: ${stats.mvpBlockers}`,
      `- Open bugs: ${stats.openBugs}`,
      `- Closed bugs: ${stats.closed}`,
      `- Overall recommendation: ${this.overallRecommendation(stats)}`,
      `- QA completion status: ${this.completionStatus(stats)}`,
      "",
      "## Governance Note",
      "",
      "This is a generated update section only. It should be reviewed by Codex and the Principal Software Architect before being pasted into `PROJECT_STATUS.md`.",
      "",
    ].join("\n");
  },

  buildSprintUpdate() {
    const groups = QAState.getPrioritizedWork();
    const lines = [
      "# NEXT_DEVELOPMENT_SPRINT.md Update - QA Follow-up",
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Remaining Engineering Work",
      "",
      "Automatically prioritized from unresolved QA findings:",
      "",
    ];

    groups.forEach((group, index) => {
      lines.push(`### ${index + 1}. ${group.title}`, "");
      if (!group.bugs.length) {
        lines.push("No items recorded.", "");
        return;
      }
      group.bugs.forEach((bug) => {
        lines.push(this.bugSummaryLine(bug));
      });
      lines.push("");
    });

    lines.push(
      "## Governance Note",
      "",
      "This is a generated proposal only. Codex remains responsible for reviewing, editing, committing, pushing, and synchronizing documentation after approval.",
      "",
    );
    return lines.join("\n");
  },

  buildQaSummary() {
    const stats = QAState.getStats();
    return [
      "# QA Executive Summary",
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Testing Coverage",
      "",
      `Testing coverage is ${stats.progress}% for the current ${QAState.getCurrentModule().name} checklist.`,
      `${stats.passed + stats.failed} of ${stats.total} tests have been executed.`,
      "",
      "## Current Stability",
      "",
      this.stabilitySummary(stats),
      "",
      "## Major Risks",
      "",
      this.majorRisks(stats),
      "",
      "## Recommendation",
      "",
      this.overallRecommendation(stats),
      "",
      "## Release Readiness",
      "",
      this.releaseReadiness(stats),
      "",
    ].join("\n");
  },

  buildBugsOnlyReport(inputBugs = QAState.getUnresolvedBugs()) {
    const bugs = inputBugs;
    const lines = [
      "# Unresolved Bugs Report",
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
    ];

    if (!bugs.length) {
      lines.push("No unresolved bugs recorded.", "");
      return lines.join("\n");
    }

    bugs.forEach((bug) => {
      lines.push(...this.bugDetailBlock(bug), "");
    });

    return lines.join("\n");
  },

  buildCodexTask(inputBugs = QAState.getUnresolvedBugs()) {
    const bugs = inputBugs;
    const lines = [
      "# Codex QA Bug-Fix Task",
      "",
      "Codex,",
      "",
      "MVP QA has identified the following unresolved issues. Investigate only the listed issues. Preserve existing architecture and avoid unrelated changes.",
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
    ];

    if (!bugs.length) {
      lines.push("No unresolved bugs are currently recorded.", "");
    } else {
      bugs.forEach((bug) => {
        lines.push(...this.codexBugBlock(bug), "");
      });
    }

    lines.push(
      "Please investigate the root cause, propose the smallest safe implementation, verify the fix, update all relevant documentation, commit, push, and synchronize the Google Drive workspace if documentation changes.",
      "",
    );

    return lines.join("\n");
  },

  buildReleaseRecommendation() {
    const stats = QAState.getStats();
    const status = stats.mvpBlockers || stats.critical
      ? "Not Ready"
      : stats.openBugs || stats.notTested
        ? "Conditionally Ready"
        : "Ready";
    const blockers = QAState.getUnresolvedBugs().filter(({ item }) => item.severity === "MVP Blocker");
    const critical = QAState.getUnresolvedBugs().filter(({ item }) => item.priority === "Critical");
    const high = QAState.getUnresolvedBugs().filter(({ item }) => item.priority === "High");
    return [
      "# Release Recommendation",
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Release Status",
      "",
      status,
      "",
      "## Reasons",
      "",
      this.releaseReadiness(stats),
      "",
      "## Statistics",
      "",
      `- Progress: ${stats.progress}%`,
      `- Tests executed: ${stats.passed + stats.failed} / ${stats.total}`,
      `- Passed: ${stats.passed}`,
      `- Failed: ${stats.failed}`,
      `- Not tested: ${stats.notTested}`,
      `- Open bugs: ${stats.openBugs}`,
      `- Closed bugs: ${stats.closed}`,
      "",
      "## Remaining Risks",
      "",
      this.majorRisks(stats),
      "",
      "## Outstanding MVP Blockers",
      "",
      this.bugListOrNone(blockers),
      "",
      "## Critical Bugs",
      "",
      this.bugListOrNone(critical),
      "",
      "## High Priority Bugs",
      "",
      this.bugListOrNone(high),
      "",
      "## Architect Recommendation",
      "",
      this.architectReleaseRecommendation(stats),
      "",
      "## Overall Recommendation",
      "",
      this.overallRecommendation(stats),
      "",
    ].join("\n");
  },

  buildArchitectReview(inputBugs = QAState.getUnresolvedBugs()) {
    const bugs = inputBugs;
    const stats = QAState.getStats();
    return [
      "# Architect Review",
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Scope",
      "",
      bugs.length
        ? `This review analyses ${bugs.length} selected or unresolved QA finding(s).`
        : "No selected or unresolved QA findings are currently recorded.",
      "",
      "## Recurring Patterns",
      "",
      this.patternSummary(bugs, "severity"),
      "",
      "## Likely Root Causes",
      "",
      this.fieldSummary(bugs, "possibleRootCause", "No explicit root causes recorded. Inspect implementation paths related to the affected modules and sections."),
      "",
      "## Architectural Observations",
      "",
      this.architecturalObservation(stats, bugs),
      "",
      "## Potential Affected Components",
      "",
      this.affectedComponents(bugs),
      "",
      "## Suggested Investigation Areas",
      "",
      this.fieldSummary(bugs, "suggestedInvestigation", "Start with the route/component handling each failed flow and verify state persistence, UI state, and exported evidence."),
      "",
      "## Suggested Implementation Strategy",
      "",
      "Prefer the smallest safe fix per bug. Preserve existing architecture, avoid unrelated refactors, and verify the specific failing QA flow before broader regression checks.",
      "",
      "## Risks",
      "",
      this.majorRisks(stats),
      "",
    ].join("\n");
  },

  buildGithubIssue(inputBugs = QAState.getActionBugs().slice(0, 1)) {
    const bug = inputBugs[0];
    if (!bug) return "# GitHub Issue\n\nNo bug selected or unresolved.";
    return [
      `# ${bug.item.bugId}: ${bug.title}`,
      "",
      "## Summary",
      "",
      `${bug.title} fails during ${bug.module.name} QA.`,
      "",
      ...this.bugDetailBlock(bug),
      "## Acceptance Criteria",
      "",
      `- ${bug.item.bugId} is reproduced or formally classified as unable to reproduce.`,
      "- Root cause is documented.",
      "- The smallest safe fix is implemented if required.",
      "- Relevant manual QA checks pass.",
      "",
    ].join("\n");
  },

  buildGithubIssues(inputBugs = QAState.getActionBugs()) {
    const bugs = inputBugs;
    const lines = ["# GitHub Issues", "", `Generated: ${new Date().toISOString()}`, ""];
    if (!bugs.length) {
      lines.push("No selected or unresolved bugs available.", "");
      return lines.join("\n");
    }
    bugs.forEach((bug) => {
      lines.push("---", "", this.buildGithubIssue([bug]));
    });
    return lines.join("\n");
  },

  buildPullRequestDescription(inputBugs = QAState.getActionBugs()) {
    return [
      "# Pull Request Description",
      "",
      "## Summary",
      "",
      "- Address QA findings recorded in BandUp QA Manager.",
      "- Preserve existing architecture and avoid unrelated changes.",
      "",
      "## QA Findings Addressed",
      "",
      this.bugListOrNone(inputBugs),
      "",
      "## Verification Plan",
      "",
      "- Reproduce each listed issue before fixing where possible.",
      "- Verify each acceptance criterion.",
      "- Run relevant static checks.",
      "- Perform targeted manual QA for affected flows.",
      "",
      "## Documentation",
      "",
      "- Update `PROJECT_STATUS.md` if project status changes.",
      "- Update EKB only if new engineering knowledge is gained.",
      "",
    ].join("\n");
  },

  buildReleaseNotes(inputBugs = QAState.getActionBugs()) {
    return [
      "# Release Notes",
      "",
      `Generated: ${new Date().toISOString()}`,
      "",
      "## Fixed / Reviewed",
      "",
      this.bugListOrNone(inputBugs),
      "",
      "## QA Status",
      "",
      this.releaseReadiness(QAState.getStats()),
      "",
    ].join("\n");
  },

  buildChangelogEntry(inputBugs = QAState.getActionBugs()) {
    return [
      "## Unreleased",
      "",
      "### QA",
      "",
      this.bugListOrNone(inputBugs),
      "",
    ].join("\n");
  },

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
      this.addField(lines, "Expected Behaviour", item.expected || entry.expectedResult);
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
    this.addField(lines, "Expected Behaviour", item.expected || entry.expectedResult);
    this.addField(lines, "Actual Behaviour", item.actual);
    this.addField(lines, "Steps To Reproduce", item.steps);
    this.addField(lines, "Founder Notes", item.notes);
    this.addField(lines, "Recommendation", item.recommendation);
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

  buildLabel() {
    const parts = [
      state.session.versionName,
      state.session.branchName ? `branch ${state.session.branchName}` : "",
      state.session.buildDate,
      state.session.buildTime,
    ].filter(Boolean);
    return parts.length ? parts.join(" / ") : "Not specified";
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

  bugSummaryLine({ item, title, module, section }) {
    return `- ${item.bugId}: ${title} | ${module.name} / ${section} | Severity: ${
      item.severity || "Not selected"
    } | Priority: ${item.priority || "Not selected"} | Status: ${item.workStatus || "Open"}`;
  },

  bugListOrNone(bugs) {
    if (!bugs.length) return "No items recorded.";
    return bugs.map((bug) => this.bugSummaryLine(bug)).join("\n");
  },

  bugDetailBlock(bug) {
    const { item, title, module, section } = bug;
    const lines = [
      `## ${item.bugId}: ${title}`,
      "",
      `- Module: ${module.name}`,
      `- Section: ${section}`,
      `- Severity: ${item.severity || "Not selected"}`,
      `- Priority: ${item.priority || "Not selected"}`,
      `- Status: ${item.workStatus || "Open"}`,
      `- Reproducibility: ${item.reproducibility || "Not selected"}`,
      "",
    ];
    this.addField(lines, "Expected Behaviour", item.expected || bug.expectedResult);
    this.addField(lines, "Actual Behaviour", item.actual);
    this.addField(lines, "Steps To Reproduce", item.steps);
    this.addField(lines, "Developer Console Output", item.developerConsole);
    this.addArchitectNotes(lines, item);
    this.addEvidenceReferences(lines, item);
    return lines;
  },

  codexBugBlock(bug) {
    const { item, title, module, section } = bug;
    const lines = [
      `## ${item.bugId}: ${title}`,
      "",
      `- Bug ID: ${item.bugId}`,
      `- Module: ${module.name}`,
      `- Section: ${section}`,
      `- Severity: ${item.severity || "Not selected"}`,
      `- Priority: ${item.priority || "Not selected"}`,
      `- Status: ${item.workStatus || "Open"}`,
      `- Reproducibility: ${item.reproducibility || "Not selected"}`,
      "",
    ];
    this.addField(lines, "Expected Behaviour", item.expected || bug.expectedResult);
    this.addField(lines, "Actual Behaviour", item.actual);
    this.addField(lines, "Steps To Reproduce", item.steps);
    this.addField(lines, "Developer Console Output", item.developerConsole);
    this.addField(lines, "Architect Recommendation", item.architectRecommendation);
    this.addField(lines, "Possible Root Cause", item.possibleRootCause);
    this.addField(lines, "Suggested Investigation", item.suggestedInvestigation);
    this.addField(lines, "Suggested Files", item.suggestedFiles);
    this.addEvidenceReferences(lines, item);
    lines.push("### Acceptance Criteria", "");
    lines.push(`- ${item.bugId} root cause is identified and documented.`);
    lines.push("- The smallest safe fix is proposed before implementation.");
    lines.push("- The fix preserves existing architecture and unrelated behavior.");
    lines.push("- Relevant verification steps pass.");
    lines.push("- Documentation is updated if engineering knowledge or project status changes.");
    return lines;
  },

  completionStatus(stats) {
    if (!stats.total) return "No checklist items available.";
    if (stats.notTested === 0 && stats.openBugs === 0) return "Complete and no open bugs recorded.";
    if (stats.notTested === 0) return "Testing complete with unresolved findings.";
    return "Testing in progress.";
  },

  stabilitySummary(stats) {
    if (stats.mvpBlockers || stats.critical) {
      return "Current stability is not release-ready because MVP blockers or critical issues are recorded.";
    }
    if (stats.openBugs) {
      return "Current stability is partially acceptable, but unresolved bugs remain.";
    }
    if (stats.notTested) {
      return "Current stability is uncertain because some test coverage remains incomplete.";
    }
    return "Current stability appears acceptable based on the recorded QA results.";
  },

  majorRisks(stats) {
    const risks = [];
    if (stats.mvpBlockers) risks.push(`${stats.mvpBlockers} MVP blocker(s) remain open or recorded.`);
    if (stats.critical) risks.push(`${stats.critical} critical priority issue(s) are recorded.`);
    if (stats.high) risks.push(`${stats.high} high priority issue(s) are recorded.`);
    if (stats.notTested) risks.push(`${stats.notTested} test(s) have not yet been executed.`);
    if (!risks.length) return "No major risks are recorded in the current QA session.";
    return risks.map((risk) => `- ${risk}`).join("\n");
  },

  releaseReadiness(stats) {
    if (stats.mvpBlockers || stats.critical) return "Not ready for release.";
    if (stats.openBugs || stats.notTested) return "Conditionally not ready; complete triage and remaining testing first.";
    return "Ready for release review based on the current QA record.";
  },

  architectReleaseRecommendation(stats) {
    if (stats.mvpBlockers || stats.critical) {
      return "Architectural recommendation: do not release. Resolve MVP blockers and critical bugs first, then retest the affected workflows.";
    }
    if (stats.high || stats.openBugs) {
      return "Architectural recommendation: conditionally hold release until high-priority issues are triaged and accepted or fixed.";
    }
    if (stats.notTested) {
      return "Architectural recommendation: complete remaining QA coverage before final release approval.";
    }
    return "Architectural recommendation: acceptable for release review based on the recorded QA state.";
  },

  patternSummary(bugs, field) {
    if (!bugs.length) return "No findings available for pattern analysis.";
    const counts = bugs.reduce((acc, bug) => {
      const value = bug.item[field] || "Not specified";
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([value, count]) => `- ${value}: ${count}`)
      .join("\n");
  },

  fieldSummary(bugs, field, fallback) {
    const values = bugs
      .map((bug) => ({ bugId: bug.item.bugId, value: bug.item[field] }))
      .filter(({ value }) => value);
    if (!values.length) return fallback;
    return values.map(({ bugId, value }) => `- ${bugId}: ${value}`).join("\n");
  },

  affectedComponents(bugs) {
    if (!bugs.length) return "No affected components recorded.";
    const sections = [...new Set(bugs.map((bug) => `${bug.module.name} / ${bug.section}`))];
    const suggestedFiles = bugs
      .flatMap((bug) => (bug.item.suggestedFiles || "").split("\n"))
      .map((line) => line.trim())
      .filter(Boolean);
    const lines = sections.map((section) => `- ${section}`);
    if (suggestedFiles.length) {
      lines.push("", "Suggested files:", ...[...new Set(suggestedFiles)].map((file) => `- ${file}`));
    }
    return lines.join("\n");
  },

  architecturalObservation(stats, bugs) {
    if (!bugs.length) return "No open or selected findings are available for architectural analysis.";
    if (stats.mvpBlockers || stats.critical) {
      return "The QA state indicates release-blocking risk. Focus first on correctness, state persistence, routing, and user-visible workflow integrity.";
    }
    if (bugs.some((bug) => bug.item.developerConsole)) {
      return "Some findings include developer console output. Inspect runtime errors before making UI-level assumptions.";
    }
    return "Current findings appear suitable for incremental bug-fix work without architectural redesign.";
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
  Renderer.renderCompletionSummary();
  Renderer.renderBugList();
  Renderer.renderEvidenceGallery();
}

function categoriesForCurrentModule() {
  return QAState.getSections().map((section) => section.section);
}

function getQaTitle(item) {
  return typeof item === "string" ? item : item.title;
}

function formatElapsedTime(startedAt) {
  if (!startedAt) return "Not tracked";
  const started = new Date(startedAt).getTime();
  if (Number.isNaN(started)) return "Not tracked";
  const minutes = Math.max(1, Math.round((Date.now() - started) / 60000));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours} hr ${remainder} min` : `${hours} hr`;
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

function setMode(mode) {
  const testing = mode === "testing";
  document.getElementById("testingMode").classList.toggle("hidden", !testing);
  document.getElementById("engineeringMode").classList.toggle("hidden", testing);
  document.getElementById("testingModeButton").classList.toggle("active", testing);
  document.getElementById("engineeringModeButton").classList.toggle("active", !testing);
}

function hasArchitectNotes(item) {
  return Boolean(
    item.architectRecommendation ||
      item.possibleRootCause ||
      item.suggestedInvestigation ||
      item.suggestedFiles,
  );
}

function uniqueBugs(bugs) {
  const seen = new Set();
  return bugs.filter(({ item }) => {
    if (seen.has(item.bugId)) return false;
    seen.add(item.bugId);
    return true;
  });
}

function ensureBugForCard(item, entry) {
  if (!item.bugId) {
    Utils.toast("Mark this test as Fail before generating a bug artifact.");
    return null;
  }
  return {
    ...entry,
    module: MODULES.find((module) => module.key === entry.moduleKey) || QAState.getCurrentModule(),
    item,
  };
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
  persistAndRender({ skipChecklist: true });
  const card = document.querySelector(`.qa-card[data-id="${itemId}"]`);
  if (card) Renderer.renderScreenshots(card, itemId);
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
