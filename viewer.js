
const url = 'process-flows.pdf';

let pdfDoc = null,
    pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 4,
    canvas = document.getElementById('pdf-render'),
    ctx = canvas.getContext('2d');

pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {
  pdfDoc = pdfDoc_;
  document.getElementById('page_count').textContent = pdfDoc.numPages;
  renderPage(pageNum);
});

function renderPage(num) {
  pageRendering = true;
  pdfDoc.getPage(num).then(function(page) {
    let viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    let renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    let renderTask = page.render(renderContext);
    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });
  document.getElementById('page_num').textContent = num;
}

function queueRenderPage(num) {
  if (pageRendering) {
    pageNumPending = num;
  } else {
    renderPage(num);
  }
}

document.getElementById('prev').addEventListener('click', function() {
  if (pageNum <= 1) return;
  pageNum--;
  queueRenderPage(pageNum);
});

document.getElementById('next').addEventListener('click', function() {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  queueRenderPage(pageNum);
});
