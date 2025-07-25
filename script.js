
let data = JSON.parse(localStorage.getItem('sapWorkflow')) || {};
let currentSection = null;

function renderSections() {
  const sectionList = document.getElementById('sectionList');
  sectionList.innerHTML = '';
  Object.keys(data).forEach(section => {
    const li = document.createElement('li');
    li.textContent = section;
    li.onclick = () => selectSection(section);
    sectionList.appendChild(li);
  });
}

function selectSection(section) {
  currentSection = section;
  document.getElementById('editorTitle').textContent = section;
  renderSteps();
}

function addSection() {
  const name = document.getElementById('newSectionName').value.trim();
  if (name && !data[name]) {
    data[name] = [];
    saveData();
    renderSections();
    document.getElementById('newSectionName').value = '';
  }
}

function renderSteps() {
  const stepList = document.getElementById('stepList');
  stepList.innerHTML = '';
  if (currentSection && data[currentSection]) {
    data[currentSection].forEach((step, index) => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.className = 'editable';
      span.contentEditable = true;
      span.textContent = step;
      span.onblur = () => editStep(index, span.textContent);
      li.appendChild(span);
      stepList.appendChild(li);
    });
  }
}

function addStep() {
  const step = document.getElementById('newStep').value.trim();
  if (step && currentSection) {
    data[currentSection].push(step);
    saveData();
    renderSteps();
    document.getElementById('newStep').value = '';
  }
}

function editStep(index, newText) {
  if (currentSection && data[currentSection][index] !== undefined) {
    data[currentSection][index] = newText;
    saveData();
  }
}

function saveData() {
  localStorage.setItem('sapWorkflow', JSON.stringify(data));
}

renderSections();
