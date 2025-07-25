
let currentSection = null;

function saveData() {
  localStorage.setItem("sapData", JSON.stringify(sapData));
}

function loadData() {
  const saved = localStorage.getItem("sapData");
  if (saved) {
    Object.assign(sapData, JSON.parse(saved));
  }
}

function renderSections() {
  const list = document.getElementById("sectionList");
  list.innerHTML = "";
  Object.keys(sapData).forEach(section => {
    const li = document.createElement("li");
    li.textContent = section;
    li.onclick = () => selectSection(section);
    list.appendChild(li);
  });
}

function addSection() {
  const input = document.getElementById("newSectionInput");
  const name = input.value.trim();
  if (name && !sapData[name]) {
    sapData[name] = [];
    input.value = "";
    saveData();
    renderSections();
  }
}

function selectSection(section) {
  currentSection = section;
  document.getElementById("sectionTitle").value = section;
  document.getElementById("sectionDesc").value = "";
  renderSteps();
}

function renderSteps() {
  const list = document.getElementById("stepList");
  list.innerHTML = "";
  sapData[currentSection].forEach((step, i) => {
    const card = document.createElement("div");
    card.className = "step-card";

    const title = document.createElement("input");
    title.value = step.title;
    title.oninput = () => updateStep(i, title.value, desc.value);

    const desc = document.createElement("textarea");
    desc.value = step.description;
    desc.oninput = () => updateStep(i, title.value, desc.value);

    card.appendChild(title);
    card.appendChild(desc);
    list.appendChild(card);
  });
}

function updateStep(index, title, description) {
  sapData[currentSection][index] = { title, description };
  saveData();
}

function addStep() {
  if (!currentSection) return;
  sapData[currentSection].push({ title: "New Step", description: "Step details..." });
  saveData();
  renderSteps();
}

loadData();
renderSections();
