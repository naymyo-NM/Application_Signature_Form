// Canvas and drawing logic
const canvas = document.getElementById('sigCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let last = { x: 0, y: 0 };
const undoStack = [];
const redoStack = [];

function fixDPR() {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width;
  const h = canvas.height;
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  ctx.scale(dpr, dpr);
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = 2.2;
  ctx.strokeStyle = '#111';
}
fixDPR();

function getPointer(e) {
  const rect = canvas.getBoundingClientRect();
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;
  return { x: x - rect.left, y: y - rect.top };
}

function saveUndo() {
  if (undoStack.length > 50) undoStack.shift();
  undoStack.push(canvas.toDataURL());
  redoStack.length = 0;
}

function startDraw(e) {
  e.preventDefault();
  drawing = true;
  last = getPointer(e);
  saveUndo();
}

function moveDraw(e) {
  if (!drawing) return;
  const p = getPointer(e);
  ctx.beginPath();
  ctx.moveTo(last.x, last.y);
  ctx.lineTo(p.x, p.y);
  ctx.stroke();
  last = p;
}

function endDraw() {
  drawing = false;
}

canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mousemove', moveDraw);
canvas.addEventListener('mouseup', endDraw);
canvas.addEventListener('mouseout', endDraw);
canvas.addEventListener('touchstart', startDraw, { passive: false });
canvas.addEventListener('touchmove', moveDraw, { passive: false });
canvas.addEventListener('touchend', endDraw);

// Controls
document.getElementById('clearBtn').addEventListener('click', () => {
  saveUndo();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
document.getElementById('undoBtn').addEventListener('click', () => {
  if (!undoStack.length) return;
  redoStack.push(canvas.toDataURL());
  const lastState = undoStack.pop();
  restore(lastState);
});
document.getElementById('redoBtn').addEventListener('click', () => {
  if (!redoStack.length) return;
  undoStack.push(canvas.toDataURL());
  const next = redoStack.pop();
  restore(next);
});

function restore(dataURL) {
  const img = new Image();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
  };
  img.src = dataURL;
}

function isCanvasBlank(c) {
  const blank = document.createElement('canvas');
  blank.width = c.width;
  blank.height = c.height;
  return c.toDataURL() === blank.toDataURL();
}

// Date and time
function updateDateTime() {
  const now = new Date();
  document.getElementById('dateField').value = now.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' });
  document.getElementById('timeField').value = now.toLocaleTimeString('en-GB', { hour12: false });
}
updateDateTime();
setInterval(updateDateTime, 1000);

//Filter ID
document.getElementById('btnSearch').addEventListener('click', ()=>{
  const id = document.getElementById('appId').value.trim();
  if (!id) return showError('Application ID ထည့်ပေးပါ');
  showError('');
 if(id === '12345'){
  window.location.href = 'success.html';
 }else{
  window.location.href = 'not-found.html'
 }

})

document.getElementById('btnSubmit').addEventListener('click', () => {
  const appId = document.getElementById('appId').value.trim();
  const signer = document.getElementById('signerName').value.trim();
  const checked = document.getElementById('agree').checked;

  if (!appId) return showError('Application ID လိုအပ်ပါသည်');
  if (!checked) return showError('သဘောတူကြောင်း သတ်မှတ်ရန် လိုအပ်သည်');
  if (isCanvasBlank(canvas)) return showError('Signature လက်မှတ်မရှိသေးပါ');

  const payload = {
    applicationId: appId,
    signerName: signer || null,
    date: document.getElementById('dateField').value,
    time: document.getElementById('timeField').value,
    signatureDataUrl: canvas.toDataURL('image/png')
  };

  console.log('Submitting payload:', payload);
  alert('Form submitted (demo). Check console for payload.');
  showError('');
});


function showError(msg) {
  document.getElementById('error').textContent = msg || '';
}



