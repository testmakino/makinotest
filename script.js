
let steps = JSON.parse(localStorage.getItem("sapSteps")) || [];
let sectionTitle = localStorage.getItem("sapSectionTitle") || "Parts Return";
let sectionDesc = localStorage.getItem("sapSectionDesc") || "Handle customer returns and warranty claims efficiently";

const stepList = document.getElementById("stepList");
const sectionTitleEl = document.getElementById("sectionTitle");
const sectionDescEl = document.getElementById("sectionDesc");
const stepCount = document.getElementById("stepCount");

sectionTitleEl.value = sectionTitle;
sectionDescEl.value = sectionDesc;

sectionTitleEl.addEventListener("input", () => {
  localStorage.setItem("sapSectionTitle", sectionTitleEl.value);
});

sectionDescEl.addEventListener("input", () => {
  localStorage.setItem("sapSectionDesc", sectionDescEl.value);
});

function renderSteps() {
  stepList.innerHTML = "";
  stepCount.textContent = steps.length + " Steps";
  steps.forEach((step, index) => {
    const card = document.createElement("div");
    card.className = "step-card";

    const num = document.createElement("div");
    num.className = "step-number";
    num.textContent = index + 1;

    const content = document.createElement("div");
    content.className = "step-content";

    const titleInput = document.createElement("input");
    titleInput.className = "title";
    titleInput.value = step.title;
    titleInput.onchange = () => updateStep(index, titleInput.value, descInput.value);

    const descInput = document.createElement("textarea");
    descInput.className = "desc";
    descInput.rows = 2;
    descInput.value = step.description;
    descInput.onchange = () => updateStep(index, titleInput.value, descInput.value);

    content.appendChild(titleInput);
    content.appendChild(descInput);

    const delBtn = document.createElement("button");
    delBtn.textContent = "✖";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteStep(index);

    card.appendChild(num);
    card.appendChild(content);
    card.appendChild(delBtn);
    stepList.appendChild(card);
  });
}

function addStep() {
  steps.push({
    title: "New Step Title",
    description: "Step description goes here..."
  });
  saveSteps();
}

function updateStep(index, title, description) {
  steps[index] = { title, description };
  saveSteps();
}

function deleteStep(index) {
  steps.splice(index, 1);
  saveSteps();
}

function saveSteps() {
  localStorage.setItem("sapSteps", JSON.stringify(steps));
  renderSteps();
}

renderSteps();
