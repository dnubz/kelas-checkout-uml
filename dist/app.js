const byId = (id) => document.getElementById(id);
const icon = (name) => `<span class="material-symbols-rounded" aria-hidden="true">${name}</span>`;
const allQuestions = modules.flatMap((module) => module.questions.map((question) => ({ module, question })));
const moduleNav = byId("modules");
const search = byId("search");
const questions = byId("questions");
const study = byId("materi");
const diagram = byId("diagram");
const scenarioSelect = byId("scenario");
const quiz = byId("quiz");
const quizContent = byId("quiz-content");
const initialTopic = new URLSearchParams(location.hash.slice(1)).get("topik");
const initialQuestion = allQuestions.find(({ question }) => question[0] === initialTopic);
let activeModule = initialQuestion?.module.id ?? modules[0].id;
let activeDiagramStep = 0;
let diagramType = "activity";
let quizIndex = 0;
let quizScore = 0;
let quizAnswer = null;

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem("checkout-opened") || "[]");
    const known = new Set(allQuestions.map(({ question }) => question[0]));
    return new Set(Array.isArray(saved) ? saved.filter((id) => known.has(id)) : []);
  } catch {
    return new Set();
  }
}

const openedQuestions = loadProgress();

function showProgress() {
  const progress = byId("progress");
  progress.max = allQuestions.length;
  progress.value = openedQuestions.size;
  byId("progress-count").textContent = `${openedQuestions.size}/${allQuestions.length}`;
}

function recordProgress(id) {
  if (openedQuestions.has(id)) return;
  openedQuestions.add(id);
  try {
    localStorage.setItem("checkout-opened", JSON.stringify([...openedQuestions]));
  } catch {
    // Keep progress in memory when browser storage is unavailable.
  }
  showProgress();
}

function renderModuleNav(isSearching) {
  for (const button of moduleNav.querySelectorAll("button")) {
    if (!isSearching && button.dataset.module === activeModule) {
      button.setAttribute("aria-current", "true");
    } else {
      button.removeAttribute("aria-current");
    }
  }
}

function lessonExtras(id) {
  if (id === "external-system") {
    return `<figure class="inline-photo">
      <img src="media/online-payment.jpg" alt="Pembeli menggunakan kartu saat berbelanja lewat laptop" width="79" height="52" loading="lazy">
      <figcaption>Pembayaran meminta respons sistem di luar toko.<br><a href="https://www.pexels.com/photo/close-up-shot-of-two-people-shopping-online-6407773/" target="_blank" rel="noopener">Pavel Danilyuk / Pexels</a></figcaption>
    </figure>`;
  }
  if (id === "first-item") {
    return '<p><a href="#simulasi" data-example="cart">Coba skenario barang pertama →</a></p>';
  }
  if (id === "swimlane" || id === "foreach" || id === "exception") {
    return '<p><a href="#simulasi" data-example="stock">Coba cabang stok habis →</a></p>';
  }
  return "";
}

function questionMarkup([id, title, context, answer, example], openId) {
  return `<details class="question" data-question="${id}" ${id === openId ? "open" : ""}>
    <summary><span>${title}</span>${icon("keyboard_arrow_down")}</summary>
    <div class="question-answer">
      <p class="question-context">${context}</p>
      <p>${answer}</p>
      <p class="example">${example}</p>
      ${lessonExtras(id)}
    </div>
  </details>`;
}

function searchable(text) {
  return text.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

const searchIndex = allQuestions.map((entry) => ({
  ...entry, words: searchable(entry.question.join(" ") + " " + entry.module.title)
}));

function renderStudy(openId) {
  const module = modules.find(({ id }) => id === activeModule);
  const query = searchable(search.value);
  const isSearching = search.value.trim().length > 0;
  const exactSymbol = search.value.trim() === "*" ? "star" : null;
  const matching = searchIndex.filter(({ question, words }) => {
    if (exactSymbol) return question[0] === exactSymbol;
    return query && query.split(" ").every((word) => words.includes(word));
  });
  const visible = isSearching ? matching.map(({ question }) => question) : module.questions;
  renderModuleNav(isSearching);
  byId("study-context").textContent = isSearching ? "Semua modul" : module.context;
  byId("study-title").textContent = isSearching ? "Hasil pencarian" : module.title;
  byId("study-summary").textContent = isSearching ? "" : module.summary;
  byId("study-summary").hidden = isSearching;
  byId("study-count").textContent = `${visible.length} topik`;
  questions.innerHTML = visible.length
    ? visible.map((entry) => questionMarkup(entry, openId)).join("")
    : '<p class="empty">Topik belum ditemukan. Coba kata kunci seperti actor, swimlane, atau SeaORM.</p>';
  const next = modules[modules.indexOf(module) + 1];
  byId("study-footer").innerHTML = isSearching ? "" : next
    ? `<button class="button button-outline" type="button" data-module="${next.id}">Lanjut ke ${next.title} ${icon("arrow_forward")}</button>`
    : `<button class="button button-outline quiz-open" type="button">Mulai kuis ${icon("arrow_forward")}</button>`;
  if (openId) recordProgress(openId);
}

function activateModule(id, topic, scroll = true) {
  activeModule = id;
  search.value = "";
  renderStudy(topic);
  if (scroll) study.scrollIntoView({ block: "start" });
}

function openTopic(id) {
  const entry = allQuestions.find(({ question }) => question[0] === id);
  if (!entry) return;
  activateModule(entry.module.id, id, false);
  const summary = questions.querySelector(`[data-question="${id}"] summary`);
  summary?.focus({ preventScroll: true });
  summary?.scrollIntoView({ block: "center" });
}

moduleNav.innerHTML = modules.map((module) =>
  `<button class="module-button" type="button" data-module="${module.id}">${icon(module.icon)}
    <span class="module-label">${module.title}</span><span class="module-count">${module.questions.length}</span>
  </button>`).join("");

search.addEventListener("input", () => renderStudy());
search.form.addEventListener("submit", (event) => {
  event.preventDefault();
  study.scrollIntoView({ block: "start" });
  (questions.querySelector("summary") ?? study).focus({ preventScroll: true });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !quiz.open && !event.target.closest("input, textarea, select, [contenteditable]")) {
    event.preventDefault();
    search.focus();
  }
});
questions.addEventListener("toggle", (event) => {
  if (event.target.matches("details[open]")) recordProgress(event.target.dataset.question);
}, true);

const lanePosition = (index) => (index + .5) * (100 / 3);

function activityMarkup(steps, participants) {
  const row = (step, index) => {
    const [actor, action] = step;
    const lane = participants.indexOf(actor);
    const state = index === activeDiagramStep ? "active" : index < activeDiagramStep ? "past" : "";
    let edge = "";
    if (index < steps.length - 1) {
      const from = lanePosition(lane);
      const to = lanePosition(participants.indexOf(steps[index + 1][0]));
      edge = `<div class="activity-edge" aria-hidden="true" style="--edge-from:${from}%;--edge-to:${to}%;--edge-left:${Math.min(from, to)}%;--edge-width:${Math.abs(to - from)}%"><span></span></div>`;
    }
    return `<div class="activity-row">
      <button class="activity-step ${state}" type="button" data-step="${index}" aria-pressed="${index === activeDiagramStep}" style="--lane:${lane + 1}" aria-label="${actor}: ${action}">${action}</button>
    </div>${edge}`;
  };
  return '<div class="lane-guides" aria-hidden="true"><span></span><span></span><span></span></div>' + steps.map(row).join("");
}

function sequenceMarkup(steps, participants, createdParticipant) {
  const lines = participants.map((_, index) =>
    index === createdParticipant ? '<span style="--life-start:71px"></span>' : "<span></span>"
  ).join("");
  const messages = steps.map(([actor, action, from, to, message, isReturn], index) => {
    const state = index === activeDiagramStep ? "active" : index < activeDiagramStep ? "past" : "";
    const start = lanePosition(Math.min(from, to));
    const width = from === to ? 9 : Math.abs(from - to) * (100 / 3);
    const middle = message.length > 23 ? 64 : start + width / 2;
    const line = from === to ? "self" : from > to ? "reverse" : "";
    return `<button class="sequence-step ${state}" type="button" data-step="${index}" aria-pressed="${index === activeDiagramStep}"
      aria-label="${participants[from]} ke ${participants[to]}: ${message}" style="--message-start:${start}%;--message-width:${width}%;--message-mid:${middle}%">
      <span class="seq-message">${message}</span><span class="seq-line ${line} ${isReturn ? "return" : ""}" aria-hidden="true"></span>
    </button>`;
  }).join("");
  return `<div class="lifelines" aria-hidden="true">${lines}</div>${messages}`;
}

function getScenario() {
  return scenarios[scenarioSelect.value];
}

function drawDiagram() {
  const { steps, participants = ["Pelanggan", "Sistem", "Payment gateway"], createdParticipant } = getScenario();
  const [actor, action, , , , note] = steps[activeDiagramStep];
  const wasStepFocused = document.activeElement?.closest("#diagram [data-step]");
  const body = diagramType === "activity"
    ? activityMarkup(steps, participants)
    : sequenceMarkup(steps, participants, createdParticipant);
  diagram.innerHTML = `<div class="lane-heads">${participants.map((name) => `<span>${name}</span>`).join("")}</div>
    <div class="diagram-rows">${body}</div>`;
  byId("sim-note").innerHTML = `<strong>${actor} · ${action}</strong>${note}`;
  byId("sim-position").textContent = `Langkah ${activeDiagramStep + 1} / ${steps.length}`;
  byId("sim-prev").disabled = activeDiagramStep === 0;
  byId("sim-next").innerHTML = activeDiagramStep === steps.length - 1
    ? `Ulang ${icon("replay")}`
    : `Lanjut ${icon("arrow_forward")}`;
  if (wasStepFocused) {
    diagram.querySelector(`[data-step="${activeDiagramStep}"]`)?.focus({ preventScroll: true });
  }
}

scenarioSelect.addEventListener("change", () => {
  activeDiagramStep = 0;
  drawDiagram();
});
document.querySelector(".diagram-switch").addEventListener("change", (event) => {
  diagramType = event.target.value;
  drawDiagram();
});
byId("sim-prev").addEventListener("click", () => {
  activeDiagramStep = Math.max(0, activeDiagramStep - 1);
  drawDiagram();
});
byId("sim-next").addEventListener("click", () => {
  activeDiagramStep = (activeDiagramStep + 1) % getScenario().steps.length;
  drawDiagram();
});
diagram.addEventListener("click", (event) => {
  const button = event.target.closest("[data-step]");
  if (!button) return;
  activeDiagramStep = Number(button.dataset.step);
  drawDiagram();
});

function renderQuiz(focusPrompt = false) {
  if (quizIndex === quizQuestions.length) {
    quizContent.innerHTML = `<p class="quiz-result" tabindex="-1">${quizScore}/${quizQuestions.length} benar</p>
      <p>${quizScore === quizQuestions.length ? "Semua jawaban benar." : "Ulangi kuis untuk melatih konsep yang masih tertukar."}</p>
      <div class="quiz-actions"><button class="button button-primary" type="button" data-quiz="restart">Ulang kuis</button></div>`;
    quizContent.querySelector(".quiz-result").focus();
    return;
  }
  const { prompt, choices, correct, explanation, topic } = quizQuestions[quizIndex];
  const answered = quizAnswer !== null;
  const options = choices.map((choice, index) => {
    const state = answered && index === correct ? "correct" : answered && index === quizAnswer ? "incorrect" : "";
    const status = state === "correct" ? '<span class="sr-only"> (jawaban benar)</span>' :
      state === "incorrect" ? '<span class="sr-only"> (jawabanmu salah)</span>' : "";
    return `<button class="quiz-choice ${state}" type="button" data-answer="${index}" ${answered ? "disabled" : ""}>${choice}${status}</button>`;
  }).join("");
  quizContent.innerHTML = `<div class="quiz-status"><span>Soal ${quizIndex + 1} dari ${quizQuestions.length}</span><span>${quizScore} benar</span></div>
    <progress max="${quizQuestions.length}" value="${quizIndex + Number(answered)}" aria-label="Progres kuis"></progress>
    <h3 class="quiz-prompt" tabindex="-1">${prompt}</h3>
    <div class="quiz-choices">${options}</div>
    ${answered ? `<div class="quiz-explanation" tabindex="-1"><strong>${quizAnswer === correct ? "Benar." : "Belum tepat."}</strong> ${explanation}<br><a href="#topik=${topic}" data-topic="${topic}">Baca topik terkait</a></div>
      <div class="quiz-actions"><button class="button button-primary" type="button" data-quiz="next">${quizIndex === quizQuestions.length - 1 ? "Lihat hasil" : "Soal berikutnya"}</button></div>` : ""}`;
  if (answered) quizContent.querySelector(".quiz-explanation").focus();
  else if (focusPrompt) quizContent.querySelector(".quiz-prompt").focus();
}

function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizAnswer = null;
  renderQuiz(true);
}

quizContent.addEventListener("click", (event) => {
  const answer = event.target.closest("[data-answer]");
  const control = event.target.closest("[data-quiz]")?.dataset.quiz;
  if (answer && quizAnswer === null) {
    quizAnswer = Number(answer.dataset.answer);
    if (quizAnswer === quizQuestions[quizIndex].correct) quizScore += 1;
    renderQuiz();
  }
  if (control === "next") {
    quizIndex += 1;
    quizAnswer = null;
    renderQuiz(true);
  }
  if (control === "restart") restartQuiz();
});
byId("quiz-close").addEventListener("click", () => quiz.close());

document.addEventListener("click", (event) => {
  const moduleButton = event.target.closest("[data-module]");
  const topic = event.target.closest("[data-topic]")?.dataset.topic;
  const example = event.target.closest("[data-example]")?.dataset.example;
  if (moduleButton) activateModule(moduleButton.dataset.module);
  if (event.target.closest(".quiz-open")) {
    quiz.showModal();
    renderQuiz(true);
  }
  if (topic) {
    event.preventDefault();
    quiz.close();
    history.replaceState(null, "", `#topik=${topic}`);
    openTopic(topic);
  }
  if (example) {
    scenarioSelect.value = example;
    activeDiagramStep = 0;
    diagramType = example === "cart" ? "sequence" : "activity";
    document.querySelector(`input[name="diagram"][value="${diagramType}"]`).checked = true;
    drawDiagram();
  }
});

showProgress();
renderStudy(initialQuestion ? initialTopic : "actor");
drawDiagram();
if (initialQuestion) window.addEventListener("load", () => openTopic(initialTopic), { once: true });
