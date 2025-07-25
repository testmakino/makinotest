let sapData = JSON.parse(localStorage.getItem("sapData")) || {};
let currentSection = null;

function saveData() {
  localStorage.setItem("sapData", JSON.stringify(sapData));
}

function renderSections() {
  const sectionList = document.getElementById("sectionList");
  sectionList.innerHTML = "";
  Object.keys(sapData).forEach(section => {
    const li = document.createElement("li");
    li.textContent = section;
    li.onclick = () => showSection(section);
    sectionList.appendChild(li);
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

function showSection(section) {
  currentSection = section;
  document.getElementById("sectionHeader").innerHTML = `<h2>${section}</h2>`;
  document.getElementById("stepEditor").style.display = "block";
  renderSteps();
}

function renderSteps() {
  const container = document.getElementById("stepsContainer");
  container.innerHTML = "";
  if (sapData[currentSection]) {
    sapData[currentSection].forEach((step, idx) => {
      const box = document.createElement("div");
      box.className = "step-box";
      const textarea = document.createElement("textarea");
      textarea.value = step;
      textarea.onchange = () => {
        sapData[currentSection][idx] = textarea.value;
        saveData();
      };
      box.appendChild(textarea);
      container.appendChild(box);
    });
  }
}

function addStep() {
  const input = document.getElementById("newStepInput");
  const stepText = input.value.trim();
  if (stepText && currentSection) {
    sapData[currentSection].push(stepText);
    input.value = "";
    saveData();
    renderSteps();
  }
}

renderSections();